import api from '../lib/axios'
import { Trip, CreateTripDto } from '../types/trip.type'

export async function getAll(): Promise<Trip[]> {
  // The API exposes only `/my-trips` for listing trips.
  try {
    const resp = await api.get('/api/v1/trips/my-trips')
    const d = resp.data
    if (Array.isArray(d)) return d as Trip[]
    if (d && Array.isArray(d.data)) return d.data as Trip[]
    if (d && Array.isArray(d.trips)) return d.trips as Trip[]
    return []
  } catch (err: any) {
    console.warn('[trip.service] getAll (my-trips) error', err?.message || err)
    return []
  }
}

export async function getById(id: string): Promise<Trip> {
  const resp = await api.get(`/api/v1/trips/${id}`)
  return (resp.data?.data ?? resp.data) as Trip
}

export async function create(data: CreateTripDto): Promise<Trip> {
  const resp = await api.post('/api/v1/trips', data)
  return resp.data as Trip
}

export async function update(id: string, data: Partial<CreateTripDto>): Promise<Trip> {
  const resp = await api.patch(`/api/v1/trips/${id}`, data)
  return resp.data as Trip
}

export async function remove(id: string): Promise<void> {
  await api.delete(`/api/v1/trips/${id}`)
}

export async function getMyTrips(): Promise<Trip[]> {
  // alias to the same endpoint
  return getAll()
}

export async function getAllTrips(): Promise<Trip[]> {
  // alias for clarity
  return getAll()
}

export default { getAll, getById, create, update, remove, getMyTrips, getAllTrips }
