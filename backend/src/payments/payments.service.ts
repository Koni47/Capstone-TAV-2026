import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  WebpayPlus,
  Options,
  Environment,
  IntegrationCommerceCodes,
  IntegrationApiKeys,
} from 'transbank-sdk';
import { ConfigService } from '@nestjs/config';
import { TransactionStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  private tx: InstanceType<typeof WebpayPlus.Transaction>;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    if (this.configService.get('TRANSBANK_ENV') === 'production') {
      this.tx = new WebpayPlus.Transaction(
        new Options(
          this.configService.get('TRANSBANK_CC'),
          this.configService.get('TRANSBANK_API_KEY'),
          Environment.Production,
        ),
      );
    } else {
      // IntegraciÃƒÂ³n
      this.tx = new WebpayPlus.Transaction(
        new Options(
          IntegrationCommerceCodes.WEBPAY_PLUS,
          IntegrationApiKeys.WEBPAY,
          Environment.Integration,
        ),
      );
    }
  }

  async initTransaction(tripId: string) {
    const trip = await this.prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new NotFoundException('Viaje no encontrado');
    }

    if (!trip.fare || trip.fare <= 0) {
      throw new BadRequestException('El viaje no tiene una tarifa vaÌlida asignada');
    }

    const buyOrder = `TRIP-${tripId.substring(0, 8)}-${Date.now().toString().substring(8)}`;
    const sessionId = `S-${tripId.substring(0, 8)}`;
    const amount = trip.fare;
    const returnUrl =
      this.configService.get('TRANSBANK_RETURN_URL') || 'http://localhost:5173/payment-result';

    try {
      const createResponse = await this.tx.create(buyOrder, sessionId, amount, returnUrl);

      // Guardar transacciÃƒÂ³n inicial
      await this.prisma.transaction.create({
        data: {
          tripId: trip.id,
          buyOrder: buyOrder,
          sessionId: sessionId,
          amount: amount,
          status: TransactionStatus.INITIALIZED,
          token: createResponse.token,
        },
      });

      return {
        token: createResponse.token,
        url: createResponse.url,
      };
    } catch (error) {
      console.error('Error iniciando transacciÃƒÂ³n Webpay:', error);
      throw new InternalServerErrorException('Error al iniciar el pago con Webpay');
    }
  }

  async commitTransaction(token: string) {
    // 1. Buscar si ya existe la transacciÃƒÂ³n
    const transaction = await this.prisma.transaction.findUnique({
      where: { token },
    });

    if (!transaction) {
      throw new NotFoundException('TransacciÃƒÂ³n no encontrada en BD local');
    }

    // Si ya estÃƒÂ¡ completada, devolvemos el estado actual para evitar errores
    if (
      transaction.status === TransactionStatus.AUTHORIZED ||
      transaction.status === TransactionStatus.REJECTED
    ) {
      return {
        status: transaction.status,
        message: 'La transacciÃƒÂ³n ya fue procesada anteriormente',
        details: {
          amount: transaction.amount,
          authorizationCode: transaction.authorizationCode,
          transactionDate: transaction.transactionDate,
          buyOrder: transaction.buyOrder,
          cardNumber: transaction.cardLast4Digits,
        },
      };
    }

    try {
      // 2. Confirmar con Transbank
      // COMMIT DE WEBPAY
      const response = await this.tx.commit(token);

      let newStatus: TransactionStatus = TransactionStatus.FAILED;
      if (response.status === 'AUTHORIZED' && response.response_code === 0) {
        newStatus = TransactionStatus.AUTHORIZED;
      } else {
        newStatus = TransactionStatus.REJECTED;
      }

      // 3. Actualizar nuestra BD
      await this.prisma.transaction.update({
        where: { token },
        data: {
          status: newStatus,
          transbankStatus: response.status,
          responseCode: response.response_code,
          authorizationCode: response.authorization_code,
          paymentTypeCode: response.payment_type_code,
          installmentsAmount: response.installments_amount,
          installmentsNumber: response.installments_number,
          cardLast4Digits: response.card_detail?.card_number,
          accountingDate: response.accounting_date,
          transactionDate: response.transaction_date
            ? new Date(response.transaction_date)
            : new Date(),
        },
      });

      // 4. Si fue exitoso, actualizar el estado del Viaje
      if (newStatus === TransactionStatus.AUTHORIZED) {
        await this.prisma.trip.update({
          where: { id: transaction.tripId },
          data: {
            status: 'ASIGNADO', // O el estado que corresponda a "Pagado/Listo para chofer"
          },
        });
      }

      return {
        status: newStatus,
        details: response,
        redirectData: {
          // Datos ÃƒÂºtiles para mostrar en el frontend
          amount: response.amount,
          buyOrder: response.buy_order,
          authorizationCode: response.authorization_code,
          transactionDate: response.transaction_date,
        },
      };
    } catch (error) {
      console.error('Error confirmando transacciÃƒÂ³n Webpay:', error);

      // Actualizar a error si falla el commit (ej. token expirado)
      await this.prisma.transaction.update({
        where: { token },
        data: { status: TransactionStatus.ERROR_COMMIT },
      });

      throw new InternalServerErrorException('Error al confirmar el pago');
    }
  }

  async checkTransactionStatus(token: string) {
    try {
      const response = await this.tx.status(token);

      const transaction = await this.prisma.transaction.findUnique({
        where: { token },
      });

      if (!transaction) {
        throw new NotFoundException('Transacción no encontrada en BD');
      }

      // Lógica de Sincronización
      let newStatus = transaction.status;
      if (response.status === 'AUTHORIZED' && response.response_code === 0) {
        if (transaction.status !== TransactionStatus.AUTHORIZED) {
          newStatus = TransactionStatus.AUTHORIZED;
        }
      } else if (response.status === 'FAILED' || response.status === 'NULLIFIED') {
        newStatus = TransactionStatus.REJECTED;
      }

      if (newStatus !== transaction.status) {
        await this.prisma.transaction.update({
          where: { token },
          data: {
            status: newStatus,
            transbankStatus: response.status,
            responseCode: response.response_code,
            authorizationCode: response.authorization_code,
            cardLast4Digits: response.card_detail?.card_number,
            transactionDate: response.transaction_date
              ? new Date(response.transaction_date)
              : undefined,
          },
        });

        if (newStatus === TransactionStatus.AUTHORIZED) {
          await this.prisma.trip.update({
            where: { id: transaction.tripId },
            data: { status: 'ASIGNADO' },
          });
        }
      }

      return {
        ...response,
        localStatus: newStatus,
      };
    } catch (error) {
      console.error('Error consultando estado en Transbank:', error);
      throw new InternalServerErrorException('Error al consultar estado de Webpay');
    }
  }

  async refundTransaction(tripId: string, amount?: number) {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        tripId,
        status: TransactionStatus.AUTHORIZED,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!transaction || !transaction.token || !transaction.authorizationCode) {
      throw new BadRequestException(
        'No hay una transacción aprobada válida para reembolsar en este viaje',
      );
    }

    try {
      // Si no se envía amount, se asume anulación total del monto original
      const refundAmount = amount || transaction.amount;

      const response = await this.tx.refund(transaction.token, refundAmount);

      if (response.type === 'NULLIFIED' || response.type === 'REVERSED') {
        await this.prisma.transaction.update({
          where: { id: transaction.id },
          data: { status: TransactionStatus.REFUNDED },
        });

        // Opcional: Volver el viaje a PENDIENTE o CANCELADO
        await this.prisma.trip.update({
          where: { id: tripId },
          data: { status: 'CANCELADO' }, // Asumiendo cancelación
        });

        return {
          status: 'REFUNDED',
          details: response,
        };
      } else {
        throw new BadRequestException(
          `El reembolso no fue autorizado por Transbank. Tipo: ${response.type}`,
        );
      }
    } catch (error) {
      console.error('Error en Refund Webpay:', error);
      throw new InternalServerErrorException('Error procesando el reembolso');
    }
  }

  async reconcileOldTransactions() {
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

    const stuckTransactions = await this.prisma.transaction.findMany({
      where: {
        status: TransactionStatus.INITIALIZED,
        createdAt: { lte: fifteenMinutesAgo },
      },
    });

    const results = {
      processed: 0,
      expired: 0,
      recovered: 0,
      errors: 0,
    };

    for (const tx of stuckTransactions) {
      if (!tx.token) continue;

      try {
        const response = await this.tx.status(tx.token);

        if (response.status === 'AUTHORIZED' && response.response_code === 0) {
          // Caso Borde: Usuario pagó pero nunca volvió a nuestra web
          await this.prisma.transaction.update({
            where: { id: tx.id },
            data: {
              status: TransactionStatus.AUTHORIZED,
              transbankStatus: response.status,
              authorizationCode: response.authorization_code,
              cardLast4Digits: response.card_detail?.card_number,
            },
          });
          await this.prisma.trip.update({
            where: { id: tx.tripId },
            data: { status: 'ASIGNADO' },
          });
          results.recovered++;
        } else {
          // Expiró o falló
          await this.prisma.transaction.update({
            where: { id: tx.id },
            data: { status: TransactionStatus.EXPIRED, transbankStatus: response.status },
          });
          results.expired++;
        }
      } catch (error) {
        // Si el token ya no existe en Transbank (pasan 7 días) o error de conexión
        // Asumimos expirado si es muy viejo, o lo dejamos para siguiente cron
        console.warn(`Error conciliando tx ${tx.token}:`, error);
        await this.prisma.transaction.update({
          where: { id: tx.id },
          data: { status: TransactionStatus.EXPIRED, transbankStatus: 'NOT_FOUND_OR_ERROR' },
        });
        results.errors++; // O contarlo como expired, depende de regla de negocio
      }
      results.processed++;
    }

    return results;
  }

  // --- MÃ©todos de Prueba ---
  async initTestTransaction(amount: number, buyOrder?: string) {
    const finalBuyOrder = buyOrder || `TEST-${Date.now()}`;
    const sessionId = `S-TEST-${Date.now()}`;
    const returnUrl =
      this.configService.get('TRANSBANK_RETURN_URL') || 'http://localhost:5173/payment-result';

    console.log(`[TEST-WEBPAY] Iniciando tx manual. Amount: ${amount}, BuyOrder: ${finalBuyOrder}`);

    try {
      const createResponse = await this.tx.create(finalBuyOrder, sessionId, amount, returnUrl);

      return {
        token: createResponse.token,
        url: createResponse.url,
        debugInfo: {
          buyOrder: finalBuyOrder,
          sessionId,
          amount,
          returnUrl,
        },
      };
    } catch (error) {
      console.error('[TEST-WEBPAY] Error:', error);
      throw new InternalServerErrorException(
        'Error iniciando transacciÃ³n de prueba: ' + error.message,
      );
    }
  }

  async getStatus(token: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { token },
      include: { trip: true },
    });

    if (!transaction) {
      throw new NotFoundException('Transaccion no encontrada');
    }

    // Try to query Transbank for fresh status if needed,
    // but for now, returning local DB status is usually enough after commit.
    // If you wanted to query Transbank directly:
    // const tbkStatus = await WebpayPlus.Transaction.status(token);

    return {
      step: 'Database Status',
      status: transaction.status,
      amount: transaction.amount,
      buyOrder: transaction.buyOrder,
      tripId: transaction.tripId,
    };
  }
}
