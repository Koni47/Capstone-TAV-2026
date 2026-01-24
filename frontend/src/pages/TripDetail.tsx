import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { getTripById } from '../services/api'
import { useParams, Link, useNavigate } from 'react-router-dom'

export default function TripDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrip = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getTripById(id);
        setTrip(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching trip:', err);
        setError('Error al cargar el viaje');
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        <Header />
        <main className="max-w-4xl mx-auto p-6">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        <Header />
        <main className="max-w-4xl mx-auto p-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error || 'Viaje no encontrado'}
          </div>
          <button onClick={() => navigate('/trips')} className="text-primary font-bold">
            Volver a viajes
          </button>
        </main>
      </div>
    );
  }

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Detalle del Viaje</h1>
          <span className="text-xs text-gray-400 font-mono">ID: #{trip.id.substring(0, 8)}</span>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Título del viaje */}
            <div className="mb-6 pb-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{trip.title || 'Traslado'}</h2>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  trip.status === 'FINALIZADO' ? 'bg-green-100 text-green-800 border border-green-200' :
                  trip.status === 'EN_RUTA' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                  trip.status === 'ASIGNADO' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                  'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  {trip.status?.replace('_', ' ')}
                </span>
                {trip.fare && (
                  <span className="text-xl font-bold text-primary">
                    ${trip.fare.toLocaleString('es-CL')}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-700 border-b pb-2 flex items-center gap-2">
                  <span className="material-icons text-primary">person</span> Participantes
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="material-icons text-sm text-gray-400 mt-0.5">business</span>
                    <div>
                      <p className="text-xs text-gray-500">Cliente</p>
                      <p className="font-bold">{trip.client?.name || 'N/A'}</p>
                      {trip.client?.rut && <p className="text-xs text-gray-500">{trip.client.rut}</p>}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-icons text-sm text-gray-400 mt-0.5">badge</span>
                    <div>
                      <p className="text-xs text-gray-500">Chofer</p>
                      <p className="font-bold">{trip.driver?.fullName || trip.driver?.name || 'No asignado'}</p>
                      {trip.driver?.email && <p className="text-xs text-gray-500">{trip.driver.email}</p>}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-icons text-sm text-gray-400 mt-0.5">directions_car</span>
                    <div>
                      <p className="text-xs text-gray-500">Vehículo</p>
                      <p className="font-bold">{trip.vehicle?.licensePlate || 'N/A'}</p>
                      {trip.vehicle && <p className="text-sm text-gray-600">{trip.vehicle.model} ({trip.vehicle.year}) - Cap: {trip.vehicle.capacity} pax</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-700 border-b pb-2 flex items-center gap-2">
                  <span className="material-icons text-secondary">location_on</span> Trayecto
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="material-icons text-sm text-green-500 mt-0.5">trip_origin</span>
                    <div>
                      <p className="text-xs text-gray-500">Origen</p>
                      <p className="font-bold">{trip.origin || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-icons text-sm text-red-500 mt-0.5">place</span>
                    <div>
                      <p className="text-xs text-gray-500">Destino</p>
                      <p className="font-bold">{trip.destination || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                <span className="material-icons text-primary">schedule</span> Información de Tiempos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trip.scheduledDate && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Fecha Programada</p>
                    <p className="font-bold">
                      {new Date(trip.scheduledDate).toLocaleDateString('es-CL')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(trip.scheduledDate).toLocaleTimeString('es-CL', {hour: '2-digit', minute: '2-digit'})}
                    </p>
                  </div>
                )}
                {trip.startTime && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Hora de Inicio</p>
                    <p className="font-bold text-blue-700">
                      {new Date(trip.startTime).toLocaleTimeString('es-CL', {hour: '2-digit', minute: '2-digit'})}
                    </p>
                  </div>
                )}
                {trip.endTime && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Hora de Fin</p>
                    <p className="font-bold text-green-700">
                      {new Date(trip.endTime).toLocaleTimeString('es-CL', {hour: '2-digit', minute: '2-digit'})}
                    </p>
                  </div>
                )}
              </div>
              {trip.comment && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Comentarios</p>
                  <p className="text-gray-700">{trip.comment}</p>
                </div>
              )}
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