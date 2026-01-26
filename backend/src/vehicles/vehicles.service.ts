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
        model: createDto.model,
        type: createDto.type,
        capacity: createDto.capacity,
        color: createDto.color,
        year: createDto.year || new Date().getFullYear(),
        mileage: createDto.mileage,
        status: (createDto.status || VehicleStatus.DISPONIBLE) as any,
      },
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [vehiclesRaw, total] = await Promise.all([
      this.prisma.vehicle.findMany({
        skip,
        take: limit,
        include: {
          trips: {
            where: {
              OR: [
                { status: 'EN_RUTA' },
                { status: 'ASIGNADO' },
              ],
            },
            include: {
              driver: {
                select: {
                  id: true,
                  fullName: true,
                  email: true,
                  phone: true,
                  status: true,
                  role: {
                    select: {
                      nombre: true,
                    },
                  },
                },
              },
            },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
        orderBy: { licensePlate: 'asc' },
      }),
      this.prisma.vehicle.count(),
    ]);

    // Transformar para incluir driver directamente
    const vehicles = vehiclesRaw.map((vehicle: any) => {
      const { trips, ...vehicleData } = vehicle;
      return {
        ...vehicleData,
        currentDriver: trips && trips.length > 0 ? trips[0].driver : null,
      };
    });

    return {
      vehicles,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalResults: total,
      },
    };
  }

  async findOne(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: id },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehículo #${id} no encontrado`);
    }

    return vehicle;
  }

  async updateStatus(id: string, status: VehicleStatus) {
    return this.prisma.vehicle.update({
      where: { id: id },
      data: { status: status as any },
    });
  }

  async update(id: string, updateDto: Partial<CreateVehicleDto>) {
    // Verificar que el vehículo existe
    await this.findOne(id);

    // Construir objeto de actualización solo con campos definidos
    const updateData: any = {};
    
    if (updateDto.plate !== undefined) updateData.licensePlate = updateDto.plate;
    if (updateDto.model !== undefined) updateData.model = updateDto.model;
    if (updateDto.type !== undefined) updateData.type = updateDto.type;
    if (updateDto.capacity !== undefined) updateData.capacity = updateDto.capacity;
    if (updateDto.color !== undefined) updateData.color = updateDto.color;
    if (updateDto.year !== undefined) updateData.year = updateDto.year;
    if (updateDto.mileage !== undefined) updateData.mileage = updateDto.mileage;
    if (updateDto.status !== undefined) updateData.status = updateDto.status;

    return this.prisma.vehicle.update({
      where: { id: id },
      data: updateData,
    });
  }

  async remove(id: string) {
    // Verificar que el vehículo existe
    await this.findOne(id);

    // Hard delete
    return this.prisma.vehicle.delete({
      where: { id: id },
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
