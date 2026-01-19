import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('billing')
  @ApiOperation({ summary: 'Reporte Facturación' })
  getBillingReport() {
    return this.reportsService.getBillingReport();
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'KPIs Operativos' })
  getDashboardStats() {
    return this.reportsService.getDashboardStats();
  }
}
