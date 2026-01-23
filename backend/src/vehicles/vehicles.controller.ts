import { Controller, Get, Post, Body, Param, Patch, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto, VehicleStatus } from './dto/create-vehicle.dto';

@ApiTags('Vehículos')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly service: VehiclesService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo vehículo' })
  @ApiResponse({ status: 201, description: 'Vehículo registrado' })
  async create(@Body() createDto: CreateVehicleDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los vehículos' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.service.findAll(Number(page) || 1, Number(limit) || 10);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Obtener estadísticas de vehículos' })
  async getStats() {
    return this.service.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de un vehículo' })
  @ApiResponse({ status: 200, description: 'Detalle del vehículo' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Actualizar estado del vehículo' })
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: VehicleStatus,
  ) {
    return this.service.updateStatus(id, status);
  }
}
