import { Injectable } from '@nestjs/common';

@Injectable()
export class CompaniesService {
  findAll() {
    return [];
  }

  create(data: any) {
    return data;
  }

  getStats(id: string) {
    return { id, stats: {} };
  }
}
