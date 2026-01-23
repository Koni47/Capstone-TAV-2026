import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto, VehicleStatus } from './dto/create-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: {
        licensePlate: createDto.plate,
        brand: createDto.brand,
        model: createDto.model,
        type: createDto.type,
        capacity: createDto.capacity,
        color: createDto.color,
        year: createDto.year || new Date().getFullYear(),
        mileage: createDto.mileage,
        fuel: createDto.fuel,
        status: (createDto.status || VehicleStatus.DISPONIBLE) as any,
      },
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [vehicles, total] = await Promise.all([
      this.prisma.vehicle.findMany({
        skip,
        take: limit,
        orderBy: { licensePlate: 'asc' },
      }),
      this.prisma.vehicle.count(),
    ]);

    return {
      vehicles,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalResults: total,
      },
    };
  }

  async findOne(id: number) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: id.toString() },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehículo #${id} no encontrado`);
    }

    return vehicle;
  }

  async updateStatus(id: number, status: VehicleStatus) {
    return this.prisma.vehicle.update({
      where: { id: id.toString() },
      data: { status: status as any },
    });
  }

  async getStats() {
    const total = await this.prisma.vehicle.count();
    const active = await this.prisma.vehicle.count({
      where: { status: 'DISPONIBLE' },
    });
    const maintenance = await this.prisma.vehicle.count({
      where: { status: 'MANTENCION' },
    });

    return {
      totalVehicles: total,
      activeVehicles: active,
      maintenanceVehicles: maintenance,
    };
  }
}
