import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    return this.prisma.company.create({
      data: {
        rut: createCompanyDto.rut,
        name: createCompanyDto.name,
        address: createCompanyDto.address,
        contactName: createCompanyDto.contactName,
        contactEmail: createCompanyDto.contactEmail,
        phone: createCompanyDto.phone,
        costCenter: createCompanyDto.costCenter,
        contractEnd: createCompanyDto.contractEnd ? new Date(createCompanyDto.contractEnd) : null,
      },
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [companies, total] = await Promise.all([
      this.prisma.company.findMany({
        skip,
        take: limit,
        orderBy: { name: 'asc' },
      }),
      this.prisma.company.count(),
    ]);

    return {
      companies,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalResults: total,
        showingFrom: skip + 1,
        showingTo: Math.min(skip + limit, total),
      },
    };
  }

  async findOne(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id: id.toString() },
      include: {
        _count: {
          select: { trips: true },
        },
      },
    });

    if (!company) {
      throw new NotFoundException(`Empresa #${id} no encontrada`);
    }

    return company;
  }

  async getStats() {
    const total = await this.prisma.company.count();

    return {
      totalCompanies: total,
      expiringContracts: 3, // TODO: Implementar lógica real
      billedTripsMonth: 245, // TODO: Implementar lógica real
    };
  }
}
