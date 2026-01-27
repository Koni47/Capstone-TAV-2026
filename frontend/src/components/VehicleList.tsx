import React from 'react'
import { useVehicles } from '../hooks/useVehicles'

export default function VehicleList() {
  const { data: vehicles, loading, error, refresh } = useVehicles()

  if (loading) return <div>Cargando vehículos...</div>
  if (error) return (
    <div>
      <div className="text-red-600">{error}</div>
      <button onClick={refresh} className="mt-2 text-sm text-blue-600">Reintentar</button>
    </div>
  )

  return (
    <div className="space-y-3">
      {vehicles.length === 0 && <div>No hay vehículos.</div>}
      {vehicles.map((v) => (
        <div key={v.id} className="p-3 border rounded">
          <div className="font-semibold">{v.model} — {v.licensePlate}</div>
          <div className="text-sm text-gray-600">Año: {v.year} • Estado: {v.status}</div>
        </div>
      ))}
    </div>
  )
}
