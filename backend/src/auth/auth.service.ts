import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Buscar usuario por email con su rol
    const user = await this.prisma.user.findFirst({
      where: { email },
      include: {
        company: true,
        role: true,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Actualizar último login (temporalmente deshabilitado por problema de cache)
    // await this.prisma.user.update({
    //   where: { id: user.id },
    //   data: { lastLogin: new Date() },
    // });

    const payload = { sub: user.id, email: user.email, role: user.role.nombre };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.fullName,
        email: user.email,
        role: user.role.nombre,
        company: user.company?.name,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    // Buscar el rol por nombre
    const role = await this.prisma.role.findUnique({
      where: { nombre: registerDto.role.toUpperCase() },
    });

    if (!role) {
      throw new ConflictException('Rol no encontrado');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
        fullName: registerDto.name,
        name: registerDto.name,
        roleId: role.id,
        phone: registerDto.phone,
        companyId: registerDto.companyId?.toString(),
      },
    });

    return { message: 'Usuario registrado exitosamente', userId: user.id };
  }

  async logout() {
    return { message: 'Sesión cerrada exitosamente' };
  }
}
