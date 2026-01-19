import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar Clientes' })
  findAll() {
    return this.companiesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear Cliente' })
  create(@Body() createCompanyDto: any) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Estadísticas Cliente' })
  getStats(@Param('id') id: string) {
    return this.companiesService.getStats(id);
  }
}
