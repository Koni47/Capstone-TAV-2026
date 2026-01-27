import api from '../lib/axios'

export async function initWebpay(tripId: string) {
  const resp = await api.post('/api/v1/payments/webpay/init', { tripId })
  return resp.data
}

export async function commitWebpay(token_ws: string) {
  const resp = await api.post('/api/v1/payments/webpay/commit', { token_ws })
  return resp.data
}

export async function checkStatus(token: string) {
  const resp = await api.get(`/api/v1/payments/webpay/status/${token}`)
  return resp.data
}

export async function refundTransaction(tripId: string, amount: number) {
  const resp = await api.post('/api/v1/payments/webpay/refund', { tripId, amount })
  return resp.data
}

export async function initTest(amount: number, buyOrder: string) {
  const resp = await api.post('/api/v1/payments/test-init', { amount, buyOrder })
  return resp.data
}

export default {
  initWebpay,
  commitWebpay,
  checkStatus,
  refundTransaction,
  initTest,
}
