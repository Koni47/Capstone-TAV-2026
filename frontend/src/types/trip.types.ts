export enum TripStatus {
  REQUESTED = 'REQUESTED',
  ASSIGNED = 'ASSIGNED',
  ON_WAY = 'ON_WAY',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Trip {
  id: string;
  status: TripStatus;
  origin: string;
  destination: string;
  fare: number;
  driverId?: string;
  clientId: string;
  clientName?: string; // For display
  driverName?: string; // For display
  startTime?: string;
  endTime?: string;
  createdAt: string;
}

export interface CreateTripDTO {
  origin: string;
  destination: string;
  fare?: number; // Backend might calculate it
  clientId: string;
}
