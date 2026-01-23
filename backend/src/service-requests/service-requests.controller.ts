import { Controller, Get, Post, Body, Param, Patch, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ServiceRequestsService } from './service-requests.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';

@ApiTags('Solicitudes de Servicio')
@Controller('service-requests')
export class ServiceRequestsController {
  constructor(private readonly service: ServiceRequestsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva solicitud de servicio' })
  @ApiResponse({ status: 201, description: 'Solicitud creada' })
  async create(@Body() createDto: CreateServiceRequestDto) {
    // TODO: Obtener userId del token JWT en producción
    const userId = 1; // Mock temporal
    return this.service.create(createDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las solicitudes' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.service.findAll(Number(page) || 1, Number(limit) || 10);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Obtener estadísticas de solicitudes' })
  async getStats() {
    return this.service.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de una solicitud' })
  @ApiResponse({ status: 200, description: 'Detalle de la solicitud' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id/assign')
  @ApiOperation({ summary: 'Asignar chofer a una solicitud' })
  async assignDriver(
    @Param('id', ParseIntPipe) id: number,
    @Body('driverId') driverId: number,
  ) {
    return this.service.assignDriver(id, driverId);
  }
}
