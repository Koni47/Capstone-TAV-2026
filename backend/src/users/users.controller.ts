import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Usuarios')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Crear un nuevo usuario (Solo Admin)' })
  @ApiResponse({ status: 201, description: 'Usuario creado' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async create(@Body() createDto: CreateUserDto) {
    return this.service.create(createDto);
  }

  @Get()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Listar todos los usuarios (Solo Admin)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.service.findAll(Number(page) || 1, Number(limit) || 10);
  }

  @Get('stats')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Obtener estadísticas de usuarios (Solo Admin)' })
  async getStats() {
    return this.service.getStats();
  }

  @Get(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Obtener detalle de un usuario (Solo Admin)' })
  @ApiResponse({ status: 200, description: 'Detalle del usuario' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Actualizar un usuario (Solo Admin)' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateUserDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Eliminar un usuario (Solo Admin)' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
