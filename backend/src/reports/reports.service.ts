import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getDashboard() {
    // Calcular métricas reales desde la base de datos 
    const totalTrips = await this.prisma.trip.count();
    
    // Calcular ingresos totales desde trips finalizados
    const trips = await this.prisma.trip.findMany({
      where: { status: 'FINALIZADO' },
      select: { fare: true }
    });
    const totalRevenue = trips.reduce((sum, trip) => sum + (trip.fare || 0), 0);
    
    // Contar viajes pendientes
    const pendingTrips = await this.prisma.trip.count({
      where: { status: 'PENDIENTE' }
    });
    
    // Contar vehículos activos
    const totalVehicles = await this.prisma.vehicle.count();
    const activeVehicles = await this.prisma.vehicle.count({
      where: { status: 'DISPONIBLE' }
    });
    
    return {
      kpis: {
        totalTrips,
        totalRevenue,
        pendingTrips,
        activeVehicles: `${activeVehicles} / ${totalVehicles}`,
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

    // Función para calcular fare dinámicamente con la nueva fórmula
    const calculateFare = (trip: any): number => {
      const baseRate = 1800; // $1,800 por km
      const airportSurcharge = 5000; // $5,000 si va al aeropuerto
      const minimumFare = 30000; // Mínimo $30,000

      // Usar distancia almacenada en el trip, o 20km por defecto si no hay datos
      const distance = trip.distance || 20;

      // Detectar si va al aeropuerto
      const isAirport = 
        trip.origin?.toLowerCase().includes('aeropuerto') ||
        trip.destination?.toLowerCase().includes('aeropuerto');

      // Calcular
      const baseCost = distance * baseRate;
      const surcharge = isAirport ? airportSurcharge : 0;
      return Math.max(baseCost + surcharge, minimumFare);
    };

    const totalGeneral = trips.reduce((sum, trip) => sum + calculateFare(trip), 0);

    return {
      results: {
        month: month || 'Enero 2026',
        rows: trips.map(trip => {
          const fare = calculateFare(trip);
          return {
            date: trip.scheduledDate.toISOString().split('T')[0],
            client: trip.client?.name || 'N/A',
            trip: `VJ-${trip.id}`,
            trips: 1,
            driver: trip.driver?.fullName || 'Sin asignar',
            fare: fare,
            kilometers: trip.distance || 20, // Usar distancia almacenada
            total: fare,
            status: trip.status,
          };
        }),
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
