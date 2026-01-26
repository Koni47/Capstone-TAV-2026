import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateDriverDto) {
    const hashedPassword = await bcrypt.hash(createDto.password, 10);

    // Buscar el rol CHOFER
    const role = await this.prisma.role.findUnique({
      where: { nombre: 'CHOFER' },
    });

    if (!role) {
      throw new NotFoundException('Rol CHOFER no encontrado');
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

  async findAll() {
    return this.prisma.user.findMany({
      where: { 
        role: {
          nombre: 'CHOFER'
        }
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        status: true,
      },
    });
  }

  async findOne(id: number) {
    const driver = await this.prisma.user.findFirst({
      where: { 
        id: id.toString(), 
        role: {
          nombre: 'CHOFER'
        }
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        status: true,
      },
    });

    if (!driver) {
      throw new NotFoundException(`Chofer #${id} no encontrado`);
    }

    return driver;
  }

  async update(id: number, updateDto: UpdateDriverDto) {
    // Verificar que el driver existe
    await this.findOne(id);

    // Construir objeto de actualización
    const updateData: any = {};

    if (updateDto.name !== undefined) {
      updateData.fullName = updateDto.name;
      updateData.name = updateDto.name;
    }
    if (updateDto.email !== undefined) updateData.email = updateDto.email;
    if (updateDto.password !== undefined) {
      updateData.password = await bcrypt.hash(updateDto.password, 10);
    }
    if (updateDto.phone !== undefined) updateData.phone = updateDto.phone;
    if (updateDto.companyId !== undefined) updateData.companyId = updateDto.companyId?.toString();

    return this.prisma.user.update({
      where: { id: id.toString() },
      data: updateData,
      include: {
        role: true,
      },
    });
  }

  async remove(id: number) {
    // Verificar que el driver existe
    await this.findOne(id);

    // Hard delete
    return this.prisma.user.delete({
      where: { id: id.toString() },
    });
  }

  async getDashboard(id: number) {
    // TODO: Implementar lógica real con agregaciones de Prisma
    return {
      driver: {
        name: 'Carlos López',
        id: `DRV-${id.toString().padStart(3, '0')}`,
        vehicle: 'Toyota Hilux - ABC-123',
      },
      kpis: [
        { label: 'Viajes Hoy', value: 3, icon: 'directions_car', color: 'primary', sub: '2 completados' },
        { label: 'Horas Trabajadas', value: '8.5h', icon: 'schedule', color: 'secondary' },
        { label: 'Ingresos Hoy', value: '$125.000', icon: 'attach_money', color: 'secondary' },
        { label: 'Calificación', value: '4.8', icon: 'star', color: 'secondary' },
      ],
    };
  }

  async getTrips(id: number) {
    const trips = await this.prisma.trip.findMany({
      where: { driverId: id.toString() },
      include: {
        client: { select: { name: true } },
      },
      orderBy: { scheduledDate: 'desc' },
      take: 20,
    });

    return trips;
  }
}
