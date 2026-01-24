import { Controller, Get, Post, Body, Param, Patch, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';

@ApiTags('Denuncias y Reclamos')
@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly service: ComplaintsService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una nueva denuncia o reclamo' })
  @ApiResponse({ status: 201, description: 'Denuncia registrada exitosamente' })
  async create(@Body() createDto: CreateComplaintDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las denuncias (Admin)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.service.findAll(Number(page) || 1, Number(limit) || 10);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de una denuncia' })
  @ApiResponse({ status: 200, description: 'Detalle de la denuncia' })
  @ApiResponse({ status: 404, description: 'Denuncia no encontrada' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Actualizar estado de una denuncia' })
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ) {
    return this.service.updateStatus(id, status);
  }
}
