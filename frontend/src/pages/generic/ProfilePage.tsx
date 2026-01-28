import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Calendar, 
  Building, 
  MapPin, 
  CreditCard, 
  Bell, 
  Briefcase, 
  Shield 
} from "lucide-react";

const ProfilePage = () => {
    const { user } = useAuth();
    
    // Initial state derived from user or mock defaults matching the template
    const [formData, setFormData] = useState({
        fullName: user?.fullName || "Zaida König",
        email: user?.email || "zaida@elloa.cl",
        phone: "+56 9 1234 5678",
        role: "Administrador de Contrato"
    });

    const userInitials = user?.fullName
        ? user.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : 'US';

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Breadcrumbs & Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                     <nav className="flex text-sm text-gray-500 mb-1" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-2">
                            <li><Link to="/dashboard" className="hover:text-primary transition">Dashboard</Link></li>
                            <li><span className="text-gray-400">/</span></li>
                            <li className="text-gray-800 font-medium">Perfil de Usuario</li>
                        </ol>
                    </nav>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Mi Perfil</h1>
                    <p className="text-gray-500 mt-1">Gestiona tu información personal y preferencias de seguridad.</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Left Column: Profile Card */}
                <div className="lg:w-1/3 space-y-6">
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-primary to-blue-800 relative"></div>
                        <div className="px-6 pb-6 text-center relative">
                            <div className="w-24 h-24 mx-auto -mt-12 bg-white rounded-full p-1 shadow-lg">
                                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
                                    {userInitials}
                                </div>
                            </div>
                            <h2 className="mt-3 text-xl font-bold text-gray-900">{formData.fullName}</h2>
                            <p className="text-sm text-gray-500 mb-4 capitalize">{user?.role ? user.role.toLowerCase() : 'Cliente Corporativo'}</p>
                            
                            <div className="flex justify-center gap-3 mb-6">
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200">Activo</span>
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">Verificado</span>
                            </div>

                            <div className="border-t border-gray-100 pt-4 text-left space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Calendar className="text-gray-400" size={18} />
                                    <span>Miembro desde: Ene 2024</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Building className="text-gray-400" size={18} />
                                    <span>Empresa: Codelco</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <MapPin className="text-gray-400" size={18} />
                                    <span>Calama, Chile</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Menu */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
                        <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-primary font-medium rounded-lg transition">
                            <User size={18} /> Información Personal
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition">
                            <Lock size={18} /> Seguridad
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition">
                            <Bell size={18} /> Notificaciones
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition">
                            <CreditCard size={18} /> Métodos de Pago
                        </a>
                    </div>
                </div>

                {/* Right Column: Settings Forms */}
                <div className="lg:w-2/3 space-y-6">
                    
                    {/* General Information */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sm:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Información Personal</h3>
                            <button className="text-sm text-primary font-bold hover:underline">Editar</button>
                        </div>
                        
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Nombre Completo</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="text-gray-400" size={18} />
                                    </span>
                                    <input 
                                        type="text" 
                                        value={formData.fullName} 
                                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-gray-50" 
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Correo Electrónico</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="text-gray-400" size={18} />
                                    </span>
                                    <input 
                                        type="email" 
                                        value={formData.email} 
                                        disabled 
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" 
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Contacte al administrador para cambiar el correo.</p>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Teléfono</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="text-gray-400" size={18} />
                                    </span>
                                    <input 
                                        type="tel" 
                                        value={formData.phone} 
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-gray-50" 
                                    />
                                </div>
                            </div>

                             <div className="col-span-1 md:col-span-2">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Cargo / Rol</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Briefcase className="text-gray-400" size={18} />
                                    </span>
                                    <input 
                                        type="text" 
                                        value={formData.role} 
                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-gray-50" 
                                    />
                                </div>
                            </div>

                            <div className="col-span-1 md:col-span-2 flex justify-end">
                                <button type="submit" className="bg-primary hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg shadow-md transition transform hover:-translate-y-0.5">
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Security */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sm:p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Shield className="text-secondary" size={24} /> Seguridad
                        </h3>
                        
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Nueva Contraseña</label>
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Confirmar Contraseña</label>
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition" 
                                />
                            </div>
                             <div className="flex justify-end mt-4">
                                <button type="button" className="text-secondary font-bold hover:text-orange-700 text-sm">
                                    Actualizar Contraseña
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
