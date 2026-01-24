import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { getServiceRequests } from '../services/api';

export default function ServiceRequest() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const data: any = await getServiceRequests();
        // Manejar si viene paginado o array directo
        setRequests(data.requests || data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching service requests:', err);
        setError('Error al cargar solicitudes');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);
  return (
    <div className="bg-surface font-sans text-gray-800 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-primary flex items-center gap-1 transition-colors">
            <span className="material-icons text-sm">arrow_back</span>
            Volver
          </button>
        </div>
        <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
          <span className="material-icons text-3xl">description</span>
          Solicitudes de Servicio
        </h1>
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!loading && !error && requests.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <span className="material-icons text-gray-300 text-6xl mb-4">description</span>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No hay solicitudes registradas</h3>
            <p className="text-gray-500 mb-6">Las solicitudes de servicio aparecerán aquí cuando se creen.</p>
            <button className="bg-secondary hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all flex items-center gap-2 mx-auto">
              <span className="material-icons">add</span>
              Nueva Solicitud
            </button>
          </div>
        )}

        {!loading && !error && requests.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-gray-50 border-b">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Total de solicitudes</p>
                <p className="text-2xl font-bold text-primary">{requests.length}</p>
              </div>
              <button className="bg-secondary hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all flex items-center gap-2">
                <span className="material-icons">add</span>
                Nueva Solicitud
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ruta</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request: any) => (
                  <tr key={request.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">#{request.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        {request.company?.name || request.client?.fullName || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{request.origin}</div>
                      <div className="text-xs text-gray-500">→ {request.destination}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(request.requestedAt).toLocaleDateString('es-CL')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        request.status === 'AGENDADO' ? 'bg-green-100 text-green-800' :
                        request.status === 'CANCELADO' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-primary hover:text-blue-900 font-medium">
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}
      </main>
    </div>
  );
}
