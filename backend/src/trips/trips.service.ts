import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripStatus } from './dto/create-trip.dto';

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

  async create(createTripDto: CreateTripDto) {
    // Construir objeto de datos con campos opcionales
    const tripData: any = {
      status: (createTripDto.status || TripStatus.PENDIENTE) as any,
    };

    // Agregar campos opcionales solo si están definidos
    if (createTripDto.title) tripData.title = createTripDto.title;
    if (createTripDto.scheduledDate) tripData.scheduledDate = new Date(createTripDto.scheduledDate);
    if (createTripDto.origin) tripData.origin = createTripDto.origin;
    if (createTripDto.destination) tripData.destination = createTripDto.destination;
    if (createTripDto.fare) tripData.fare = createTripDto.fare;
    if (createTripDto.clientId) tripData.clientId = createTripDto.clientId;
    if (createTripDto.driverId) tripData.driverId = createTripDto.driverId;
    if (createTripDto.vehicleId) tripData.vehicleId = createTripDto.vehicleId;
    if (createTripDto.serviceRequestId) tripData.serviceRequestId = createTripDto.serviceRequestId;

    // Crear el trip y actualizar el ServiceRequest si existe
    const trip = await this.prisma.trip.create({
      data: tripData,
      include: {
        client: true,
        driver: true,
        vehicle: true,
        serviceRequest: true,
      },
    });

    // Si se asoció a un ServiceRequest, actualizar su estado a ASIGNADO
    if (createTripDto.serviceRequestId) {
      await this.prisma.serviceRequest.update({
        where: { id: createTripDto.serviceRequestId },
        data: { status: 'ASIGNADO' as any },
      });
    }

    return trip;
  }

  async findAll(user: any, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    // Obtener rol del usuario
    const userRole = user.role?.nombre || user.role;

    // Construir filtro según rol
    let whereClause: any = {};

    if (userRole === 'CHOFER') {
      // Chofer: solo sus viajes asignados
      whereClause = { driverId: user.id };
    } else if (userRole === 'CLIENTE') {
      // Cliente: solo viajes de su empresa
      if (!user.companyId) {
        return {
          trips: [],
          pagination: {
            currentPage: page,
            totalPages: 0,
            totalResults: 0,
          },
        };
      }
      whereClause = { clientId: user.companyId };
    }
    // Si es ADMIN, whereClause queda {} = todos los viajes

    const [trips, total] = await Promise.all([
      this.prisma.trip.findMany({
        where: whereClause,
        skip,
        take: limit,
        include: {
          client: true,
          driver: true,
          vehicle: true,
        },
        orderBy: { scheduledDate: 'desc' },
      }),
      this.prisma.trip.count({ where: whereClause }),
    ]);

    return {
      trips,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalResults: total,
      },
    };
  }

  async findOne(id: string, user: any) {
    const trip = await this.prisma.trip.findUnique({
      where: { id },
      include: {
        client: true,
        driver: true,
        vehicle: true,
      },
    });

    if (!trip) {
      throw new NotFoundException(`Viaje #${id} no encontrado`);
    }

    // Validar acceso según rol
    const userRole = user.role?.nombre || user.role;

    if (userRole === 'CHOFER' && trip.driverId !== user.id) {
      throw new ForbiddenException('No tienes acceso a este viaje');
    }

    if (userRole === 'CLIENTE' && trip.clientId !== user.companyId) {
      throw new ForbiddenException('No tienes acceso a este viaje');
    }

    return trip;
  }

  async updateStatus(id: string, status: TripStatus, user: any) {
    // Primero validar que el usuario tenga acceso al viaje
    await this.findOne(id, user);

    return this.prisma.trip.update({
      where: { id },
      data: { status: status as any },
    });
  }

  async startTrip(id: string, user: any) {
    // Validar que el usuario sea el chofer asignado
    const trip = await this.prisma.trip.findUnique({
      where: { id },
    });

    if (!trip) {
      throw new NotFoundException(`Viaje no encontrado`);
    }

    const userRole = user.role?.nombre || user.role;

    if (userRole === 'CHOFER' && trip.driverId !== user.id) {
      throw new ForbiddenException('Solo el chofer asignado puede iniciar este viaje');
    }

    return this.prisma.trip.update({
      where: { id },
      data: {
        status: 'EN_RUTA' as any,
        startTime: new Date(),
      },
      include: {
        client: true,
        driver: true,
      },
    });
  }

  async finishTrip(id: string, user: any, data?: any) {
    // Validar que el usuario sea el chofer asignado
    const trip = await this.prisma.trip.findUnique({
      where: { id },
    });

    if (!trip) {
      throw new NotFoundException(`Viaje no encontrado`);
    }

    const userRole = user.role?.nombre || user.role;

    if (userRole === 'CHOFER' && trip.driverId !== user.id) {
      throw new ForbiddenException('Solo el chofer asignado puede finalizar este viaje');
    }

    return this.prisma.trip.update({
      where: { id },
      data: {
        status: 'FINALIZADO' as any,
        endTime: new Date(),
        fare: data?.finalFare || undefined,
      },
      include: {
        client: true,
        driver: true,
      },
    });
  }

  async uploadEvidence(id: string, body: any) {
    // El campo evidenceUrl no existe en el schema actual
    // Por ahora retornamos un mensaje de éxito
    return {
      message: 'Evidencia recibida',
      tripId: id,
      data: body,
    };
  }
}
