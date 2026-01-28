import { Link } from 'react-router-dom';
import {
  Users,
  UserPlus,
  Search,
  Shield,
  User,
  Filter,
  Download,
  ChevronRight,
  Edit2,
  Trash2,
  Truck,
  Building,
  CheckCircle2,
  XCircle,
  ArrowUp,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/ui/Tooltip';

/**
 * UserManagement
 * Based on users.html mockup.
 */
const UserManagement = () => {
  // Mock Users Data
  const users = [
    {
      id: 1,
      name: 'Zaida König',
      email: 'zaida@elloa.cl',
      role: 'ADMIN',
      status: 'ACTIVE',
      initials: 'ZK',
      lastAccess: 'Hace 5 minutos',
    },
    {
      id: 2,
      name: 'Juan Pérez',
      email: 'juan.moto@email.com',
      role: 'DRIVER',
      status: 'ACTIVE',
      initials: 'JP',
      lastAccess: 'Hace 1 hora',
    },
    {
      id: 3,
      name: 'Minera Escondida',
      email: 'contacto@escondida.cl',
      role: 'CLIENT',
      status: 'ACTIVE',
      initials: 'ME',
      lastAccess: 'Ayer',
    },
    {
      id: 4,
      name: 'Pedro Inactivo',
      email: 'pedro@email.com',
      role: 'DRIVER',
      status: 'INACTIVE',
      initials: 'PI',
      lastAccess: 'Hace 2 semanas',
    },
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
            <Shield size={12} /> Administrador
          </span>
        );
      case 'DRIVER':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
            <Truck size={12} /> Chofer
          </span>
        );
      case 'CLIENT':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
            <Building size={12} /> Cliente
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
            <User size={12} /> Usuario
          </span>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'ACTIVE' ? (
      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold inline-flex items-center gap-1">
        <CheckCircle2 size={12} /> Activo
      </span>
    ) : (
      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold inline-flex items-center gap-1">
        <XCircle size={12} /> Inactivo
      </span>
    );
  };

  return (
    <div className="space-y-8 min-h-[calc(100vh-200px)] font-sans text-gray-800">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <nav className="flex text-sm text-gray-500 mb-2" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/admin/dashboard" className="hover:text-primary transition">
                  Inicio
                </Link>
              </li>
              <li>
                <ChevronRight size={12} className="text-gray-400" />
              </li>
              <li className="text-secondary font-medium">Gestión de Usuarios</li>
            </ol>
          </nav>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
            <div className="bg-blue-100 text-primary p-2 rounded-lg">
              <Users size={28} />
            </div>
            Directorio de Usuarios
          </h2>
          <p className="mt-2 text-gray-500 max-w-2xl">
            Administre el acceso al sistema para clientes corporativos, choferes y personal
            administrativo.
          </p>
        </div>

        <Link
          to="/admin/users/new"
          className="group bg-secondary hover:bg-orange-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center gap-2 font-bold no-underline"
        >
          <UserPlus size={20} className="group-hover:scale-110 transition-transform" />
          Nuevo Usuario
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden group">
          <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-blue-600"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                Choferes Activos
              </p>
              <h3 className="text-4xl font-extrabold text-gray-900">15</h3>
              <p className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1">
                <ArrowUp size={12} /> +2 este mes
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
              <Truck size={32} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden group">
          <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-green-400 to-green-600"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                Clientes Corp.
              </p>
              <h3 className="text-4xl font-extrabold text-gray-900">8</h3>
              <p className="text-xs text-gray-400 mt-2 font-medium">Empresas asociadas</p>
            </div>
            <div className="bg-green-50 p-3 rounded-xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors shadow-sm">
              <Building size={32} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden group">
          <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-purple-400 to-purple-600"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                Total Usuarios
              </p>
              <h3 className="text-4xl font-extrabold text-gray-900">26</h3>
              <p className="text-xs text-blue-400 mt-2 font-medium">3 Administradores</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-sm">
              <Users size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search
                size={20}
                className="text-gray-400 group-focus-within:text-primary transition"
              />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition sm:text-sm"
              placeholder="Buscar por nombre, RUT o email..."
            />
          </div>

          {/* Right Actions */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer hover:border-gray-300 transition text-sm font-medium shadow-sm">
                <option value="">Todos los Roles</option>
                <option value="ADMIN">Administrador</option>
                <option value="DRIVER">Chofer</option>
                <option value="CLIENT">Cliente</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <ChevronRight size={16} className="rotate-90" />
              </div>
            </div>

            <button className="flex items-center gap-2 px-5 py-3 border border-gray-200 shadow-sm text-sm font-bold rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:text-primary transition">
              <Filter size={18} className="text-gray-400" /> Filtros
            </button>

            <button className="flex items-center gap-2 px-5 py-3 border border-gray-200 shadow-sm text-sm font-bold rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:text-primary transition">
              <Download size={18} className="text-gray-400" /> Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Usuario
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Rol Asignado
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                >
                  Último Acceso
                </th>
                <th scope="col" className="relative px-6 py-4">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50/30 transition duration-200 group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-11 w-11 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center text-purple-700 font-bold border border-purple-200 shadow-sm">
                        {user.initials}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(user.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                    {user.lastAccess}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              to={`/admin/users/${user.id}/edit`}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition inline-block"
                            >
                              <Edit2 size={16} />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>Editar Usuario</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                              <Trash2 size={16} />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Eliminar Usuario</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Mostrando <span className="font-bold">1-4</span> de{' '}
            <span className="font-bold">26</span> resultados
          </div>
          <div className="flex gap-2">
            <button
              disabled
              className="p-2 rounded-lg border border-gray-200 text-gray-400 bg-white cursor-not-allowed"
            >
              <ChevronRight className="rotate-180" size={16} />
            </button>
            <button className="p-2 rounded-lg border border-gray-200 text-gray-600 bg-white hover:bg-gray-100 hover:text-primary transition shadow-sm">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
