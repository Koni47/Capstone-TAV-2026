import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  MoreVertical,
  FileDown,
  AlertCircle,
  CheckCircle,
  Truck,
  Clock,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Plus,
  Filter,
  Calendar,
  Eye,
  User,
} from 'lucide-react';

// Mock Data for Requests - Expanded to match mockup style and provided HTML
const MOCK_REQUESTS = [
  {
    id: 'REQ-00125',
    date: '12 Oct 2023',
    time: '14:30',
    client: 'Empresa Minera X',
    clientType: 'Corporativo',
    passenger: 'Juan Pérez',
    origin: 'Aeropuerto Calama',
    destination: 'Hotel Diego de Almagro',
    status: 'pending',
    driver: null,
    vehicle: null,
  },
  {
    id: 'REQ-00124',
    date: '12 Oct 2023',
    time: '10:15',
    client: 'Hotel Y',
    clientType: 'Turismo',
    passenger: 'María González',
    origin: 'Hotel Y',
    destination: 'San Pedro de Atacama',
    status: 'in_progress',
    driver: 'Carlos Ruíz',
    vehicle: 'Van Hyundai H1',
  },
  {
    id: 'REQ-00123',
    date: '11 Oct 2023',
    time: '18:45',
    client: 'Particular',
    clientType: 'Particular',
    passenger: 'Roberto Gomez',
    origin: 'Mall Plaza',
    destination: 'Calle Larga 123',
    status: 'completed',
    driver: 'Ana López',
    vehicle: 'SUV Chevrolet',
  },
  {
    id: 'REQ-00122',
    date: '11 Oct 2023',
    time: '09:00',
    client: 'Empresa Solar Z',
    clientType: 'Corporativo',
    passenger: 'Equipo Técnico (4 pax)',
    origin: 'Oficina Central',
    destination: 'Planta Solar Norte',
    status: 'assigned',
    driver: 'Pedro Sanchez',
    vehicle: 'Minibus Mercedes',
  },
];

const AdminRequestList = () => {
  const [requests] = useState(MOCK_REQUESTS);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
            Pendiente
          </span>
        );
      case 'assigned':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            Asignado
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
            En Ruta
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            Completado
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
            Cancelado
          </span>
        );
      default:
        return <span className="text-gray-500">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Breadcrumb */}
      <div>
        <nav className="flex text-sm text-gray-500 mb-2">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/admin/dashboard" className="hover:text-primary transition">
                Inicio
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li className="font-medium text-gray-900">Solicitudes</li>
          </ol>
        </nav>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <ClipboardList className="text-secondary" /> Gestión de Solicitudes
            </h1>
            <p className="text-gray-500 mt-1">
              Administra las solicitudes de transporte y asignaciones.
            </p>
          </div>

          <Link
            to="/client/request"
            className="bg-secondary hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-2 font-bold decoration-0"
          >
            <Plus size={20} /> Nueva Solicitud
          </Link>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                Total Mes
              </div>
              <div className="text-3xl font-bold text-gray-900 mt-1">124</div>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <ClipboardList size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-yellow-600 uppercase tracking-wide">
                Pendientes
              </div>
              <div className="text-3xl font-bold text-gray-900 mt-1">12</div>
            </div>
            <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
              <AlertCircle size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                Asignados
              </div>
              <div className="text-3xl font-bold text-gray-900 mt-1">8</div>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Clock size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-green-600 uppercase tracking-wide">
                Completados
              </div>
              <div className="text-3xl font-bold text-gray-900 mt-1">98</div>
            </div>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <CheckCircle size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Buscar por cliente, ID o pasajero..."
            className="pl-10 w-full border border-gray-300 rounded-lg py-2 focus:ring-primary focus:border-primary outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary focus:border-primary outline-none text-gray-600 bg-white">
            <option>Todos los Estados</option>
            <option>Pendiente</option>
            <option>En Ruta</option>
            <option>Completado</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 text-gray-700 font-medium transition">
            <Filter size={18} /> Filtros
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 text-gray-700 font-medium transition">
            <FileDown size={18} /> Exportar
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200 font-semibold">
              <tr>
                <th className="px-6 py-4">ID / Cliente</th>
                <th className="px-6 py-4">Pasajero</th>
                <th className="px-6 py-4">Fecha / Hora</th>
                <th className="px-6 py-4">Ruta</th>
                <th className="px-6 py-4">Estado / Asignación</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 transition group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{req.id}</div>
                    <div className="text-xs text-gray-500">{req.client}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-100 p-1.5 rounded-full">
                        <User size={14} className="text-gray-500" />
                      </div>
                      {req.passenger}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-700">
                      <Calendar size={14} className="text-gray-400" /> {req.date}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Clock size={12} /> {req.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5 text-xs md:text-sm">
                      <div className="flex items-center gap-2 text-gray-600" title={req.origin}>
                        <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                        <span className="truncate max-w-[150px]">{req.origin}</span>
                      </div>
                      <div
                        className="flex items-center gap-2 text-gray-600"
                        title={req.destination}
                      >
                        <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></div>
                        <span className="truncate max-w-[150px]">{req.destination}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="mb-1">{getStatusBadge(req.status)}</div>
                    {req.driver ? (
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Truck size={12} className="text-gray-400" />
                        {req.driver}
                      </div>
                    ) : (
                      req.status === 'pending' && (
                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1 mt-1">
                          <Truck size={12} /> Sin asignar
                        </span>
                      )
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
                        title="Ver Detalle"
                      >
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            Mostrando <span className="font-bold">1-4</span> de{' '}
            <span className="font-bold">124</span> resultados
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border border-gray-300 rounded-md hover:bg-white bg-white text-gray-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              disabled
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-primary bg-primary text-white rounded-md text-sm shadow-sm">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 bg-white text-gray-700 rounded-md text-sm hover:bg-gray-50 shadow-sm">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 bg-white text-gray-700 rounded-md text-sm hover:bg-gray-50 shadow-sm">
                ...
              </button>
            </div>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-white bg-white text-gray-700 text-sm shadow-sm">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRequestList;
