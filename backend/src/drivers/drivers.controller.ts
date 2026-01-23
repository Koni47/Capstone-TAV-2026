import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DriversService } from './drivers.service';

@ApiTags('Choferes')
@Controller('drivers')
export class DriversController {
  constructor(private readonly service: DriversService) {}

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
