import { useCallback, useEffect, useMemo, useState } from 'react'
import { Trip } from '../types/trip.type'
import * as tripService from '../services/trip.service'
import { useAuth } from '../context/AuthContext'

function groupLastMonths(trips: Trip[], months = 6) {
  const now = new Date()
  const res = Array.from({ length: months }, (_, i) => 0)
  for (const t of trips) {
    if (!t.startTime) continue
    const d = new Date(t.startTime)
    const diffMonths = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth())
    if (diffMonths >= 0 && diffMonths < months) {
      res[months - 1 - diffMonths] += 1
    }
  }
  return res
}

export function useTrips() {
  const { user } = useAuth()
  const [data, setData] = useState<Trip[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      let trips: Trip[] = []
      if (user?.role === 'CHOFER') {
        trips = await tripService.getMyTrips()
      } else {
        trips = await tripService.getAllTrips()
      }
      setData(trips)
    } catch (err: any) {
      setError(err?.message || 'Error cargando viajes')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    load()
  }, [load])

  const totalTrips = data.length
  const tripsByMonth = useMemo(() => groupLastMonths(data, 6), [data])
  const recentTrips = useMemo(() => data.slice(0, 5), [data])

  return { data, loading, error, refresh: load, totalTrips, tripsByMonth, recentTrips }
}
