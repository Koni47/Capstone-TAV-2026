import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar Flota' })
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear Vehículo (Admin)' })
  create(@Body() createVehicleDto: any) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get('available')
  @ApiOperation({ summary: 'Vehículos Disponibles' })
  findAvailable(@Query() query: any) {
    return this.vehiclesService.findAvailable(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle Vehículo' })
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Editar Vehículo' })
  update(@Param('id') id: string, @Body() updateVehicleDto: any) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (Soft Delete)' })
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }
}
