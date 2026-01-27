import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get('stats')
  @ApiOperation({ summary: 'KPIs de Vehículos' })
  @ApiResponse({ status: 200, description: 'Estadísticas de la flota.' })
  getStats() {
    return this.vehiclesService.getStats();
  }

  @Get()
  @ApiOperation({ summary: 'Listar Flota' })
  @ApiResponse({ status: 200, description: 'Lista de vehículos paginada.' })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.vehiclesService.findAll(page, limit);
  }

  @Post()
  @ApiOperation({ summary: 'Crear Vehículo (Admin)' })
  @ApiResponse({ status: 201, description: 'Vehículo creado.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createVehicleDto: any) {
    return this.vehiclesService.create(createVehicleDto);
  }

  /* ...existing code... */
  @Get('available')
  @ApiOperation({ summary: 'Vehículos Disponibles' })
  @ApiResponse({ status: 200, description: 'Lista de vehículos disponibles.' })
  findAvailable() {
    return this.vehiclesService.findAvailable();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle Vehículo' })
  @ApiResponse({ status: 200, description: 'Detalle del vehículo.' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Editar Vehículo' })
  @ApiResponse({ status: 200, description: 'Vehículo actualizado.' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado.' })
  update(@Param('id') id: string, @Body() updateVehicleDto: any) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (Soft Delete)' })
  @ApiResponse({ status: 200, description: 'Vehículo eliminado.' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado.' })
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }
}
