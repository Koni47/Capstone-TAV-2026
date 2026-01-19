import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceRequestsService {
  create(data: any) {
    return data;
  }

  findAll() {
    return [];
  }

  findOne(id: string) {
    return { id };
  }

  assign(id: string, data: any) {
    return { id, ...data, status: 'AGENDADO' };
  }

  cancel(id: string) {
    return { id, status: 'CANCELADO' };
  }
}
