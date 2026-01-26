import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Empresas/Clientes')
@Controller('companies')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Crear una nueva empresa (Solo Admin)' })
  @ApiResponse({ status: 201, description: 'Empresa creada' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Listar todas las empresas (Solo Admin)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.companiesService.findAll(Number(page) || 1, Number(limit) || 10);
  }

  @Get('stats')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Obtener estadísticas de empresas (Solo Admin)' })
  async getStats() {
    return this.companiesService.getStats();
  }

  @Get(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Obtener detalle de una empresa (Solo Admin)' })
  @ApiResponse({ status: 200, description: 'Detalle de la empresa' })
  @ApiResponse({ status: 404, description: 'Empresa no encontrada' })
  async findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Actualizar una empresa (Solo Admin)' })
  @ApiResponse({ status: 200, description: 'Empresa actualizada' })
  @ApiResponse({ status: 404, description: 'Empresa no encontrada' })
  async update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Eliminar una empresa (Solo Admin)' })
  @ApiResponse({ status: 200, description: 'Empresa eliminada' })
  @ApiResponse({ status: 404, description: 'Empresa no encontrada' })
  async remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }
}
