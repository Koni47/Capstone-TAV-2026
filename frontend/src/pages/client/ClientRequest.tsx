import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicNavbar from "../../components/layout/PublicNavbar";
import PublicFooter from "../../components/layout/PublicFooter";
import { 
    MapPin, 
    Calendar, 
    Clock, 
    Users, 
    Briefcase,
    ArrowRight,
    Map
} from "lucide-react";

const ClientRequest = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        clientType: "persona",
        origin: "",
        destination: "",
        date: "",
        time: "",
        passengers: 1,
        vehicleType: "sedan"
    });

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [activeField, setActiveField] = useState<"origin" | "destination" | null>(null);

    const DUMMY_LOCATIONS = [
        "Aeropuerto Int. Arturo Merino Benítez (SCL)",
        "Centro de Santiago, Metro Moneda",
        "Hotel Sheraton, Providencia",
        "Minera Escondida, Antofagasta",
        "Minera Los Pelambres, Salamanca",
        "Codelco División Andina, Los Andes",
        "Minera Collahuasi, Iquique",
        "Plaza de Armas, Santiago",
        "Terminal de Buses, Estación Central",
        "Costanera Center, Las Condes",
        "Oficinas Corporativas Anglo American, Las Condes",
        "Parque Arauco, Las Condes"
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === "origin" || name === "destination") {
            if (value.length > 0) {
                const filtered = DUMMY_LOCATIONS.filter(loc => 
                    loc.toLowerCase().includes(value.toLowerCase())
                );
                setSuggestions(filtered);
                setActiveField(name as "origin" | "destination");
            } else {
                setSuggestions([]);
                setActiveField(null);
            }
        }
    };

    const handleSelectSuggestion = (value: string) => {
        if (activeField) {
            setFormData(prev => ({ ...prev, [activeField]: value }));
            setSuggestions([]);
            setActiveField(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would normally save the request state
        // For public flow, maybe redirect to logic or payment
        navigate('/client/payment');
    };

    return (
        <div className="font-sans flex flex-col min-h-screen bg-gray-50">
            <PublicNavbar />
            
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div>
                        <nav className="flex text-sm text-gray-500 mb-1" aria-label="Breadcrumb">
                            <ol className="flex items-center space-x-2">
                                <li><Link to="/" className="hover:text-primary transition">Inicio</Link></li>
                                <li><span className="text-gray-400">/</span></li>
                                <li className="text-secondary font-medium">Nueva Solicitud</li>
                            </ol>
                        </nav>
                        <h1 className="text-3xl font-bold text-primary">Planificar Nuevo Viaje</h1>
                        <p className="text-gray-500 mt-1">Complete los detalles para cotizar y agendar un servicio.</p>
                    </div>
                </div>

                {/* Main Layout Split */}
                <div className="flex flex-col lg:flex-row gap-6 lg:h-[750px] mb-12">
                    
                    {/* Left Column: Form */}
                    <div className="w-full lg:w-5/12 h-full flex flex-col">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full" onClick={() => setActiveField(null)}>
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <MapPin size={20} />
                                </div>
                                <h2 className="font-bold text-gray-800">Detalles del Servicio</h2>
                            </div>
                            
                            <div className="p-6 overflow-y-auto custom-scroll flex-grow">
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Cliente</label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-3 top-3 text-gray-400" size={18} />
                                            <select 
                                                name="clientType" 
                                                value={formData.clientType}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                            >
                                                <option value="empresa">Empresa / Convenio</option>
                                                <option value="persona">Persona Natural</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Ruta */}
                                    <div className="bg-blue-50/50 p-4 rounded-xl space-y-4 border border-blue-100/50 relative">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Origen</label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-3 w-4 h-4 rounded-full border-2 border-green-500 bg-white"></div>
                                                <input 
                                                    type="text" 
                                                    name="origin"
                                                    value={formData.origin}
                                                    onChange={handleChange}
                                                    onFocus={() => setActiveField('origin')} 
                                                    placeholder="¿Dónde te buscamos?" 
                                                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                    required
                                                    autoComplete="off"
                                                />
                                                <button type="button" className="absolute right-3 top-2.5 text-gray-400 hover:text-primary transition">
                                                    <MapPin size={18} />
                                                </button>
                                                
                                                {/* Autocomplete Dropdown - Origin */}
                                                {activeField === 'origin' && suggestions.length > 0 && (
                                                    <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                                                        {suggestions.map((loc, idx) => (
                                                            <button
                                                                key={idx}
                                                                type="button"
                                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors flex items-center gap-2"
                                                                onClick={() => handleSelectSuggestion(loc)}
                                                            >
                                                                <MapPin size={14} className="text-gray-400" />
                                                                {loc}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-center -my-2 relative z-10">
                                            <div className="w-0.5 h-4 bg-gray-300"></div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Destino</label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-3 w-4 h-4 rounded-full border-2 border-red-500 bg-white"></div>
                                                <input 
                                                    type="text" 
                                                    name="destination"
                                                    value={formData.destination}
                                                    onChange={handleChange}
                                                    onFocus={() => setActiveField('destination')}
                                                    placeholder="¿Hacia dónde vas?" 
                                                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                    required
                                                    autoComplete="off"
                                                />
                                                <button type="button" className="absolute right-3 top-2.5 text-gray-400 hover:text-primary transition">
                                                    <MapPin size={18} />
                                                </button>

                                                {/* Autocomplete Dropdown - Destination */}
                                                {activeField === 'destination' && suggestions.length > 0 && (
                                                    <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                                                        {suggestions.map((loc, idx) => (
                                                            <button
                                                                key={idx}
                                                                type="button"
                                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors flex items-center gap-2"
                                                                onClick={() => handleSelectSuggestion(loc)}
                                                            >
                                                                <MapPin size={14} className="text-gray-400" />
                                                                {loc}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fecha y Hora */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Fecha</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                                                <input 
                                                    type="date" 
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-600"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Hora</label>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-3 text-gray-400" size={18} />
                                                <input 
                                                    type="time" 
                                                    name="time"
                                                    value={formData.time}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-600"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pasajeros y Tipo */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Pasajeros</label>
                                            <div className="relative">
                                                <Users className="absolute left-3 top-3 text-gray-400" size={18} />
                                                <select 
                                                    name="passengers" 
                                                    value={formData.passengers}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                >
                                                    {[1,2,3,4,5,6,10,15].map(p => (
                                                        <option key={p} value={p}>{p} pax</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Vehículo</label>
                                            <div className="relative">
                                                <Map className="absolute left-3 top-3 text-gray-400" size={18} />
                                                <select 
                                                    name="vehicleType"
                                                    value={formData.vehicleType}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                >
                                                    <option value="sedan">Sedán (Standard)</option>
                                                    <option value="suv">SUV (Ejecutivo)</option>
                                                    <option value="van">Van (Grupal)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 mt-auto">
                                        <button type="submit" className="w-full bg-secondary hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                            <span>Cotizar y Continuar</span>
                                            <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Map */}
                    <div className="w-full lg:w-7/12 h-[400px] lg:h-full">
                        <div className="bg-gray-200 rounded-2xl shadow-xl border border-gray-100 overflow-hidden h-full relative group">
                            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                                 {/* Falso mapa background */}
                                 <div className="text-center text-gray-500">
                                     <Map size={64} className="mx-auto mb-2 opacity-30" />
                                     <p className="font-semibold">Mapa Interactivo</p>
                                     <p className="text-sm">Selecciona origen y destino en el mapa</p>
                                 </div>
                             </div>
                             {/* Overlay de Simulación de Mapa */}
                             <img 
                                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2664&auto=format&fit=crop"
                                alt="Mapa"
                                className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply hover:opacity-100 transition duration-700"
                             />
                        </div>
                    </div>

                </div>

            </main>
            <PublicFooter />
        </div>
    );
};

export default ClientRequest;