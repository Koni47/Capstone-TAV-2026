import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<any> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    const roleRecord = await this.prisma.userRoleModel.findUnique({
      where: { nombre: data.role || 'CLIENTE' },
    });

    if (!roleRecord) {
      throw new NotFoundException('Rol no encontrado');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        rut: data.rut,
        email: data.email,
        password: hashedPassword,
        nombreCompleto: data.nombreCompleto,
        rolId: roleRecord.id,
        empresaId: data.empresaId,
      },
      include: { role: true },
    });
  }

  async findByEmail(email: string): Promise<any> {
    return this.prisma.user.findUnique({ 
      where: { email },
      include: { role: true }
    });
  }

  async findOne(id: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ 
      where: { id },
      include: { role: true }
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async findAll(role?: string): Promise<any[]> {
    const where = role ? { role: { nombre: role } } : {};
    return this.prisma.user.findMany({
      where,
      include: { role: true },
    });
  }

  async findAvailableDrivers(): Promise<any[]> {
    return this.prisma.user.findMany({
      where: {
        role: { nombre: 'CHOFER' },
      },
      include: { role: true },
    });
  }

  async update(id: string, data: Partial<CreateUserDto>): Promise<any> {
    const user = await this.findOne(id);

    // No permitir cambiar email, rol o contraseña desde este método genérico.
    const { nombreCompleto } = data;
    const updateData: any = {};
    if (nombreCompleto) updateData.nombreCompleto = nombreCompleto;

    return this.prisma.user.update({
      where: { id: user.id },
      data: updateData,
      include: { role: true },
    });
  }
}
