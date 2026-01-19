import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { TripsService } from './trips.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get('my-trips')
  @ApiOperation({ summary: 'Mis Viajes' })
  getMyTrips() {
    return this.tripsService.getMyTrips();
  }

  @Patch(':id/start')
  @ApiOperation({ summary: 'Iniciar Ruta' })
  startTrip(@Param('id') id: string) {
    return this.tripsService.startTrip(id);
  }

  @Patch(':id/finish')
  @ApiOperation({ summary: 'Finalizar Ruta' })
  finishTrip(@Param('id') id: string) {
    return this.tripsService.finishTrip(id);
  }

  @Post(':id/evidence')
  @ApiOperation({ summary: 'Subir Evidencia' })
  uploadEvidence(@Param('id') id: string, @Body() body: any) {
    return this.tripsService.uploadEvidence(id, body);
  }
}
