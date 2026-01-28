import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { 
    Building, 
    ArrowLeft, 
    Edit, 
    User, 
    Mail, 
    Phone, 
    Clock, 
    CheckCircle, 
    Users, 
    Headphones,
    ChevronRight,
    Calendar
} from "lucide-react";

// Mock Data (Simulando respuesta de API)
const MOCK_COMPANY_DETAIL = {
    id: 1,
    name: "Minera Escondida Limitada",
    rut: "76.123.456-K",
    industry: "Minería / Extracción",
    registrationDate: "15 Ene, 2024",
    status: "active",
    contact: {
        name: "Roberto Díaz",
        position: "Gerente de Logística",
        email: "rdiaz@escondida.cl",
        phone: "+56 55 212 3456"
    },
    stats: {
        pendingRequests: 3,
        completedTrips: 124,
        activeUsers: 12
    },
    costCenters: [
        { id: "CC-2045", name: "Operaciones Mina", description: "Presupuesto anual asignado" },
        { id: "CC-1090", name: "Administración", description: "Personal administrativo y visitas" }
    ],
    contracts: [
        { 
            id: "CT-2025-001", 
            name: "Transporte Personal Turno 7x7", 
            description: "Servicio de transporte diario Calama - Faena.",
            status: "Vigente",
            expiryDate: "31 Dic, 2026"
        }
    ]
};

const CompanyDetail = () => {
    const { id } = useParams();
    const [company, setCompany] = useState<typeof MOCK_COMPANY_DETAIL | null>(null);

    useEffect(() => {
        // Simular carga de datos
        setCompany(MOCK_COMPANY_DETAIL);
    }, [id]);

    if (!company) return <div>Cargando...</div>;

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
            
            {/* Breadcrumb & Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <nav className="flex text-sm text-gray-500 mb-1">
                        <ol className="flex items-center space-x-2">
                            <li><Link to="/admin/dashboard" className="hover:text-primary transition">Inicio</Link></li>
                            <li><span className="text-gray-400">/</span></li>
                            <li><Link to="/admin/companies" className="hover:text-primary transition">Clientes</Link></li>
                            <li><span className="text-gray-400">/</span></li>
                            <li className="text-gray-900 font-medium">Detalle Empresa</li>
                        </ol>
                    </nav>
                    <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
                        <Building size={32} className="text-gray-700" />
                        {company.name}
                    </h1>
                </div>
                <div className="flex gap-3">
                    <Link to={`/admin/companies/${id}/edit`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-sm font-medium">
                        <Edit size={16} /> Editar
                    </Link>
                    <Link to="/admin/companies" className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-sm font-medium">
                        <ArrowLeft size={16} /> Volver
                    </Link>
                </div>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Main Info Card */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden lg:col-span-2">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800">Información General</h2>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium uppercase min-w-[60px] text-center">
                            {company.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Razón Social</p>
                                <p className="font-medium text-gray-900 text-lg">{company.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">RUT</p>
                                <p className="font-medium text-gray-900 text-lg">{company.rut}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Rubro</p>
                                <p className="font-medium text-gray-900">{company.industry}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Fecha de Registro</p>
                                <p className="font-medium text-gray-900">{company.registrationDate}</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                             <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Datos de Contacto</h3>
                             <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary flex-shrink-0">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Contacto Principal</p>
                                        <p className="font-medium text-gray-900">{company.contact.name}</p>
                                        <p className="text-sm text-gray-600">{company.contact.position}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary flex-shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email Corporativo</p>
                                        <a href={`mailto:${company.contact.email}`} className="font-medium text-blue-600 hover:underline">{company.contact.email}</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary flex-shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Teléfono</p>
                                        <p className="font-medium text-gray-900">{company.contact.phone}</p>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Stats / Quick Actions Card */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Resumen de Actividad</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Clock size={20} className="text-orange-500" />
                                    <span className="text-sm font-medium text-gray-700">Solicitudes Pendientes</span>
                                </div>
                                <span className="font-bold text-gray-900">{company.stats.pendingRequests}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <CheckCircle size={20} className="text-green-600" />
                                    <span className="text-sm font-medium text-gray-700">Viajes Completados</span>
                                </div>
                                <span className="font-bold text-gray-900">{company.stats.completedTrips}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Users size={20} className="text-blue-600" />
                                    <span className="text-sm font-medium text-gray-700">Usuarios Activos</span>
                                </div>
                                <span className="font-bold text-gray-900">{company.stats.activeUsers}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary to-blue-900 rounded-xl shadow-md p-6 text-white text-center">
                         <div className="flex justify-center mb-2">
                            <Headphones size={36} className="text-secondary" />
                         </div>
                         <h3 className="font-bold text-lg mb-1">¿Necesitas ayuda?</h3>
                         <p className="text-blue-100 text-sm mb-4">Contacta al soporte para gestionar cuentas de esta empresa.</p>
                         <button className="bg-white text-primary hover:bg-gray-100 px-4 py-2 rounded-lg font-medium text-sm transition w-full">Contactar Soporte</button>
                    </div>
                </div>
            </div>

            {/* Related Info Grid (Cost Centers & Contracts) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Cost Centers */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                     <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800">Centros de Costo</h3>
                        <button className="text-blue-600 text-sm font-medium hover:underline">+ Agregar</button>
                    </div>
                    <div className="p-6">
                        <div className="space-y-3">
                            {company.costCenters.map(cc => (
                                <div key={cc.id} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition cursor-pointer flex justify-between items-center bg-gray-50">
                                    <div>
                                        <p className="font-bold text-gray-800 text-sm">{cc.id}: {cc.name}</p>
                                        <p className="text-xs text-gray-500">{cc.description}</p>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-400" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contracts */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                     <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800">Contratos Vigentes</h3>
                         <button className="text-blue-600 text-sm font-medium hover:underline">Ver Historial</button>
                    </div>
                     <div className="p-6">
                         {company.contracts.map(contract => (
                            <div key={contract.id} className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                                 <div className="flex justify-between items-start mb-2">
                                    <span className="bg-blue-200 text-blue-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded">{contract.status}</span>
                                    <span className="text-xs text-blue-800 font-bold">#{contract.id}</span>
                                 </div>
                                 <h4 className="font-bold text-gray-900 mb-1">{contract.name}</h4>
                                 <p className="text-sm text-gray-600 mb-3">{contract.description}</p>
                                 <div className="flex items-center gap-2 text-xs text-gray-500">
                                     <Calendar size={14} />
                                     <span>Vence: {contract.expiryDate}</span>
                                 </div>
                             </div>
                         ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetail;
