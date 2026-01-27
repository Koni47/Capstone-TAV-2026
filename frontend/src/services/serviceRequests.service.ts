import api from '../lib/axios'

export async function createRequest(dto: any) {
  const resp = await api.post('/api/v1/service-requests', dto)
  return resp.data
}

export async function findAll() {
  const resp = await api.get('/api/v1/service-requests')
  return resp.data ?? []
}

export async function findOne(id: string) {
  const resp = await api.get(`/api/v1/service-requests/${id}`)
  return resp.data
}

export async function assign(id: string, dto: any) {
  const resp = await api.patch(`/api/v1/service-requests/${id}/assign`, dto)
  return resp.data
}

export async function cancel(id: string) {
  const resp = await api.patch(`/api/v1/service-requests/${id}/cancel`)
  return resp.data
}

export default {
  createRequest,
  findAll,
  findOne,
  assign,
  cancel,
}
