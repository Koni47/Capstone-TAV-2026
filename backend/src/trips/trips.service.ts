import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

  async getMyTrips(userId?: string, role?: string) {
    // Filtrar según rol: CHOFER -> driverId, CLIENTE -> serviceRequest.clientId, ADMIN -> todos
    const where: any = {};
    if (role === 'CHOFER' && userId) {
      where.driverId = userId;
    } else if (role === 'CLIENTE' && userId) {
      where.serviceRequest = { is: { clientId: userId } };
    }

    const trips = await this.prisma.trip.findMany({
      where,
      include: {
        serviceRequest: { include: { client: true } },
        driver: true,
        vehicle: true,
        transactions: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return trips.map((t) => ({
      id: t.id,
      status: t.status,
      origin: t.serviceRequest?.origin || null,
      destination: t.serviceRequest?.destination || null,
      fare: t.fare || 0,
      driverId: t.driverId || null,
      clientId: t.serviceRequest?.clientId || null,
      clientName: t.serviceRequest?.client?.fullName || null,
      driverName: t.driver?.fullName || null,
      startTime: t.startTime?.toISOString() || null,
      endTime: t.endTime?.toISOString() || null,
      createdAt: t.createdAt.toISOString(),
    }));
  }

  async startTrip(id: string, userId?: string, role?: string) {
    const trip = await this.prisma.trip.findUnique({ where: { id } });
    if (!trip) throw new NotFoundException('Trip not found');

    // Permisos: solo ADMIN o el chofer asignado puede iniciar
    if (role !== 'ADMIN') {
      if (!userId || trip.driverId !== userId) {
        throw new ForbiddenException('No autorizado para iniciar este viaje');
      }
    }

    const updated = await this.prisma.trip.update({
      where: { id },
      data: { status: 'EN_RUTA', startTime: new Date() },
    });

    // Si está asignado un vehículo, marcarlo EN_RUTA
    if (updated.vehicleId) {
      await this.prisma.vehicle.update({ where: { id: updated.vehicleId }, data: { status: 'EN_RUTA' } });
    }

    return {
      id: updated.id,
      status: updated.status,
      startTime: updated.startTime,
    };
  }

  async finishTrip(id: string, userId?: string, role?: string) {
    const trip = await this.prisma.trip.findUnique({ where: { id } });
    if (!trip) throw new NotFoundException('Trip not found');

    // Permisos: solo ADMIN o el chofer asignado puede finalizar
    if (role !== 'ADMIN') {
      if (!userId || trip.driverId !== userId) {
        throw new ForbiddenException('No autorizado para finalizar este viaje');
      }
    }

    const updated = await this.prisma.trip.update({
      where: { id },
      data: { status: 'FINALIZADO', endTime: new Date() },
    });

    // Si hay vehículo asignado, marcarlo DISPONIBLE
    if (updated.vehicleId) {
      await this.prisma.vehicle.update({ where: { id: updated.vehicleId }, data: { status: 'DISPONIBLE' } });
    }

    return {
      id: updated.id,
      status: updated.status,
      endTime: updated.endTime,
    };
  }

  async uploadEvidence(id: string, data: any, userId?: string, role?: string) {
    const trip = await this.prisma.trip.findUnique({ where: { id } });
    if (!trip) throw new NotFoundException('Trip not found');
    // Permisos: ADMIN o chofer asignado puede subir evidencia
    if (role !== 'ADMIN') {
      if (!userId || trip.driverId !== userId) {
        throw new ForbiddenException('No autorizado para subir evidencia');
      }
    }

    const updated = await this.prisma.trip.update({ where: { id }, data: { evidenceUrl: data.url || null } });
    return { id: updated.id, evidenceUrl: updated.evidenceUrl };
  }

  async createTrip(data: any, userId?: string, role?: string) {
    // Crear ServiceRequest primero
    // Si el usuario es CLIENTE, forzamos clientId = userId para mantener integridad
    const clientId = role === 'CLIENTE' ? userId : data.clientId;

    const serviceRequest = await this.prisma.serviceRequest.create({
      data: {
        origin: data.origin,
        destination: data.destination,
        passengerCount: data.passengerCount || 1,
        notes: data.notes || null,
        clientId: clientId,
      },
    });

    const trip = await this.prisma.trip.create({
      data: {
        serviceRequestId: serviceRequest.id,
        status: 'PENDIENTE',
        fare: data.fare || 0,
      },
      include: { serviceRequest: true },
    });

    return {
      id: trip.id,
      status: trip.status,
      origin: trip.serviceRequest.origin,
      destination: trip.serviceRequest.destination,
      fare: trip.fare,
      clientId: trip.serviceRequest.clientId,
      createdAt: trip.createdAt,
    };
  }
}
