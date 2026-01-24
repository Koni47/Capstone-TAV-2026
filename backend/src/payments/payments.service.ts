import { Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { WebpayPlus, Options, IntegrationCommerceCodes, IntegrationApiKeys, Environment } from 'transbank-sdk';
import { PrismaService } from '../prisma/prisma.service'; // Ajusta la ruta a tu PrismaService

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Inicializa la transacción en Webpay Plus
   */
  async initiateWEBPay(amount: number, buyOrder: string, sessionId: string) {
    try {
      // Configuración para entorno de Integración (Testing)
      const tx = new WebpayPlus.Transaction(
        new Options(
          IntegrationCommerceCodes.WEBPAY_PLUS,
          IntegrationApiKeys.WEBPAY,
          Environment.Integration
        )
      );

      // Usar variable de entorno o fallback para desarrollo
      const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const returnUrl = `${baseUrl}/payment-result`;
      
      const response = await tx.create(
        buyOrder, 
        sessionId, 
        amount, 
        returnUrl
      );

      return {
        token: response.token,
        url: response.url,
      };
    } catch (error) {
      console.error('Error iniciando Webpay:', error);
      throw new InternalServerErrorException('No se pudo iniciar la transacción con Transbank');
    }
  }

  /**
   * Confirma la transacción y actualiza la BD si es exitosa
   */
  async commitWEBPay(token: string) {
    try {
      const tx = new WebpayPlus.Transaction(
        new Options(
          IntegrationCommerceCodes.WEBPAY_PLUS,
          IntegrationApiKeys.WEBPAY,
          Environment.Integration
        )
      );

      const response = await tx.commit(token);

      // Webpay retorna 'AUTHORIZED' y response_code 0 cuando es exitoso
      if (response.status === 'AUTHORIZED' && response.response_code === 0) {
        // Actualizar estado en Base de Datos
        // NOTA: 'buy_order' suele usarse como referencia al ID del viaje/solicitud
        await this.updateTripStatus(response.buy_order, 'PAGADO');
      }

      return response;
    } catch (error: any) {
      const errorMessage = error.message || '';
      
      // Manejo específico para logs limpios (Warn en vez de Error para 422s)
      if (errorMessage.includes('422') || errorMessage.includes('Invalid status')) {
        console.warn(
          'Webpay Commit Info: Recibido error 422, probablemente porque el usuario canceló el pago en Webpay. Mensaje original:',
          errorMessage,
        );
      } else {
        console.error('Error confirmando Webpay:', error);
      }

      // 1. Caso común en pruebas: Transacción iniciada pero no pagada (Status 0)
      if (errorMessage.includes("Invalid status '0'")) {
        throw new UnprocessableEntityException('La transacción existe pero el usuario no ha completado el pago en el formulario de Transbank.');
      }

      // 2. Token inválido, expirado, anulado o ya usado
      if (
        errorMessage.includes('422') || 
        errorMessage.includes('Token')
      ) {
         throw new UnprocessableEntityException('El token de Webpay no es válido, la transacción ya fue confirmada, anulada o ha expirado.');
      }

      // 3. Timeout
      if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
        throw new InternalServerErrorException('Error de conexión con Transbank.');
      }

      // Validar si es una excepción HTTP ya existente
      if (error instanceof InternalServerErrorException || error instanceof UnprocessableEntityException) throw error;
      
      throw new InternalServerErrorException('Error al confirmar la transacción con Transbank');
    }
  }

  /**
   * Consulta el estado de una transacción
   */
  async checkStatus(token: string) {
    try {
      const tx = new WebpayPlus.Transaction(
        new Options(
          IntegrationCommerceCodes.WEBPAY_PLUS,
          IntegrationApiKeys.WEBPAY,
          Environment.Integration
        )
      );

      const response = await tx.status(token);
      return response;
    } catch (error: any) {
      const errorMessage = error.message || '';
      
      if (errorMessage.includes('422') || errorMessage.includes('not found')) {
        console.warn('Webpay Status Info:', errorMessage);
        throw new NotFoundException('No se encontró la transacción con el token proporcionado.');
      }

      console.error('Error consultando estado Webpay:', error);
      throw new InternalServerErrorException('Error al consultar el estado de la transacción');
    }
  }

  /**
   * Anula o reembolsa una transacción
   */
  async refundTransaction(token: string, amount: number) {
    try {
      const tx = new WebpayPlus.Transaction(
        new Options(
          IntegrationCommerceCodes.WEBPAY_PLUS,
          IntegrationApiKeys.WEBPAY,
          Environment.Integration
        )
      );

      const response = await tx.refund(token, amount);

      // Si el reembolso es exitoso, actualizar estado en BD
      if (response.type === 'REVERSED' || response.type === 'NULLIFIED') {
        // Obtener buy_order desde el status
        const statusResponse = await tx.status(token);
        await this.updateTripStatus(statusResponse.buy_order, 'REEMBOLSADO');
      }

      return response;
    } catch (error: any) {
      const errorMessage = error.message || '';
      
      if (errorMessage.includes('422')) {
        console.warn('Webpay Refund Info:', errorMessage);
        throw new UnprocessableEntityException('No se puede reembolsar esta transacción. Verifica que esté autorizada y dentro del período válido.');
      }

      console.error('Error reembolsando Webpay:', error);
      throw new InternalServerErrorException('Error al procesar el reembolso');
    }
  }

  private async updateTripStatus(paramId: string, status: string) {
    // Asumimos que buy_order es el ID o contiene el ID del viaje.
    // Si buy_order es "orden-123", quizás debas parsearlo.
    // Aquí se asume que mapea directo a un ID de Prisma.
    try {
        // Ejemplo de implementación real (descomentar y ajustar modelo):
        /*
        await this.prisma.trip.update({
            where: { id: reqId },
            data: { status: 'PAID' } // Usar enum de Prisma si existe
        });
        */
       console.log(`[SIMULACIÓN] Actualizando DB: ID ${paramId} a estado ${status}`);
    } catch (dbError) {
        console.error('Error actualizando estado en DB:', dbError);
        // No lanzamos error aquí para no romper la respuesta al usuario, pero se debe loguear
    }
  }
}
