export enum VehicleStatus {
  AVAILABLE = "AVAILABLE",
  IN_USE = "IN_USE",
  MAINTENANCE = "MAINTENANCE",
  OUT_OF_SERVICE = "OUT_OF_SERVICE",
}

export interface Vehicle {
  id: string;
  licensePlate: string;
  model: string;
  brand: string;
  year: number;
  status: VehicleStatus;
  technicalReviewDate: string; // ISO Date string
  imgUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VehicleStats {
  total: number;
  available: number;
  maintenance: number;
  inUse: number;
}
