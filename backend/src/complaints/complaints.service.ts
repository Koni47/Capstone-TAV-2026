import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';

@Injectable()
export class ComplaintsService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateComplaintDto) {
    const complaint = await this.prisma.complaint.create({
      data: {
        ...createDto,
        status: 'PENDIENTE',
      },
    });

    // TODO: Enviar email de notificación al equipo
    console.log(`Nueva denuncia registrada: #${complaint.id}`);

    return {
      message: 'Denuncia registrada exitosamente. Nos contactaremos contigo a la brevedad.',
      complaintId: complaint.id,
    };
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [complaints, total] = await Promise.all([
      this.prisma.complaint.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.complaint.count(),
    ]);

    return {
      complaints,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalResults: total,
      },
    };
  }

  async findOne(id: number) {
    const complaint = await this.prisma.complaint.findUnique({
      where: { id: id.toString() },
    });

    if (!complaint) {
      throw new NotFoundException(`Denuncia #${id} no encontrada`);
    }

    return complaint;
  }

  async updateStatus(id: number, status: string) {
    return this.prisma.complaint.update({
      where: { id: id.toString() },
      data: { status: status as any },
    });
  }
}
