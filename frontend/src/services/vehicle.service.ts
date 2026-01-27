import api from '../lib/axios'
import { Vehicle, CreateVehicleDto } from '../types/vehicle.type'

export async function getAll(): Promise<Vehicle[]> {
  try {
    const resp = await api.get('/api/v1/vehicles')
    const d = resp.data
    if (Array.isArray(d)) return d as Vehicle[]
    if (d && Array.isArray(d.data)) return d.data as Vehicle[]
    if (d && Array.isArray(d.results)) return d.results as Vehicle[]
    // unknown shape
    return []
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.warn('[vehicle.service] getAll error', err?.message || err)
    return []
  }
}

export async function getById(id: string): Promise<Vehicle> {
  const resp = await api.get(`/api/v1/vehicles/${id}`)
  // resp.data may be wrapped
  return (resp.data?.data ?? resp.data) as Vehicle
}

export async function create(data: CreateVehicleDto): Promise<Vehicle> {
  const resp = await api.post('/api/v1/vehicles', data)
  return resp.data as Vehicle
}

export async function update(id: string, data: Partial<CreateVehicleDto>): Promise<Vehicle> {
  const resp = await api.patch(`/api/v1/vehicles/${id}`, data)
  return resp.data as Vehicle
}

export async function remove(id: string): Promise<void> {
  await api.delete(`/api/v1/vehicles/${id}`)
}

// Driver-specific endpoints
export async function getMyVehicles(): Promise<Vehicle[]> {
  try {
    const resp = await api.get('/api/v1/vehicles/my')
    const d = resp.data
    if (Array.isArray(d)) return d as Vehicle[]
    if (d && Array.isArray(d.data)) return d.data as Vehicle[]
    return []
  } catch (err: any) {
    console.warn('[vehicle.service] getMyVehicles error', err?.message || err)
    return []
  }
}

export async function getByDriver(driverId: string): Promise<Vehicle[]> {
  try {
    const resp = await api.get(`/api/v1/vehicles/driver/${driverId}`)
    const d = resp.data
    if (Array.isArray(d)) return d as Vehicle[]
    if (d && Array.isArray(d.data)) return d.data as Vehicle[]
    return []
  } catch (err: any) {
    console.warn('[vehicle.service] getByDriver error', err?.message || err)
    return []
  }
}

export default {
  getAll,
  getById,
  create,
  update,
  remove,
  getMyVehicles,
  getByDriver,
  getStats,
}

export async function getStats(): Promise<any> {
  try {
    const resp = await api.get('/api/v1/vehicles/stats')
    return resp.data ?? null
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.warn('[vehicle.service] getStats error', err?.message || err)
    return null
  }
}
