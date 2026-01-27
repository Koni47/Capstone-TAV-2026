import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleStatus } from '@prisma/client';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const total = await this.prisma.vehicle.count();
    const available = await this.prisma.vehicle.count({
      where: { status: VehicleStatus.DISPONIBLE },
    });
    const inRoute = await this.prisma.vehicle.count({
      where: { status: VehicleStatus.EN_RUTA },
    });
    const maintenance = await this.prisma.vehicle.count({
      where: { status: { in: [VehicleStatus.MANTENCION, VehicleStatus.FUERA_DE_SERVICIO] } },
    });

    return {
      total,
      available,
      inRoute,
      maintenance,
    };
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const vehicles = await this.prisma.vehicle.findMany({
      skip,
      take: limit,
      orderBy: { updatedAt: 'desc' },
    });

    return {
      data: vehicles.map((v) => ({
        ...v,
        nextMaintenanceDisplay: v.technicalReviewDate
          ? v.technicalReviewDate.toLocaleDateString('es-CL')
          : 'N/A',
      })),
      meta: {
        page,
        limit,
        total: await this.prisma.vehicle.count(),
      },
      status: 200,
    };
  }

  async findOne(id: string) {
    return this.prisma.vehicle.findUnique({
      where: { id },
    });
  }

  /* ...existing code... */
  create(data: CreateVehicleDto) {
    return data;
  }

  findAvailable(query: Record<string, string>) {
    return [query];
  }

  update(id: string, data: Partial<CreateVehicleDto>) {
    return { id, ...data };
  }

  remove(id: string) {
    return { id, deleted: true };
  }
}

