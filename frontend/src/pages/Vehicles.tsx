import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getVehicles } from "../services/api";
import Header from '../components/Header';

interface Vehicle {
  id: string;
  licensePlate: string;
  model: string;
  type?: string;
  year: number;
  status: string;
  capacity?: number;
  mileage?: number;
}

const Vehicles = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response: any = await getVehicles();
        setVehicles(response.vehicles || response);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Error al cargar vehículos');
        console.error('Error fetching vehicles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando vehículos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <span className="material-icons text-red-500 text-5xl">error</span>
            <p className="mt-4 text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-primary flex items-center gap-1">
            <span className="material-icons text-sm">arrow_back</span>
            Volver
          </button>
        </div>

        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-primary">Gestión de Vehículos</h2>
            <p className="text-sm text-gray-500 mt-1">Administra la flota, mantenciones y documentación.</p>
          </div>
          <button
            onClick={() => navigate('/vehicles/new')}
            className="mt-4 md:mt-0 px-4 py-2 bg-secondary text-white rounded-md hover:bg-orange-700 flex items-center gap-2"
          >
            <span className="material-icons text-sm">add</span>
            Agregar Vehículo
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
              <input
                type="text"
                placeholder="Patente o modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Todos</option>
                <option value="DISPONIBLE">Disponible</option>
                <option value="EN_SERVICIO">En Servicio</option>
                <option value="MANTENCION">Mantención</option>
                <option value="FUERA_SERVICIO">Fuera de Servicio</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{vehicle.licensePlate}</h3>
                    <p className="text-sm text-gray-500">{vehicle.model}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    vehicle.status === 'DISPONIBLE' ? 'bg-green-100 text-green-800' :
                    vehicle.status === 'EN_SERVICIO' ? 'bg-blue-100 text-blue-800' :
                    vehicle.status === 'MANTENCION' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {vehicle.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-sm">calendar_today</span>
                    <span>Año: {vehicle.year}</span>
                  </div>
                  {vehicle.capacity && (
                    <div className="flex items-center gap-2">
                      <span className="material-icons text-sm">people</span>
                      <span>Capacidad: {vehicle.capacity} pasajeros</span>
                    </div>
                  )}
                  {vehicle.type && (
                    <div className="flex items-center gap-2">
                      <span className="material-icons text-sm">local_shipping</span>
                      <span>{vehicle.type}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                    className="flex-1 px-3 py-2 bg-primary text-white rounded-md hover:bg-blue-800 text-sm"
                  >
                    Ver Detalle
                  </button>
                  <button
                    onClick={() => navigate(`/vehicles/${vehicle.id}/edit`)}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                  >
                    <span className="material-icons text-sm">edit</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <span className="material-icons text-gray-400 text-5xl">directions_car</span>
            <p className="mt-4 text-gray-500">No se encontraron vehículos</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Vehicles;
