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
        <h1 className="text-3xl font-bold text-primary mb-6">Detalle del Viaje #{trip.id}</h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-700 border-b pb-2 flex items-center gap-2">
                  <span className="material-icons text-primary">person</span> Participantes
                </h3>
                <p><strong>Cliente:</strong> {trip.empresaCliente?.nombre_comercial || 'N/A'}</p>
                <p><strong>Chofer:</strong> {trip.conductor?.nombre || 'No asignado'}</p>
                <p><strong>Vehículo:</strong> {trip.vehiculo?.patente || 'N/A'} - {trip.vehiculo?.marca} {trip.vehiculo?.modelo}</p>
                <p><strong>Pasajeros:</strong> {trip.cantidad_pasajeros || 0}</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-700 border-b pb-2 flex items-center gap-2">
                  <span className="material-icons text-secondary">location_on</span> Trayecto
                </h3>
                <p><strong>Origen:</strong> {trip.origen}</p>
                <p><strong>Destino:</strong> {trip.destino}</p>
                <p><strong>Tipo:</strong> {trip.tipo_servicio || 'Traslado'}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-full shadow-sm">
                  <span className="material-icons text-primary">event</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Fecha y Hora</p>
                  <p className="text-lg font-bold">
                    {new Date(trip.fecha_hora_inicio).toLocaleDateString('es-CL')} — {new Date(trip.fecha_hora_inicio).toLocaleTimeString('es-CL', {hour: '2-digit', minute: '2-digit'})}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-full shadow-sm">
                  <span className="material-icons text-success">check_circle</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Estado del Servicio</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    trip.estado === 'FINALIZADO' ? 'bg-success/10 text-success border border-success/20' :
                    trip.estado === 'EN_CURSO' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                    'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  }`}>
                    {trip.estado.replace('_', ' ')}
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