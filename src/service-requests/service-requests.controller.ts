import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ServiceRequestsService } from './service-requests.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('ServiceRequests')
@Controller('service-requests')
export class ServiceRequestsController {
  constructor(private readonly serviceRequestsService: ServiceRequestsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear Solicitud' })
  create(@Body() createRequestDto: any) {
    return this.serviceRequestsService.create(createRequestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar Solicitudes' })
  findAll() {
    return this.serviceRequestsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle Solicitud' })
  findOne(@Param('id') id: string) {
    return this.serviceRequestsService.findOne(id);
  }

  @Patch(':id/assign')
  @ApiOperation({ summary: 'Asignar Recurso' })
  assign(@Param('id') id: string, @Body() assignDto: any) {
    return this.serviceRequestsService.assign(id, assignDto);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancelar Solicitud' })
  cancel(@Param('id') id: string) {
    return this.serviceRequestsService.cancel(id);
  }
}
