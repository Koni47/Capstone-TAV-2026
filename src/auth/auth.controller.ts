import { Controller, Post, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registro de nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente.' })
  @ApiResponse({ status: 409, description: 'El correo ya existe.' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Inicio de sesión' })
  @ApiResponse({ status: 200, description: 'Login exitoso, retorna Access y Refresh Token.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refrescar Token' })
  refresh() {
    return this.authService.refreshToken();
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Perfil de Usuario' })
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Post('recover-password')
  @ApiOperation({ summary: 'Recuperar Clave' })
  recoverPassword(@Body() body: any) {
    return this.authService.recoverPassword(body);
  }

  @Patch('reset-password')
  @ApiOperation({ summary: 'Restablecer Clave' })
  resetPassword(@Body() body: any) {
    return this.authService.resetPassword(body);
  }
}
