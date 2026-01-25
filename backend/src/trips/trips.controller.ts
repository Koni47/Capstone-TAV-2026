import { Controller, Get, Post, Body, Param, Patch, Query, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { TripsService } from './trips.service';
import { CreateTripDto, TripStatus } from './dto/create-trip.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Viajes')
@Controller('trips')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Crear un nuevo viaje (Solo Admin)' })
  @ApiResponse({ status: 201, description: 'Viaje creado' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar viajes según rol del usuario autenticado' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAll(
    @CurrentUser() user,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.tripsService.findAll(user, Number(page) || 1, Number(limit) || 10);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de un viaje' })
  @ApiResponse({ status: 200, description: 'Detalle del viaje' })
  @ApiResponse({ status: 404, description: 'Viaje no encontrado' })
  @ApiResponse({ status: 403, description: 'No autorizado para ver este viaje' })
  async findOne(@Param('id') id: string, @CurrentUser() user) {
    return this.tripsService.findOne(id, user);
  }

  @Patch(':id/status')
  @Roles('ADMIN', 'CHOFER')
  @ApiOperation({ summary: 'Actualizar estado del viaje (Admin o Chofer)' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: TripStatus,
    @CurrentUser() user,
  ) {
    return this.tripsService.updateStatus(id, status, user);
  }

  @Patch(':id/start')
  @Roles('CHOFER')
  @ApiOperation({ summary: 'Iniciar Ruta (Solo Chofer)' })
  @ApiResponse({ status: 200, description: 'Viaje iniciado.' })
  @ApiResponse({ status: 404, description: 'Viaje no encontrado.' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  startTrip(@Param('id') id: string, @CurrentUser() user) {
    return this.tripsService.startTrip(id, user);
  }

  @Patch(':id/finish')
  @Roles('CHOFER')
  @ApiOperation({ summary: 'Finalizar Ruta (Solo Chofer)' })
  @ApiResponse({ status: 200, description: 'Viaje finalizado.' })
  @ApiResponse({ status: 404, description: 'Viaje no encontrado.' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  finishTrip(@Param('id') id: string, @CurrentUser() user) {
    return this.tripsService.finishTrip(id, user);
  }

  @Post(':id/evidence')
  @ApiOperation({ summary: 'Subir Evidencia' })
  @ApiResponse({ status: 201, description: 'Evidencia subida.' })
  @ApiResponse({ status: 400, description: 'Error al subir evidencia.' })
  uploadEvidence(@Param('id') id: string, @Body() body: any) {
    return this.tripsService.uploadEvidence(id, body);
  }

  @Post('recalculate-fares')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Recalcular todos los fares según nueva fórmula (Solo Admin)' })
  @ApiResponse({ status: 200, description: 'Fares recalculados exitosamente' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async recalculateFares() {
    return this.tripsService.recalculateAllFares();
  }
}
