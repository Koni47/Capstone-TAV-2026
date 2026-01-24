import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [trips, total] = await Promise.all([
      this.prisma.trip.findMany({
        skip,
        take: limit,
        include: {
          client: true,
          driver: true,
        },
        orderBy: { scheduledDate: 'desc' },
      }),
      this.prisma.trip.count(),
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

  async findOne(id: number) {
    const trip = await this.prisma.trip.findUnique({
      where: { id: id.toString() },
      include: {
        client: true,
        driver: true,
      },
    });

    if (!trip) {
      throw new NotFoundException(`Viaje #${id} no encontrado`);
    }

    return trip;
  }

  async updateStatus(id: number, status: TripStatus) {
    return this.prisma.trip.update({
      where: { id: id.toString() },
      data: { status: status as any },
    });
  }

  async startTrip(id: string) {
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

  async finishTrip(id: string, data?: any) {
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
