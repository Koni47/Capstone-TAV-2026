import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { TripsService } from './trips.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get('my-trips')
  @ApiOperation({ summary: 'Mis Viajes' })
  @ApiResponse({ status: 200, description: 'Lista de viajes del chofer.' })
  getMyTrips() {
    return this.tripsService.getMyTrips();
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
