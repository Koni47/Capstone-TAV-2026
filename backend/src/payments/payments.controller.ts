import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { InitWebpayDto } from './dto/init-webpay.dto';
import { CommitWebpayDto } from './dto/commit-webpay.dto';
import { RefundWebpayDto } from './dto/refund-webpay.dto';
import { TestInitWebpayDto } from './dto/test-init-webpay.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('webpay/init')
  @ApiOperation({ summary: 'Iniciar una transaccion de pago con Webpay Plus' })
  @ApiResponse({
    status: 201,
    description: 'Transaccion iniciada correctamente',
    schema: { example: { token: 'xx', url: 'xx' } },
  })
  @ApiBody({ type: InitWebpayDto }) // Agrega esto para Swagger
  async initWebpay(@Body() dto: InitWebpayDto) {
    return this.paymentsService.initTransaction(dto.tripId);
  }

  @Post('test-init')
  @ApiOperation({ summary: 'DEBUG: Iniciar transaccion manual sin BD' })
  @ApiBody({ type: TestInitWebpayDto })
  async initManualTransaction(@Body() dto: TestInitWebpayDto) {
    return this.paymentsService.initTestTransaction(dto.amount, dto.buyOrder);
  }

  @Post('webpay/commit')
  @ApiOperation({ summary: 'Confirmar transaccion de Webpay (Usado por el Frontend)' })
  @ApiBody({ type: CommitWebpayDto })
  async commitWebpay(@Body() dto: CommitWebpayDto) {
    return this.paymentsService.commitTransaction(dto.token_ws);
  }

  @Get('webpay/status/:token')
  @ApiOperation({
    summary: 'Consultar estado REAL de una transaccion en Transbank y sincronizar BD',
  })
  @ApiParam({ name: 'token', description: 'Token Webpay (token_ws)' })
  async checkStatus(@Param('token') token: string) {
    return this.paymentsService.checkTransactionStatus(token);
  }

  @Post('webpay/refund')
  @ApiOperation({ summary: 'Anular/Reembolsar una transaccion (Admin)' })
  @ApiBody({ type: RefundWebpayDto })
  async refundTransaction(@Body() dto: RefundWebpayDto) {
    return this.paymentsService.refundTransaction(dto.tripId, dto.amount);
  }

  @Post('webpay/reconcile')
  @ApiOperation({ summary: 'Conciliar transacciones pendientes antiguas (Cron job)' })
  async reconcile() {
    return this.paymentsService.reconcileOldTransactions();
  }
}
