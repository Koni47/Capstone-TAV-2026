import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        role: data.role as any,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async findAll(role?: string) {
    const where = role ? { role: role as any } : {};
    return this.prisma.user.findMany({ where });
  }

  async findAvailableDrivers(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        role: 'CHOFER',
      },
    });
  }

  async update(id: string, data: Partial<CreateUserDto>): Promise<User> {
    const user = await this.findOne(id);

    // No permitir cambiar email, rol o contraseña desde este método genérico.
    const { fullName, phone } = data;
    const updateData: any = {};
    if (fullName) updateData.fullName = fullName;
    if (phone) updateData.phone = phone;

    return this.prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });
  }
}
