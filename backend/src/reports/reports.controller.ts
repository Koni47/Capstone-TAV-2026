import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ReportsService } from './reports.service';

@ApiTags('Reportes')
@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Dashboard administrativo con KPIs principales' })
  @ApiResponse({ status: 200, description: 'KPIs y estadísticas del dashboard' })
  async getDashboard() {
    return this.service.getDashboard();
  }

  @Get('billing')
  @ApiOperation({ summary: 'Reporte de facturación por período' })
  @ApiQuery({ name: 'month', required: false, example: '2026-01' })
  @ApiQuery({ name: 'clientId', required: false, example: 1 })
  async getBillingReport(
    @Query('month') month?: string,
    @Query('clientId') clientId?: string,
  ) {
    return this.service.getBillingReport(month, clientId ? Number(clientId) : undefined);
  }

  @Get('trips')
  @ApiOperation({ summary: 'Reporte de viajes por período' })
  @ApiQuery({ name: 'startDate', required: false, example: '2026-01-01' })
  @ApiQuery({ name: 'endDate', required: false, example: '2026-01-31' })
  async getTripsReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.service.getTripsReport(startDate, endDate);
  }

  @Get('revenue')
  @ApiOperation({ summary: 'Reporte de ingresos por servicio y cliente' })
  async getRevenueReport() {
    return this.service.getRevenueReport();
  }
}
