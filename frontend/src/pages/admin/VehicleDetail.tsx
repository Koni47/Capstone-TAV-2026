import { Link, useParams } from 'react-router-dom';
import { Truck, ArrowLeft, Edit, Calendar, Users, Gauge, Wrench, MapPin } from 'lucide-react';

/**
 * VehicleDetail
 * Implementation of vehicle-detail.html
 */
const VehicleDetail = () => {
  const { id } = useParams();

  // Mock Data (would normally be fetched by ID)
  const vehicle = {
    id: id || 'LHYT-88',
    patente: 'LHYT-88',
    modelo: 'Mercedes-Benz Sprinter',
    anio: 2024,
    capacidad: 19,
    kilometraje: '45.230',
    estado: 'AVAILABLE', // AVAILABLE, IN_USE, MAINTENANCE, OUT_OF_SERVICE
    proximos_mantenciones: [
      {
        id: 1,
        tipo: 'Revisión General',
        fecha: '15 Mar, 2026',
        detalle: 'Cambio de filtros y revisión de frenos.',
        lugar: 'Taller Central',
      },
      {
        id: 2,
        tipo: 'Cambio de Aceite',
        fecha: '01 Feb, 2026',
        detalle: 'Mantenimiento programado 40.000km.',
        lugar: 'Lubricentro Express',
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-gray-800">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/admin/dashboard" className="hover:text-primary transition">
              Inicio
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li>
            <Link to="/admin/vehicles" className="hover:text-primary transition">
              Flota
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li className="text-gray-800 font-medium">Detalle Vehículo</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
            <Truck size={36} className="text-gray-700" />
            {vehicle.patente}
          </h1>
          <p className="text-gray-500 ml-1 mt-1">Ficha técnica e historial del vehículo</p>
        </div>
        <div className="flex gap-3">
          <Link
            to={`/admin/vehicles/${vehicle.id}/edit`}
            className="bg-primary hover:bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-sm"
          >
            <Edit size={18} /> Editar Ficha
          </Link>
          <Link
            to="/admin/vehicles"
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-sm"
          >
            <ArrowLeft size={18} /> Volver
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info Card */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden lg:col-span-2">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Especificaciones</h2>
            <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              Disponible
            </span>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-gray-500 mb-1">Modelo / Marca</p>
                <p className="font-medium text-gray-900 text-lg flex items-center gap-2">
                  <Truck size={20} className="text-gray-400" />
                  {vehicle.modelo}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Año</p>
                <p className="font-medium text-gray-900 text-lg flex items-center gap-2">
                  <Calendar size={20} className="text-gray-400" />
                  {vehicle.anio}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Capacidad</p>
                <p className="font-medium text-gray-900 text-lg flex items-center gap-2">
                  <Users size={20} className="text-gray-400" />
                  {vehicle.capacidad} Pasajeros
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Kilometraje Actual</p>
                <p className="font-medium text-gray-900 text-lg flex items-center gap-2">
                  <Gauge size={20} className="text-gray-400" />
                  {vehicle.kilometraje} km
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance History Card */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Wrench size={20} className="text-secondary" />
              Mantenimientos
            </h2>
          </div>
          <div className="p-0">
            <ul className="divide-y divide-gray-100">
              {vehicle.proximos_mantenciones.map((mant) => (
                <li key={mant.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-gray-800 text-sm">{mant.tipo}</span>
                    <span className="text-xs text-gray-500">{mant.fecha}</span>
                  </div>
                  <p className="text-xs text-gray-500">{mant.detalle}</p>
                  <span className="inline-flex items-center gap-1 mt-2 text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                    <MapPin size={10} /> {mant.lugar}
                  </span>
                </li>
              ))}
            </ul>
            <div className="p-4 border-t border-gray-100 text-center">
              <button className="text-primary text-sm font-medium hover:underline">
                Ver Historial Completo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
