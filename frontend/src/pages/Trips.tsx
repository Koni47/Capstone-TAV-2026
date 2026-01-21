import React from 'react'
import Header from '../components/Header'
import { tripsMockData } from '../mocks/data'

export default function Trips() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Mis Viajes</h1>

        <div className="grid grid-cols-1 gap-6">
          {tripsMockData.trips.map((t) => (
            <div key={t.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-primary">{t.title}</div>
                <div className="text-xs text-gray-500">{t.date} · {t.time}</div>
                <div className="text-sm text-gray-700 mt-1">{t.origin} → {t.dest}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-secondary">${t.fare}</div>
                <div className="text-xs text-gray-500">{t.status}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}