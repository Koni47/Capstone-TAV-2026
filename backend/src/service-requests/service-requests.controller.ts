import { Controller, Get, Post, Put, Delete, Body, Param, Patch, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ServiceRequestsService } from './service-requests.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Solicitudes de Servicio')
@Controller('service-requests')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ServiceRequestsController {
  constructor(private readonly service: ServiceRequestsService) {}

  @Post()
  @Roles('ADMIN', 'CLIENTE')
  @ApiOperation({ summary: 'Crear una nueva solicitud de servicio (Admin y Cliente)' })
  @ApiResponse({ status: 201, description: 'Solicitud creada' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async create(@Body() createDto: CreateServiceRequestDto, @CurrentUser() user) {
    return this.service.create(createDto, user.id);
  }

  @Get()
  @Roles('ADMIN', 'CLIENTE')
  @ApiOperation({ summary: 'Listar solicitudes (Admin ve todas, Cliente ve solo las suyas)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @CurrentUser() user?: any,
  ) {
    console.log('findAll called with user:', JSON.stringify(user, null, 2));

    // Determinar si filtrar por cliente
    let clientId: string | undefined;
    if (user?.role?.nombre === 'CLIENTE' || user?.role === 'CLIENTE') {
      clientId = user.id;
      console.log('Filtering by clientId:', clientId);
    } else {
      console.log('Admin user - showing all requests');
    }

    return this.service.findAll(Number(page) || 1, Number(limit) || 10, clientId);
  }

  @Get('stats')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Obtener estadísticas de solicitudes (Solo Admin)' })
  async getStats() {
    return this.service.getStats();
  }

  @Get(':id')
  @Roles('ADMIN', 'CLIENTE')
  @ApiOperation({ summary: 'Obtener detalle de una solicitud (Admin y Cliente)' })
  @ApiResponse({ status: 200, description: 'Detalle de la solicitud' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/assign')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Asignar chofer a una solicitud (Solo Admin)' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async assignDriver(
    @Param('id') id: string,
    @Body('driverId') driverId: number,
  ) {
    return this.service.assignDriver(id, driverId);
  }

  @Put(':id')
  @Roles('ADMIN', 'CLIENTE')
  @ApiOperation({ summary: 'Actualizar una solicitud (Admin o Cliente propietario)' })
  @ApiResponse({ status: 200, description: 'Solicitud actualizada' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateServiceRequestDto, @CurrentUser() user) {
    return this.service.update(id, updateDto, user);
  }

  @Delete(':id')
  @Roles('ADMIN', 'CLIENTE')
  @ApiOperation({ summary: 'Eliminar una solicitud (Admin o Cliente propietario)' })
  @ApiResponse({ status: 200, description: 'Solicitud eliminada' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  async remove(@Param('id') id: string, @CurrentUser() user) {
    return this.service.remove(id, user);
  }
}
