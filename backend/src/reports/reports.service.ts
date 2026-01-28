import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface VehicleStats {
  total: number;
  available: number;
  maintenance: number;
  inUse: number;
}

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  getBillingReport() {
    return { file: 'billing.xlsx' };
  }

  async getDashboardStats() {
    // Trips
    const activeTrips = await this.prisma.trip.count({ where: { NOT: { status: 'FINALIZADO' } } });
    const completedTrips = await this.prisma.trip.count({ where: { status: 'FINALIZADO' } });

    // Revenue: sum of transaction.amount for completed trips
    const revenueResult = await this.prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { trip: { is: { status: 'FINALIZADO' } } },
    });
    const revenue = revenueResult._sum.amount || 0;

    // Vehicle stats
    const total = await this.prisma.vehicle.count();
    const available = await this.prisma.vehicle.count({ where: { status: 'DISPONIBLE' } });
    const maintenance = await this.prisma.vehicle.count({ where: { status: 'MANTENCION' } });
    const inUse = await this.prisma.vehicle.count({ where: { status: 'EN_RUTA' } });

    const vehicleStats: VehicleStats = { total, available, maintenance, inUse };

    return {
      activeTrips,
      completedTrips,
      revenue,
      vehicleStats,
    };
  }
}
