import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar Clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes.' })
  findAll() {
    return this.companiesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear Cliente' })
  @ApiResponse({ status: 201, description: 'Cliente creado.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createCompanyDto: any) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Estadísticas Cliente' })
  @ApiResponse({ status: 200, description: 'Estadísticas del cliente.' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
  getStats(@Param('id') id: string) {
    return this.companiesService.getStats(id);
  }
}
