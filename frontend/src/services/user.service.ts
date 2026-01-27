import api from '../lib/axios'

export async function getProfile() {
  const resp = await api.get('/api/v1/auth/profile')
  return resp.data
}

export async function getAll(role?: string) {
  const resp = await api.get('/api/v1/users', { params: { role } })
  const d = resp.data
  if (Array.isArray(d)) return d
  if (d && Array.isArray(d.data)) return d.data
  return []
}

export async function findAvailableDrivers() {
  const resp = await api.get('/api/v1/users/drivers/available')
  const d = resp.data
  if (Array.isArray(d)) return d
  if (d && Array.isArray(d.data)) return d.data
  return []
}

export async function update(id: string, data: any) {
  const resp = await api.patch(`/api/v1/users/${id}`, data)
  return resp.data
}

export default { getProfile, getAll, findAvailableDrivers, update }
