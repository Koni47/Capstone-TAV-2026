import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getDashboard() {
    // TODO: Implementar con queries reales de Prisma
    const totalTrips = await this.prisma.trip.count();
    
    return {
      kpis: {
        totalTrips,
        totalRevenue: 1245000,
        pendingTrips: 23,
        activeVehicles: '18 / 20',
      },
      revenueByService: [
        { label: 'Transporte Personal', value: 400000 },
        { label: 'Corporativo', value: 520000 },
        { label: 'Turismo', value: 150000 },
        { label: 'Otros', value: 75000 },
      ],
      topClients: [
        { name: 'Minera ABC', value: 450000 },
        { name: 'Constructora XYZ', value: 320000 },
        { name: 'Transportes ABC', value: 250000 },
        { name: 'Empresas LMN', value: 150000 },
        { name: 'Otros Clientes', value: 75000 },
      ],
      tripsByMonth: [180, 200, 220, 230, 245, 250],
      vehicleOccupancy: { occupied: 12, available: 6, maintenance: 2 },
    };
  }

  async getBillingReport(month?: string, clientId?: number) {
    const whereClause: any = {};
    
    if (month) {
      const [year, monthNum] = month.split('-');
      const startDate = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(monthNum), 0);
      whereClause.scheduledDate = {
        gte: startDate,
        lte: endDate,
      };
    }
    
    if (clientId) {
      whereClause.clientId = clientId;
    }

    const trips = await this.prisma.trip.findMany({
      where: whereClause,
      include: {
        client: { select: { name: true } },
        driver: { select: { fullName: true } },
      },
      orderBy: { scheduledDate: 'desc' },
    });

    const totalGeneral = trips.reduce((sum, trip) => sum + (trip.fare || 0), 0);

    return {
      results: {
        month: month || 'Enero 2026',
        rows: trips.map(trip => ({
          date: trip.scheduledDate.toISOString().split('T')[0],
          client: trip.client?.name || 'N/A',
          trip: `VJ-${trip.id}`,
          trips: 1,
          driver: trip.driver?.fullName || 'Sin asignar',
          fare: trip.fare,
          kilometers: 150, // TODO: Calcular desde origen/destino
          total: trip.fare,
          status: trip.status,
        })),
        totalGeneral,
      },
    };
  }

  async getTripsReport(startDate?: string, endDate?: string) {
    const whereClause: any = {};
    
    if (startDate && endDate) {
      whereClause.scheduledDate = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const trips = await this.prisma.trip.findMany({
      where: whereClause,
      include: {
        client: { select: { name: true } },
        driver: { select: { fullName: true } },
      },
      orderBy: { scheduledDate: 'desc' },
    });

    return trips;
  }

  async getRevenueReport() {
    // TODO: Implementar agregaciones reales
    return {
      byService: [
        { service: 'Transporte Personal', revenue: 400000, trips: 120 },
        { service: 'Corporativo', revenue: 520000, trips: 80 },
        { service: 'Turismo', revenue: 150000, trips: 30 },
        { service: 'Otros', revenue: 75000, trips: 15 },
      ],
      byClient: [
        { client: 'Minera ABC', revenue: 450000, trips: 45 },
        { client: 'Constructora XYZ', revenue: 320000, trips: 32 },
        { client: 'Transportes ABC', revenue: 250000, trips: 28 },
      ],
      total: 1145000,
    };
  }
}
