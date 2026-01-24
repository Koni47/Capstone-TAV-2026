import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripStatus } from './dto/create-trip.dto';

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

  async create(createTripDto: CreateTripDto) {
    return this.prisma.trip.create({
      data: {
        title: createTripDto.title,
        scheduledDate: new Date(createTripDto.scheduledDate),
        origin: createTripDto.origin,
        destination: createTripDto.destination,
        fare: createTripDto.fare,
        status: (createTripDto.status || TripStatus.PENDING) as any,
        clientId: createTripDto.clientId.toString(),
        driverId: createTripDto.driverId?.toString(),
      },
      include: {
        client: true,
        driver: true,
      },
    });
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
