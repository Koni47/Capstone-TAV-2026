import React, { useEffect, useState } from 'react'
import vehicleService from '../services/vehicle.service'
import Header from '../components/Header'

export default function VehicleStats() {
  const [stats, setStats] = useState<any | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const s = await vehicleService.getStats()
        setStats(s)
      } catch (e) {
        console.error('VehicleStats error', e)
      }
    })()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Estadísticas de la Flota</h1>
        {!stats && <p>Cargando...</p>}
        {stats && <pre className="bg-white p-4 rounded border overflow-auto text-sm">{JSON.stringify(stats, null, 2)}</pre>}
      </main>
    </div>
  )
}
