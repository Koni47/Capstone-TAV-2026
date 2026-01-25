import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createDto.password, 10);

    // Buscar el rol por nombre
    const role = await this.prisma.role.findUnique({
      where: { nombre: createDto.role.toUpperCase() },
    });

    if (!role) {
      throw new NotFoundException('Rol no encontrado');
    }

    return this.prisma.user.create({
      data: {
        email: createDto.email,
        password: hashedPassword,
        fullName: createDto.name,
        name: createDto.name,
        roleId: role.id,
        phone: createDto.phone,
        companyId: createDto.companyId?.toString(),
      },
      include: {
        role: true,
      },
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        include: {
          role: true,
          company: { select: { name: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count(),
    ]);

    return {
      users: users.map((user) => ({
        ...user,
        name: user.fullName,
        role: user.role.nombre,
      })),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalResults: total,
      },
    };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id.toString() },
      include: {
        role: true,
        company: { select: { name: true, id: true } },
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuario #${id} no encontrado`);
    }

    return user;
  }

  async getStats() {
    const total = await this.prisma.user.count();
    const active = await this.prisma.user.count({
      where: { status: 'ACTIVO' },
    });
    const pending = await this.prisma.user.count({
      where: { status: 'PENDIENTE' },
    });

    return {
      totalUsers: total,
      activeUsers: active,
      pendingUsers: pending,
    };
  }
}
