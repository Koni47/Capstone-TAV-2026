import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { DriversService } from './drivers.service';

@ApiTags('Choferes')
@Controller('drivers')
export class DriversController {
  constructor(private readonly service: DriversService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Crear nuevo chofer (Solo Admin)' })
  @ApiResponse({ status: 201, description: 'Chofer creado exitosamente' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async create(@Body() createDto: CreateDriverDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los choferes' })
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de un chofer' })
  @ApiResponse({ status: 200, description: 'Detalle del chofer' })
  @ApiResponse({ status: 404, description: 'Chofer no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Actualizar chofer (Solo Admin)' })
  @ApiResponse({ status: 200, description: 'Chofer actualizado' })
  @ApiResponse({ status: 404, description: 'Chofer no encontrado' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDriverDto,
  ) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Eliminar chofer (Solo Admin)' })
  @ApiResponse({ status: 200, description: 'Chofer eliminado' })
  @ApiResponse({ status: 404, description: 'Chofer no encontrado' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Get(':id/dashboard')
  @ApiOperation({ summary: 'Dashboard del chofer con KPIs' })
  async getDashboard(@Param('id', ParseIntPipe) id: number) {
    return this.service.getDashboard(id);
  }

  @Get(':id/trips')
  @ApiOperation({ summary: 'Viajes del chofer' })
  async getTrips(@Param('id', ParseIntPipe) id: number) {
    return this.service.getTrips(id);
  }
}
