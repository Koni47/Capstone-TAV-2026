import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('billing')
  @ApiOperation({ summary: 'Reporte Facturación' })
  @ApiResponse({ status: 200, description: 'Reporte de facturación.' })
  getBillingReport() {
    return this.reportsService.getBillingReport();
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'KPIs Operativos' })
  @ApiResponse({ status: 200, description: 'Datos del dashboard.' })
  getDashboardStats() {
    return this.reportsService.getDashboardStats();
  }
}
