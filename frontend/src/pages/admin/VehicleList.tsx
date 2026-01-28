import { Link } from 'react-router-dom';
import {
  Truck,
  CheckCircle2,
  Map,
  Wrench,
  Plus,
  Search,
  Filter,
  Bus,
  Edit2,
  Trash2,
  ChevronRight,
  AlertCircle,
  Eye,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/ui/Tooltip';

/**
 * VehicleList
 * Updated to match vehicles.html mockup exactly.
 */
const VehicleList = () => {
  // Mock Data mimicking the mockup content
  const vehicles = [
    {
      id: 1,
      model: 'Mercedes-Benz Sprinter',
      plate: 'HG-JF-22',
      year: 2023,
      status: 'AVAILABLE',
      nextMaintenance: '15 Mar 2026',
      type: 'BUS',
    },
    {
      id: 2,
      model: 'Toyota Hilux 4x4',
      plate: 'JS-KD-99',
      year: 2024,
      status: 'IN_USE',
      nextMaintenance: '01 Feb 2026',
      type: 'TRUCK',
    },
    {
      id: 3,
      model: 'Hyundai H1',
      plate: 'LP-PP-12',
      year: 2022,
      status: 'MAINTENANCE',
      nextMaintenance: 'Vencida (2 días)',
      type: 'BUS',
    },
    {
      id: 4,
      model: 'Mitsubishi L200',
      plate: 'KK-LL-88',
      year: 2023,
      status: 'AVAILABLE',
      nextMaintenance: '20 Abr 2026',
      type: 'TRUCK',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Disponible
          </span>
        );
      case 'IN_USE':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            En Ruta
          </span>
        );
      case 'MAINTENANCE':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Taller / Mant.
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  const getVehicleIcon = (type: string) => {
    return type === 'BUS' ? (
      <Bus className="text-gray-500" size={24} />
    ) : (
      <Truck className="text-gray-500" size={24} />
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <nav className="flex text-sm text-gray-500 mb-1" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/admin/dashboard" className="hover:text-primary transition">
                  Inicio
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li className="text-gray-800 font-medium">Gestión de Flota</li>
            </ol>
          </nav>
          <h2 className="text-2xl font-bold leading-7 text-primary sm:text-3xl sm:truncate flex items-center gap-2">
            <Bus size={32} /> Flota de Vehículos
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Administra la flota, mantenciones y documentación.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/admin/vehicles/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition shadow-md"
          >
            <Plus className="mr-2" size={20} />
            Nuevo Vehículo
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
          <div className="p-5 flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">
                Total Flota
              </dt>
              <dd className="mt-1 text-3xl font-bold text-gray-900">12</dd>
            </div>
            <div className="bg-blue-50 p-2 rounded-full text-primary">
              <Truck size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
          <div className="p-5 flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">
                Disponibles
              </dt>
              <dd className="mt-1 text-3xl font-bold text-green-600">8</dd>
            </div>
            <div className="bg-green-50 p-2 rounded-full text-green-600">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
          <div className="p-5 flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">
                En Ruta
              </dt>
              <dd className="mt-1 text-3xl font-bold text-blue-600">3</dd>
            </div>
            <div className="bg-blue-50 p-2 rounded-full text-blue-600">
              <Map size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
          <div className="p-5 flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">
                Taller / Mant.
              </dt>
              <dd className="mt-1 text-3xl font-bold text-orange-600">1</dd>
            </div>
            <div className="bg-orange-50 p-2 rounded-full text-orange-600">
              <Wrench size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2.5 transition outline-none border"
            placeholder="Buscar por patente, modelo..."
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select className="focus:ring-primary focus:border-primary block w-full sm:w-auto sm:text-sm border-gray-300 rounded-lg p-2.5 bg-white cursor-pointer hover:border-blue-400 transition outline-none border">
            <option value="">Estado: Todos</option>
            <option value="DISPONIBLE">Disponible</option>
            <option value="EN_RUTA">En Ruta</option>
            <option value="MANTENCION">En Mantención</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition">
            <Filter className="mr-2 text-gray-500" size={16} /> Filtrar
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white shadow-md rounded-xl border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Vehículo
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Patente / Año
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Estado
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Prox. Mantención
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50 transition duration-150 group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {getVehicleIcon(vehicle.type)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-gray-900">{vehicle.model}</div>
                      <div className="text-xs text-gray-500">{vehicle.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-mono font-medium">{vehicle.plate}</div>
                  <div className="text-xs text-gray-500">{vehicle.year}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(vehicle.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vehicle.status === 'MAINTENANCE' ? (
                    <span className="text-red-600 font-bold flex items-center gap-1">
                      <AlertCircle size={14} /> {vehicle.nextMaintenance}
                    </span>
                  ) : (
                    vehicle.nextMaintenance
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            to={`/admin/vehicles/${vehicle.id}`}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition inline-block"
                          >
                            <Eye size={16} />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>Ver Detalle</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            to={`/admin/vehicles/${vehicle.id}/edit`}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition inline-block"
                          >
                            <Edit2 size={16} />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>Editar Vehículo</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                            <Trash2 size={16} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Eliminar Vehículo</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Mostrando <span className="font-bold">1-4</span> de{' '}
            <span className="font-bold">12</span> resultados
          </div>
          <div className="flex gap-2">
            <button
              disabled
              className="p-2 rounded-lg border border-gray-300 text-gray-400 bg-white cursor-not-allowed"
            >
              <ChevronRight className="rotate-180" size={16} />
            </button>
            <button className="p-2 rounded-lg border border-gray-300 text-gray-600 bg-white hover:bg-gray-100 hover:text-primary transition shadow-sm">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleList;
