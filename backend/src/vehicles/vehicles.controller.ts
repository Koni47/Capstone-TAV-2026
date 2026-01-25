import { Controller, Get, Post, Body, Param, Patch, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto, VehicleStatus } from './dto/create-vehicle.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Vehículos')
@Controller('vehicles')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class VehiclesController {
  constructor(private readonly service: VehiclesService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Registrar un nuevo vehículo (Solo Admin)' })
  @ApiResponse({ status: 201, description: 'Vehículo registrado' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async create(@Body() createDto: CreateVehicleDto) {
    return this.service.create(createDto);
  }

  @Get()
  @Roles('ADMIN', 'CHOFER')
  @ApiOperation({ summary: 'Listar todos los vehículos (Admin y Chofer)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.service.findAll(Number(page) || 1, Number(limit) || 10);
  }

  @Get('stats')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Obtener estadísticas de vehículos (Solo Admin)' })
  async getStats() {
    return this.service.getStats();
  }

  @Get(':id')
  @Roles('ADMIN', 'CHOFER')
  @ApiOperation({ summary: 'Obtener detalle de un vehículo (Admin y Chofer)' })
  @ApiResponse({ status: 200, description: 'Detalle del vehículo' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/status')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Actualizar estado del vehículo (Solo Admin)' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: VehicleStatus,
  ) {
    return this.service.updateStatus(id, status);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Actualizar información del vehículo (Solo Admin)' })
  @ApiResponse({ status: 200, description: 'Vehículo actualizado' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateVehicleDto>,
  ) {
    return this.service.update(id, updateDto);
  }}