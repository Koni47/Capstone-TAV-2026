import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
    AlertTriangle, 
    Send, 
    User, 
    Mail, 
    BadgeCheck, 
    HelpCircle,
    ChevronDown,
    Home
} from "lucide-react";

const ComplaintsPage = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        type: "Reclamo por servicio",
        subject: "",
        description: "",
        name: "",
        email: "",
        isAnonymous: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Enviando denuncia:", formData);
        // Simular envío
        alert("Su solicitud ha sido registrada correctamente. Nos pondremos en contacto a la brevedad.");
        if (isAuthenticated) {
            navigate("/dashboard");
        } else {
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            
            <div className="flex-1 flex flex-col p-6 md:p-12 overflow-y-auto">
                <div className="max-w-3xl w-full mx-auto space-y-8 animate-fadeIn">
                    
                    {/* Breadcrumb */}
                    <nav className="flex text-sm text-gray-500" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-2">
                            <li>
                                <Link to={isAuthenticated ? "/dashboard" : "/"} className="hover:text-primary transition flex items-center gap-1">
                                    <Home size={14}/> Inicio
                                </Link>
                            </li>
                            <li><span className="text-gray-400">/</span></li>
                            <li className="text-gray-800 font-medium">Portal de Denuncias</li>
                        </ol>
                    </nav>

                    {/* Header */}
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Canal de Denuncias y Sugerencias</h1>
                        <p className="text-gray-600">
                            Su opinión es fundamental para nosotros. Utilice este formulario para reportar irregularidades, reclamos o sugerir mejoras.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-6">
                        {/* Form Header */}
                        <div className="border-b border-gray-100 pb-4 mb-4">
                             <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                                <AlertTriangle className="text-secondary" />
                                Registrar Nueva Denuncia
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Solicitud</label>
                                <div className="relative">
                                    <select 
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition bg-white appearance-none"
                                    >
                                        <option>Reclamo por servicio</option>
                                        <option>Denuncia ética / Conducta</option>
                                        <option>Sugerencia de mejora</option>
                                        <option>Felicitaciones</option>
                                        <option>Otro</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
                                <input 
                                    type="text" 
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Resumen breve del motivo" 
                                    className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Detallada</label>
                                <textarea 
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={5} 
                                    placeholder="Describa los hechos (fecha, hora, lugar, personas involucradas)..." 
                                    className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition"
                                    required
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className={formData.isAnonymous ? "opacity-50 pointer-events-none" : ""}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre (Opcional)</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                        <input 
                                            type="text" 
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            disabled={formData.isAnonymous}
                                            className="pl-10 w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition disabled:bg-gray-100"
                                        />
                                    </div>
                                </div>
                                <div className={formData.isAnonymous ? "opacity-50 pointer-events-none" : ""}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email de Contacto (Opcional)</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={formData.isAnonymous}
                                            className="pl-10 w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition disabled:bg-gray-100"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        name="isAnonymous"
                                        checked={formData.isAnonymous}
                                        onChange={handleCheckboxChange}
                                        className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
                                    />
                                    <span className="text-sm text-gray-700 font-medium">Deseo mantener mi identidad en el anonimato</span>
                                </label>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                            <Link to={isAuthenticated ? "/dashboard" : "/"} className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-white hover:text-primary transition font-medium bg-white">
                                Cancelar
                            </Link>
                            <button type="submit" className="px-6 py-2.5 rounded-lg bg-primary text-white hover:bg-blue-900 transition font-medium shadow-md hover:shadow-lg flex items-center gap-2">
                                Enviar Reporte <Send size={18} />
                            </button>
                        </div>
                    </form>

                    {/* Info Sections Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Compromiso */}
                        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 text-primary h-full">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <BadgeCheck size={20} /> Compromiso
                            </h3>
                            <p className="text-sm mb-4 leading-relaxed text-blue-900">
                                Todas las denuncias son revisadas por nuestro comité de ética en un plazo máximo de 48 horas hábiles, garantizando confidencialidad.
                            </p>
                            <div className="text-sm font-semibold border-t border-blue-200 pt-3 flex flex-col gap-2">
                                <div className="flex items-center gap-2"><Mail size={16} /> denuncias@elloa.cl</div>
                            </div>
                        </div>

                        {/* FAQ */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
                            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                 <HelpCircle className="text-gray-400" size={20} /> FAQ
                            </h3>
                            <div className="space-y-3">
                                <details className="group">
                                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-sm text-gray-700 group-hover:text-primary">
                                        <span>¿Es realmente anónimo?</span>
                                        <span className="transition group-open:rotate-180">
                                            <ChevronDown size={16} />
                                        </span>
                                    </summary>
                                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">Sí, nuestro sistema permite el anonimato total si así lo seleccionas en el formulario.</p>
                                </details>
                                <hr className="border-gray-100" />
                                 <details className="group">
                                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-sm text-gray-700 group-hover:text-primary">
                                        <span>¿Plazos de respuesta?</span>
                                        <span className="transition group-open:rotate-180">
                                            <ChevronDown size={16} />
                                        </span>
                                    </summary>
                                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">Acusamos recibo en 24 horas y entregamos resolución preliminar en 5 días.</p>
                                </details>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplaintsPage;
