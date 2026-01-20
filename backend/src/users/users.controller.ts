import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar Usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios.' })
  findAll(@Query('role') role?: string) {
    return this.usersService.findAll(role);
  }

  @Post()
  @ApiOperation({ summary: 'Crear Usuario (Registro)' })
  @ApiResponse({ status: 201, description: 'Usuario creado.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('drivers/available')
  @ApiOperation({ summary: 'Choferes Disponibles' })
  @ApiResponse({ status: 200, description: 'Lista de choferes disponibles.' })
  findAvailableDrivers() {
    return this.usersService.findAvailableDrivers();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Editar Usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.usersService.update(id, updateUserDto);
  }
}
