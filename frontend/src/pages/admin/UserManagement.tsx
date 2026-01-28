import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  UserPlus, 
  Search, 
  MoreVertical, 
  Shield, 
  Briefcase, 
  User 
} from "lucide-react";

/**
 * UserManagement
 * Based on users.html mockup.
 */
const UserManagement = () => {
    // Mock Users Data
    const users = [
        { id: 1, name: "Juan Pérez", email: "juan.perez@email.com", role: "DRIVER", status: "ACTIVE", initials: "JP" },
        { id: 2, name: "Maria Gonzalez", email: "maria.g@empresa-minera.cl", role: "CLIENT", status: "ACTIVE", initials: "MG" },
        { id: 3, name: "Admin Sistema", email: "admin@elloa.cl", role: "ADMIN", status: "ACTIVE", initials: "AS" },
         { id: 4, name: "Carlos Diaz", email: "carlos.d@email.com", role: "DRIVER", status: "INACTIVE", initials: "CD" },
    ];

    const getRoleBadge = (role: string) => {
        switch(role) {
            case "ADMIN": return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"><Shield size={12} /> ADMIN</span>;
            case "DRIVER": return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><User size={12} /> CHOFER</span>;
            case "CLIENT": return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><Briefcase size={12} /> EMPRESA</span>;
            default: return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{role}</span>;
        }
    };

    return (
        <div className="space-y-6">
            
            {/* Header & Breadcrumb */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                     <nav className="flex text-sm text-gray-500 mb-1">
                        <ol className="flex items-center space-x-2">
                            <li><Link to="/admin/dashboard" className="hover:text-primary transition">Inicio</Link></li>
                            <li><span className="text-gray-400">/</span></li>
                            <li className="text-secondary font-medium">Gestión de Usuarios</li>
                        </ol>
                    </nav>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                        <Users className="text-primary bg-blue-100 p-1 rounded-lg" size={32} />
                        Directorio de Usuarios
                    </h2>
                    <p className="mt-1 text-gray-500">Administre el acceso al sistema para clientes corporativos, choferes y personal.</p>
                </div>
                
                <button className="bg-secondary hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center gap-2 font-bold">
                    <UserPlus size={20} /> Nuevo Usuario
                </button>
            </div>

            {/* KPI Cards */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Card 1 */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-blue-600"></div>
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Choferes Activos</p>
                     <h3 className="text-4xl font-extrabold text-gray-900">15</h3>
                     <p className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1">
                        ↑ +2 este mes
                     </p>
                 </div>
                 {/* Card 2 */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-green-400 to-green-600"></div>
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Clientes Empresa</p>
                     <h3 className="text-4xl font-extrabold text-gray-900">8</h3>
                     <p className="text-xs text-gray-400 mt-2 font-medium">
                        Sin cambios
                     </p>
                 </div>
                 {/* Card 3 */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-purple-400 to-purple-600"></div>
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Usuarios Pendientes</p>
                     <h3 className="text-4xl font-extrabold text-gray-900">3</h3>
                     <p className="text-xs text-orange-500 mt-2 font-medium">
                        Requiere acción
                     </p>
                 </div>
             </div>

            {/* Filters */}
             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    <input type="text" placeholder="Buscar por nombre, email o rut..." className="pl-10 w-full border border-gray-300 rounded-lg py-2 focus:ring-primary focus:border-primary transition" />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <select className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full md:w-auto focus:ring-primary focus:border-primary">
                        <option>Todos los roles</option>
                        <option>Administrador</option>
                        <option>Conductor</option>
                        <option>Cliente</option>
                    </select>
                     <select className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full md:w-auto focus:ring-primary focus:border-primary">
                        <option>Activos</option>
                        <option>Inactivos</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Usuario</th>
                                <th className="px-6 py-4">Rol</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Última Conexión</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                                {user.initials}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 group-hover:text-primary transition">{user.name}</div>
                                                <div className="text-gray-500 text-xs">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getRoleBadge(user.role)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.status === "ACTIVE" 
                                            ? <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200"><span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> Activo</span>
                                            : <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200"><span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Inactivo</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        Hace 5 minutos
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-xs text-gray-500">
                    Showing 1 to 4 of 50 entries
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 shadow-sm disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 shadow-sm">Next</button>
                    </div>
                 </div>
            </div>

        </div>
    );
};

export default UserManagement;
