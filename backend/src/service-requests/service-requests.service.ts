import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';

@Injectable()
export class ServiceRequestsService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateServiceRequestDto, userId: number) {
    return this.prisma.serviceRequest.create({
      data: {
        origin: createDto.origin,
        destination: createDto.destination,
        passengerCount: createDto.passengers,
        requestedAt: new Date(createDto.requestedDate),
        estimatedFare: createDto.estimatedFare,
        notes: createDto.notes,
        clientId: userId.toString(),
        status: 'PENDIENTE',
      },
    });
  }

  async findAll(page = 1, limit = 10, clientId?: string) {
    const skip = (page - 1) * limit;
    const whereClause = clientId ? { clientId } : {};
    
    const [requests, total] = await Promise.all([
      this.prisma.serviceRequest.findMany({
        where: whereClause,
        skip,
        take: limit,
        include: {
          client: { select: { fullName: true, email: true } },
          company: { select: { name: true, rut: true } },
          trip: {
            include: {
              driver: { 
                select: { 
                  id: true, 
                  fullName: true, 
                  email: true, 
                  phone: true 
                } 
              },
              vehicle: { 
                select: { 
                  id: true, 
                  licensePlate: true, 
                  model: true, 
                  type: true,
                  year: true
                } 
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.serviceRequest.count({ where: whereClause }),
    ]);

    return {
      requests,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalResults: total,
      },
    };
  }

  async findOne(id: number) {
    const request = await this.prisma.serviceRequest.findUnique({
      where: { id: id.toString() },
      include: {
        client: true,
      },
    });

    if (!request) {
      throw new NotFoundException(`Solicitud #${id} no encontrada`);
    }

    return request;
  }

  async assignDriver(id: number, driverId: number) {
    return this.prisma.serviceRequest.update({
      where: { id: id.toString() },
      data: {
        driverId: driverId.toString(),
        status: 'AGENDADO' as any,
      },
    });
  }

  async getStats() {
    const pending = await this.prisma.serviceRequest.count({
      where: { status: 'PENDIENTE' as any },
    });
    const inRoute = await this.prisma.serviceRequest.count({
      where: { status: 'AGENDADO' as any },
    });

    return { pending, inRoute };
  }
}
