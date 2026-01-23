import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      where: { role: 'CHOFER' },
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
      where: { id: id.toString(), role: 'CHOFER' },
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
