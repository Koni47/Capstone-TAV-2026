import { Controller, Get, Post, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { TripsService } from './trips.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get('my-trips')
  @ApiOperation({ summary: 'Mis Viajes' })
  @ApiResponse({ status: 200, description: 'Lista de viajes del chofer.' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  getMyTrips(@Request() req: any) {
    // req.user expected to contain { sub: userId, role }
    const userId = req.user?.sub;
    const role = req.user?.role;
    return this.tripsService.getMyTrips(userId, role);
  }

  @Post()
  @ApiOperation({ summary: 'Crear Trip (crea ServiceRequest y Trip)' })
  @ApiResponse({ status: 201, description: 'Trip creado.' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  create(@Request() req: any, @Body() body: any) {
    return this.tripsService.createTrip(body, req.user?.sub, req.user?.role);
  }

  @Patch(':id/start')
  @ApiOperation({ summary: 'Iniciar Ruta' })
  @ApiResponse({ status: 200, description: 'Viaje iniciado.' })
  @ApiResponse({ status: 404, description: 'Viaje no encontrado.' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  startTrip(@Request() req: any, @Param('id') id: string) {
    return this.tripsService.startTrip(id, req.user?.sub, req.user?.role);
  }

  @Patch(':id/finish')
  @ApiOperation({ summary: 'Finalizar Ruta' })
  @ApiResponse({ status: 200, description: 'Viaje finalizado.' })
  @ApiResponse({ status: 404, description: 'Viaje no encontrado.' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  finishTrip(@Request() req: any, @Param('id') id: string) {
    return this.tripsService.finishTrip(id, req.user?.sub, req.user?.role);
  }

  @Post(':id/evidence')
  @ApiOperation({ summary: 'Subir Evidencia' })
  @ApiResponse({ status: 201, description: 'Evidencia subida.' })
  @ApiResponse({ status: 400, description: 'Error al subir evidencia.' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  uploadEvidence(@Request() req: any, @Param('id') id: string, @Body() body: any) {
    return this.tripsService.uploadEvidence(id, body, req.user?.sub, req.user?.role);
  }
}
