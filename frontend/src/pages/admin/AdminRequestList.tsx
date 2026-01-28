import React, { useState } from "react";
import { 
    LayoutDashboard, 
    Search, 
    Filter, 
    MoreVertical, 
    Plus, 
    Calendar,
    Clock,
    MapPin,
    ClipboardList,
    CheckCircle,
    XCircle,
    AlertCircle,
    Eye
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock Data for Requests
const MOCK_REQUESTS = [
    {
        id: "SOL-2024-001",
        client: "Minera Escondida",
        passenger: "Juan Pérez",
        date: "2024-10-15",
        time: "08:30",
        origin: "Aeropuerto Calama",
        destination: "Mina Escondida",
        status: "pending", // pending, assigned, in_progress, completed, cancelled
        driver: null
    },
    {
        id: "SOL-2024-002",
        client: "Codelco Norte",
        passenger: "Ana Rojas",
        date: "2024-10-15",
        time: "09:00",
        origin: "Hotel Diego de Almagro",
        destination: "Chuquicamata",
        status: "assigned",
        driver: "Carlos Conductor"
    },
    {
        id: "SOL-2024-003",
        client: "Particular",
        passenger: "Pedro Diaz",
        date: "2024-10-15",
        time: "10:15",
        origin: "Centro Calama",
        destination: "Aeropuerto Calama",
        status: "completed",
        driver: "Luis Chofer"
    },
    {
        id: "SOL-2024-004",
        client: "Constructora Andes",
        passenger: "Grupo Ingenieros",
        date: "2024-10-16",
        time: "07:00",
        origin: "Campamento Andes",
        destination: "Obra Viento Sur",
        status: "cancelled",
        driver: null
    }
];

const AdminRequestList = () => {
    const [requests] = useState(MOCK_REQUESTS);

    const getStatusBadge = (status: string) => {
        switch(status) {
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                        <AlertCircle size={12} /> Pendiente
                    </span>
                );
            case 'assigned':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        <Clock size={12} /> Asignado
                    </span>
                );
            case 'completed':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        <CheckCircle size={12} /> Completado
                    </span>
                );
            case 'cancelled':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                        <XCircle size={12} /> Cancelado
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
                         <li><Link to="/admin/dashboard" className="hover:text-primary transition">Inicio</Link></li>
                         <li><span className="text-gray-400">/</span></li>
                         <li className="font-medium text-gray-900">Solicitudes</li>
                    </ol>
                </nav>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                           <ClipboardList className="text-secondary" /> Gestión de Solicitudes
                        </h1>
                        <p className="text-gray-500 mt-1">Administra las solicitudes de transporte y asignaciones.</p>
                    </div>
                    
                    <button className="bg-secondary hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-2 font-bold">
                       <Plus size={20} /> Nueva Solicitud
                    </button>
                </div>
            </div>

            {/* KPI Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                   <div className="flex justify-between items-start">
                       <div>
                           <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">Total Mes</div>
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
                           <div className="text-xs font-bold text-yellow-600 uppercase tracking-wide">Pendientes</div>
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
                           <div className="text-xs font-bold text-blue-600 uppercase tracking-wide">Asignados</div>
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
                           <div className="text-xs font-bold text-green-600 uppercase tracking-wide">Completados</div>
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
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                  <input type="text" placeholder="Buscar por cliente, ID o pasajero..." className="pl-10 w-full border border-gray-300 rounded-lg py-2 focus:ring-primary focus:border-primary outline-none" />
               </div>
               <div className="flex gap-2">
                   <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 text-gray-700 font-medium transition">
                      <Filter size={18} /> Filtros
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
                                        {req.passenger}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 text-gray-700">
                                            <Calendar size={14} className="text-gray-400"/> {req.date}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                            <Clock size={12} /> {req.time}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 text-xs md:text-sm">
                                            <div className="flex items-center gap-1 text-gray-600" title={req.origin}>
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                <span className="truncate max-w-[120px]">{req.origin}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-600" title={req.destination}>
                                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                <span className="truncate max-w-[120px]">{req.destination}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="mb-1">{getStatusBadge(req.status)}</div>
                                        {req.driver ? (
                                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                                {req.driver}
                                            </div>
                                        ) : (
                                            req.status === 'pending' && <span className="text-xs text-red-500 font-medium">Sin asignar</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 text-gray-400">
                                            <button className="p-2 hover:text-blue-600 hover:bg-blue-50 rounded-full transition" title="Ver Detalle">
                                                <Eye size={16} />
                                            </button>
                                            <button className="p-2 hover:text-gray-800 hover:bg-gray-100 rounded-full transition">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">Mostrando <span className="font-bold">1-4</span> de <span className="font-bold">25</span> resultados</div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm disabled:opacity-50" disabled>Anterior</button>
                        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">Siguiente</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminRequestList;