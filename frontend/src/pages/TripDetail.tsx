import React from 'react'
import Header from '../components/Header'
import { tripsMockData } from '../services/mockApi'
import { useParams, Link, useNavigate } from 'react-router-dom'

export default function TripDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const trip = tripsMockData.trips.find((t: any) => t.id === id) || tripsMockData.trips[0]

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <div className="mb-4">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-primary flex items-center gap-1 transition-colors">
            <span className="material-icons text-sm">arrow_back</span>
            Volver a la lista
          </button>
        </div>
        <h1 className="text-3xl font-bold text-primary mb-6">Detalle del Viaje {trip.id}</h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-700 border-b pb-2 flex items-center gap-2">
                  <span className="material-icons text-primary">person</span> Participantes
                </h3>
                <p><strong>Cliente:</strong> {trip.client}</p>
                <p><strong>Chofer:</strong> {trip.driver}</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-700 border-b pb-2 flex items-center gap-2">
                  <span className="material-icons text-secondary">location_on</span> Trayecto
                </h3>
                <p><strong>Origen:</strong> {trip.origin}</p>
                <p><strong>Destino:</strong> {trip.dest}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-full shadow-sm">
                  <span className="material-icons text-primary">event</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Fecha y Hora</p>
                  <p className="text-lg font-bold">{trip.date} — {trip.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-full shadow-sm">
                  <span className="material-icons text-success">check_circle</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Estado del Servicio</p>
                  <span className="px-3 py-1 bg-success/10 text-success border border-success/20 rounded-full text-sm font-bold">
                    {trip.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => navigate('/trips')}
                className="text-secondary font-bold flex items-center gap-2 hover:gap-3 transition-all"
              >
                Volver al listado <span className="material-icons">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}