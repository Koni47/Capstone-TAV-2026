import { Controller, Post, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
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
  @ApiResponse({ status: 200, description: 'Nuevo token generado.' })
  @ApiResponse({ status: 401, description: 'Token inválido.' })
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Perfil de Usuario' })
  @ApiResponse({ status: 200, description: 'Datos del usuario.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Post('recover-password')
  @ApiOperation({ summary: 'Recuperar Clave' })
  @ApiResponse({ status: 200, description: 'Correo enviado.' })
  @ApiResponse({ status: 400, description: 'Correo no encontrado.' })
  recoverPassword(@Body() body: any) {
    return this.authService.recoverPassword(body);
  }

  @Patch('reset-password')
  @ApiOperation({ summary: 'Restablecer Clave' })
  @ApiResponse({ status: 200, description: 'Contraseña cambiada.' })
  @ApiResponse({ status: 400, description: 'Token inválido.' })
  resetPassword(@Body() body: any) {
    return this.authService.resetPassword(body);
  }
}
