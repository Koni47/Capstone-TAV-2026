import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  getBillingReport() {
    return { file: 'billing.xlsx' };
  }

  getDashboardStats() {
    return { pending: 10, inProgress: 5, completed: 20 };
  }
}
