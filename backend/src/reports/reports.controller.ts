import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Reportes')
@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Get('dashboard')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Dashboard administrativo con KPIs principales (Solo Admin)' })
  @ApiResponse({ status: 200, description: 'KPIs y estadísticas del dashboard' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async getDashboard() {
    return this.service.getDashboard();
  }

  @Get('billing')
  @Roles('ADMIN', 'CLIENTE')
  @ApiOperation({ summary: 'Reporte de facturación por período (Admin y Cliente)' })
  @ApiQuery({ name: 'month', required: false, example: '2026-01' })
  @ApiQuery({ name: 'clientId', required: false, example: 1 })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async getBillingReport(
    @Query('month') month?: string,
    @Query('clientId') clientId?: string,
  ) {
    return this.service.getBillingReport(month, clientId ? Number(clientId) : undefined);
  }

  @Get('trips')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Reporte de viajes por período (Solo Admin)' })
  @ApiQuery({ name: 'startDate', required: false, example: '2026-01-01' })
  @ApiQuery({ name: 'endDate', required: false, example: '2026-01-31' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async getTripsReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.service.getTripsReport(startDate, endDate);
  }

  @Get('revenue')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Reporte de ingresos por servicio y cliente (Solo Admin)' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async getRevenueReport() {
    return this.service.getRevenueReport();
  }
}
