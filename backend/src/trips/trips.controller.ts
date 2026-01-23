import { Controller, Get, Post, Body, Param, Patch, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TripsService } from './trips.service';
import { CreateTripDto, TripStatus } from './dto/create-trip.dto';

@ApiTags('Viajes')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo viaje' })
  @ApiResponse({ status: 201, description: 'Viaje creado' })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los viajes' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.tripsService.findAll(Number(page) || 1, Number(limit) || 10);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de un viaje' })
  @ApiResponse({ status: 200, description: 'Detalle del viaje' })
  @ApiResponse({ status: 404, description: 'Viaje no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Actualizar estado del viaje' })
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: TripStatus,
  ) {
    return this.tripsService.updateStatus(id, status);
  }

  @Patch(':id/start')
  @ApiOperation({ summary: 'Iniciar Ruta' })
  @ApiResponse({ status: 200, description: 'Viaje iniciado.' })
  @ApiResponse({ status: 404, description: 'Viaje no encontrado.' })
  startTrip(@Param('id') id: string) {
    return this.tripsService.startTrip(id);
  }

  @Patch(':id/finish')
  @ApiOperation({ summary: 'Finalizar Ruta' })
  @ApiResponse({ status: 200, description: 'Viaje finalizado.' })
  @ApiResponse({ status: 404, description: 'Viaje no encontrado.' })
  finishTrip(@Param('id') id: string) {
    return this.tripsService.finishTrip(id);
  }

  @Post(':id/evidence')
  @ApiOperation({ summary: 'Subir Evidencia' })
  @ApiResponse({ status: 201, description: 'Evidencia subida.' })
  @ApiResponse({ status: 400, description: 'Error al subir evidencia.' })
  uploadEvidence(@Param('id') id: string, @Body() body: any) {
    return this.tripsService.uploadEvidence(id, body);
  }
}
