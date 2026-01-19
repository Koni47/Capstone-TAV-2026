import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehiclesService {
  findAll() {
    return [];
  }

  create(data: CreateVehicleDto) {
    return data;
  }

  findAvailable(query: Record<string, string>) {
    return [query];
  }

  findOne(id: string) {
    return { id };
  }

  update(id: string, data: Partial<CreateVehicleDto>) {
    return { id, ...data };
  }

  remove(id: string) {
    return { id, deleted: true };
  }
}
