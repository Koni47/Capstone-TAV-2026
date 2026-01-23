import { Controller, Get, Post, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@ApiTags('Empresas/Clientes')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva empresa' })
  @ApiResponse({ status: 201, description: 'Empresa creada' })
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las empresas' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.companiesService.findAll(Number(page) || 1, Number(limit) || 10);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Obtener estadísticas de empresas' })
  async getStats() {
    return this.companiesService.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de una empresa' })
  @ApiResponse({ status: 200, description: 'Detalle de la empresa' })
  @ApiResponse({ status: 404, description: 'Empresa no encontrada' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.findOne(id);
  }
}
