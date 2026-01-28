import api from '../lib/axios';
import { Vehicle, VehicleStats } from '../types/vehicle.types';

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const vehicleService = {
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Vehicle>> => {
    const response = await api.get<PaginatedResponse<Vehicle>>('/vehicles', {
      params: { page, limit },
    });
    return response.data;
  },

  getStats: async (): Promise<VehicleStats> => {
    const response = await api.get<VehicleStats>('/vehicles/stats');
    return response.data;
  },

  getAvailable: async (): Promise<Vehicle[]> => {
    const response = await api.get<Vehicle[]>('/vehicles/available');
    return response.data;
  },
};
