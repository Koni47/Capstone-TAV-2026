import { Injectable } from '@nestjs/common';

@Injectable()
export class TripsService {
  getMyTrips() {
    return [];
  }

  startTrip(id: string) {
    return { id, status: 'EN_RUTA', startTime: new Date() };
  }

  finishTrip(id: string) {
    return { id, status: 'FINALIZADO', endTime: new Date() };
  }

  uploadEvidence(id: string, data: any) {
    return { id, evidence: true, data };
  }
}
