import { useCallback, useEffect, useState } from 'react'
import { Vehicle } from '../types/vehicle.type'
import * as vehicleService from '../services/vehicle.service'
import { useAuth } from '../context/AuthContext'

export function useVehicles() {
  const { user } = useAuth()
  const [data, setData] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      let vehicles: Vehicle[] = []
      // role-based endpoint selection
      if (user?.role === 'CHOFER') {
        // prefer `my` endpoint if available
        try {
          vehicles = await vehicleService.getMyVehicles()
        } catch (err) {
          // fallback to driver id endpoint
          vehicles = await vehicleService.getByDriver(user.id)
        }
      } else {
        vehicles = await vehicleService.getAll()
      }
      setData(vehicles)
    } catch (err: any) {
      setError(err?.message || 'Error cargando vehículos')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    // load when auth is available
    load()
  }, [load])

  return { data, loading, error, refresh: load }
}
