import api from '../lib/axios';
import { Trip, CreateTripDTO } from '../types/trip.types';

export const tripService = {
  getMyTrips: async (): Promise<Trip[]> => {
    const response = await api.get<Trip[]>('/trips/my-trips');
    return response.data;
  },

  createTrip: async (data: CreateTripDTO): Promise<Trip> => {
    const response = await api.post<Trip>('/trips', data);
    return response.data;
  },

  startTrip: async (id: string): Promise<Trip> => {
    const response = await api.patch<Trip>(`/trips/${id}/start`);
    return response.data;
  },

  finishTrip: async (id: string): Promise<Trip> => {
    const response = await api.patch<Trip>(`/trips/${id}/finish`);
    return response.data;
  },
};
