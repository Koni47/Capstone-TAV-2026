import { Controller, Get, Post, Body, Param, Patch, Query, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { TripsService } from './trips.service';
import { CreateTripDto, TripStatus } from './dto/create-trip.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar viajes según rol del usuario autenticado' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAll(
    @Request() req,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.tripsService.findAll(req.user, Number(page) || 1, Number(limit) || 10);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener detalle de un viaje' })
  @ApiResponse({ status: 200, description: 'Detalle del viaje' })
  @ApiResponse({ status: 404, description: 'Viaje no encontrado' })
  @ApiResponse({ status: 403, description: 'No autorizado para ver este viaje' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.tripsService.findOne(id, req.user);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar estado del viaje' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: TripStatus,
    @Request() req,
  ) {
    return this.tripsService.updateStatus(id, status, req.user);
  }

  @Patch(':id/start')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Iniciar Ruta' })
  @ApiResponse({ status: 200, description: 'Viaje iniciado.' })
  @ApiResponse({ status: 404, description: 'Viaje no encontrado.' })
  startTrip(@Param('id') id: string, @Request() req) {
    return this.tripsService.startTrip(id, req.user);
  }

  @Patch(':id/finish')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Finalizar Ruta' })
  @ApiResponse({ status: 200, description: 'Viaje finalizado.' })
  @ApiResponse({ status: 404, description: 'Viaje no encontrado.' })
  finishTrip(@Param('id') id: string, @Request() req) {
    return this.tripsService.finishTrip(id, req.user);
  }

  @Post(':id/evidence')
  @ApiOperation({ summary: 'Subir Evidencia' })
  @ApiResponse({ status: 201, description: 'Evidencia subida.' })
  @ApiResponse({ status: 400, description: 'Error al subir evidencia.' })
  uploadEvidence(@Param('id') id: string, @Body() body: any) {
    return this.tripsService.uploadEvidence(id, body);
  }
}
