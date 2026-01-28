import api from '../lib/axios';
import { Trip, CreateTripDTO } from '../types/trip.types';

export const tripService = {
  getMyTrips: async (): Promise<Trip[]> => {
    const response = await api.get<Trip[]>('/api/v1/trips/my-trips');
    return response.data;
  },

  createTrip: async (data: CreateTripDTO): Promise<Trip> => {
    const response = await api.post<Trip>('/api/v1/trips', data);
    return response.data;
  },

  startTrip: async (id: string): Promise<Trip> => {
    const response = await api.patch<Trip>(`/api/v1/trips/${id}/start`);
    return response.data;
  },

  finishTrip: async (id: string): Promise<Trip> => {
    const response = await api.patch<Trip>(`/api/v1/trips/${id}/finish`);
    return response.data;
  },
};
