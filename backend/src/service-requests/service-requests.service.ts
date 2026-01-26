import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';

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

  async findOne(id: string) {
    const request = await this.prisma.serviceRequest.findUnique({
      where: { id: id },
      include: {
        client: true,
      },
    });

    if (!request) {
      throw new NotFoundException(`Solicitud #${id} no encontrada`);
    }

    return request;
  }

  async assignDriver(id: string, driverId: number) {
    return this.prisma.serviceRequest.update({
      where: { id: id },
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

  async update(id: string, updateDto: UpdateServiceRequestDto, user: any) {
    console.log('Update called with id:', id);
    console.log('Update DTO:', JSON.stringify(updateDto, null, 2));
    console.log('User:', JSON.stringify(user, null, 2));
    
    const request = await this.prisma.serviceRequest.findUnique({ where: { id } });
    if (!request) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    // Verificar permisos: admin o propietario (cliente que creó la solicitud)
    const isAdmin = user.role?.nombre === 'ADMIN';
    const isOwner = request.clientId === user.id;
    console.log('Is admin:', isAdmin, 'Is owner:', isOwner, 'Request clientId:', request.clientId, 'User id:', user.id);
    
    if (!isAdmin && !isOwner) {
      throw new ForbiddenException('No autorizado para actualizar esta solicitud');
    }

    // Mapear campos del DTO a campos de la base de datos
    const data: any = {};
    
    if (updateDto.requestedDate) {
      data.requestedAt = new Date(updateDto.requestedDate);
      console.log('Mapped requestedDate to requestedAt:', data.requestedAt);
    }
    if (updateDto.origin !== undefined) data.origin = updateDto.origin;
    if (updateDto.destination !== undefined) data.destination = updateDto.destination;
    if (updateDto.passengers !== undefined) data.passengerCount = updateDto.passengers;
    if (updateDto.estimatedFare !== undefined) data.estimatedFare = updateDto.estimatedFare;
    if (updateDto.distance !== undefined) data.distance = updateDto.distance;
    if (updateDto.notes !== undefined) data.notes = updateDto.notes;
    if (updateDto.companyId !== undefined) data.companyId = updateDto.companyId;
    if (updateDto.status !== undefined) data.status = updateDto.status;

    console.log('Data to update:', JSON.stringify(data, null, 2));
    
    const result = await this.prisma.serviceRequest.update({
      where: { id },
      data,
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
    });

    console.log('Update result:', JSON.stringify(result, null, 2));
    return result;
  }

  async remove(id: string, user: any) {
    const request = await this.prisma.serviceRequest.findUnique({ where: { id } });
    if (!request) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    // Verificar permisos: admin o propietario
    const isAdmin = user.role?.nombre === 'ADMIN';
    if (!isAdmin && request.companyId !== user.id) {
      throw new ForbiddenException('No autorizado para eliminar esta solicitud');
    }

    // Hard delete
    return this.prisma.serviceRequest.delete({
      where: { id },
    });
  }
}
