import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';

@Injectable()
export class ServiceRequestsService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateServiceRequestDto, userId: number) {
    console.log('Creating service request with DTO:', createDto);
    
    const data: any = {
      origin: createDto.origin,
      destination: createDto.destination,
      passengerCount: createDto.passengers || 1,
      requestedAt: createDto.requestedDate ? new Date(createDto.requestedDate) : new Date(),
      estimatedFare: createDto.estimatedFare,
      status: 'PENDIENTE',
    };

    // Si viene notes, agregarlo
    if (createDto.notes) {
      data.notes = createDto.notes;
    }

    // Si viene companyName (texto libre), guardarlo en notes o en un campo especial
    if (createDto.companyName) {
      // Buscar si existe una empresa con ese nombre
      const existingCompany = await this.prisma.company.findFirst({
        where: { name: { contains: createDto.companyName, mode: 'insensitive' } }
      });
      
      if (existingCompany) {
        data.companyId = existingCompany.id;
      } else {
        // Si no existe, guardar el nombre en notes junto con las otras notas
        const companyNote = `Cliente/Empresa: ${createDto.companyName}`;
        data.notes = createDto.notes ? `${companyNote}\n${createDto.notes}` : companyNote;
        data.clientId = userId.toString();
      }
    } else if (createDto.companyId) {
      // Si viene companyId, asignar a la empresa
      data.companyId = createDto.companyId;
    } else {
      // Si no viene nada, asignar al usuario que crea
      data.clientId = userId.toString();
    }

    return this.prisma.serviceRequest.create({
      data,
      include: {
        client: { select: { fullName: true, email: true } },
        company: { select: { name: true, rut: true } },
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
