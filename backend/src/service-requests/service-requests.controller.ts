import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ServiceRequestsService } from './service-requests.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('ServiceRequests')
@Controller('service-requests')
export class ServiceRequestsController {
  constructor(private readonly serviceRequestsService: ServiceRequestsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear Solicitud' })
  @ApiResponse({ status: 201, description: 'Solicitud creada.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createRequestDto: any) {
    return this.serviceRequestsService.create(createRequestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar Solicitudes' })
  @ApiResponse({ status: 200, description: 'Lista de solicitudes.' })
  findAll() {
    return this.serviceRequestsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle Solicitud' })
  @ApiResponse({ status: 200, description: 'Detalle de la solicitud.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.serviceRequestsService.findOne(id);
  }

  @Patch(':id/assign')
  @ApiOperation({ summary: 'Asignar Recurso' })
  @ApiResponse({ status: 200, description: 'Recurso asignado.' })
  @ApiResponse({ status: 400, description: 'Asignación inválida.' })
  assign(@Param('id') id: string, @Body() assignDto: any) {
    return this.serviceRequestsService.assign(id, assignDto);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancelar Solicitud' })
  @ApiResponse({ status: 200, description: 'Solicitud cancelada.' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada.' })
  cancel(@Param('id') id: string) {
    return this.serviceRequestsService.cancel(id);
  }
}
