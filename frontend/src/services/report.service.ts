import api from '../lib/axios'

export async function getDashboard() {
  try {
    const resp = await api.get('/api/v1/reports/dashboard')
    const d = resp.data
    // normalize
    if (!d) return null
    return d
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.warn('[report.service] getDashboard error', err?.message || err)
    return null
  }
}

export default { getDashboard }
