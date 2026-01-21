import React from 'react'
import Header from '../components/Header'
import { tripsMockData } from '../mocks/data'
import { useParams, Link } from 'react-router-dom'

export default function TripDetail() {
  const { id } = useParams()
  const trip = tripsMockData.trips.find((t) => t.id === id) || tripsMockData.trips[0]

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Detalle Viaje {trip.id}</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p><strong>Cliente:</strong> {trip.client}</p>
          <p><strong>Chofer:</strong> {trip.driver}</p>
          <p><strong>Origen:</strong> {trip.origin}</p>
          <p><strong>Destino:</strong> {trip.dest}</p>
          <p><strong>Fecha:</strong> {trip.date} {trip.time}</p>
          <p className="mt-4"><strong>Estado:</strong> <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{trip.status}</span></p>

          <div className="mt-6">
            <Link to="/trips" className="text-secondary font-bold">Volver a viajes</Link>
          </div>
        </div>
      </main>
    </div>
  )
}