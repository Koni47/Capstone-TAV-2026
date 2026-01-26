import { Controller, Post, Put, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado' })
  @ApiResponse({ status: 409, description: 'Email ya registrado' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Cerrar sesión' })
  @ApiResponse({ status: 200, description: 'Sesión cerrada' })
  async logout() {
    return this.authService.logout();
  }

  @Put('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cambiar contraseña (Usuario autenticado)' })
  @ApiResponse({ status: 200, description: 'Contraseña cambiada exitosamente' })
  @ApiResponse({ status: 400, description: 'Contraseña actual incorrecta' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Request() req,
  ) {
    return this.authService.changePassword(req.user.id, changePasswordDto);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Solicitar restablecimiento de contraseña' })
  @ApiResponse({ status: 200, description: 'Email de restablecimiento enviado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }
}
