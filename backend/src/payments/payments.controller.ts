import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { InitiatePaymentDto } from './dto/initiate-payment.dto';
import { CommitPaymentDto } from './dto/commit-payment.dto';
import { CheckStatusDto } from './dto/check-status.dto';
import { RefundPaymentDto } from './dto/refund-payment.dto';

@ApiTags('Pagos (Webpay)')
@Controller('payments/webpay')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('initiate')
  @ApiOperation({ summary: 'Iniciar una transacción de Webpay Plus' })
  @ApiResponse({ status: 201, description: 'Transacción creada. Retorna token y URL de redirección.' })
  @ApiResponse({ status: 500, description: 'Error al iniciar la transacción.' })
  async initiate(@Body() dto: InitiatePaymentDto) {
    return this.paymentsService.initiateWEBPay(dto.amount, dto.buyOrder, dto.sessionId);
  }

  @Post('commit')
  @ApiOperation({ summary: 'Confirmar una transacción de Webpay Plus' })
  @ApiResponse({ status: 200, description: 'Transacción confirmada. Retorna el estado del pago.' })
  @ApiResponse({ status: 422, description: 'Token inválido o transacción no completada.' })
  async commit(@Body() dto: CommitPaymentDto) {
    return this.paymentsService.commitWEBPay(dto.token_ws);
  }

  @Get('status')
  @ApiOperation({ summary: 'Consultar el estado de una transacción' })
  @ApiResponse({ status: 200, description: 'Estado de la transacción.' })
  @ApiResponse({ status: 404, description: 'Transacción no encontrada.' })
  async status(@Query() dto: CheckStatusDto) {
    return this.paymentsService.checkStatus(dto.token);
  }

  @Post('refund')
  @ApiOperation({ summary: 'Anular o reembolsar una transacción' })
  @ApiResponse({ status: 200, description: 'Reembolso procesado exitosamente.' })
  @ApiResponse({ status: 422, description: 'No se puede reembolsar la transacción.' })
  async refund(@Body() dto: RefundPaymentDto) {
    return this.paymentsService.refundTransaction(dto.token, dto.amount);
  }
}
