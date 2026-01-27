import React, { useEffect, useState } from 'react'
import serviceRequests from '../services/serviceRequests.service'
import Header from '../components/Header'

export default function ServiceRequestsList() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const d = await serviceRequests.findAll()
        const list = Array.isArray(d) ? d : (d?.data ?? d?.results ?? [])
        setItems(list)
      } catch (e) {
        console.error('ServiceRequestsList error', e)
      }
    })()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Solicitudes de Servicio</h1>
        {items.length === 0 && <p>No hay solicitudes</p>}
        <div className="space-y-4">
          {items.map((it: any) => (
            <div key={it.id || JSON.stringify(it)} className="bg-white p-4 rounded border">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{it.title || `Solicitud ${it.id || ''}`}</h3>
                  <p className="text-sm text-gray-600">{it.origin || it.origen} → {it.destination || it.destino}</p>
                </div>
                <div className="text-sm text-gray-500">{it.status || it.estado || '—'}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
