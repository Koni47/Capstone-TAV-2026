import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';
// Leaflet imports
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// Fix for default marker icon in some build setups
import L from 'leaflet';
import { useAuth } from '../../context/AuthContext';
import { tripService } from '../../services/trip.service';
import { toast } from 'sonner'; // Asumiendo que usas sonner o similar, sino usa alert o console

// Fix icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

import { MapPin, Calendar, Clock, Users, Briefcase, ArrowRight, Map } from 'lucide-react';

const ClientRequest = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    clientType: 'persona',
    origin: '',
    destination: '',
    date: '',
    time: '',
    passengers: 1,
    vehicleType: 'sedan',
  });
  
  // State for dynamic pricing estimate
  const [estimate, setEstimate] = useState({ price: 15000, distance: '15 km', duration: '20 min' });

  // Update estimate when details change
  useEffect(() => {
    const origin = formData.origin.toLowerCase();
    const dest = formData.destination.toLowerCase();
    
    let basePrice = 15000;
    let distance = "12 km";
    let duration = "25 min";

    // Simulación simple: Santiago Centro <-> Norte
    // Detect keywords to change the price dramatically
    if ((origin.includes('santiago') || origin.includes('centro')) && 
        (dest.includes('norte') || dest.includes('antofagasta') || dest.includes('calama') || dest.includes('serena'))) {
      basePrice = 450000;
      distance = "1,350 km";
      duration = "14 hrs";
    } else if (origin.includes('aeropuerto') || dest.includes('aeropuerto')) {
       basePrice = 25000;
       distance = "25 km";
       duration = "45 min";
    } else if (origin.length > 2 && dest.length > 2 && origin !== dest) {
       // Variation for other valid inputs ensuring it's not default if user types something else
       // Just a slight random variation to make it feel alive or use length
       basePrice = 15000 + (origin.length + dest.length) * 100;
    }

    // Adjust by vehicle
    if (formData.vehicleType === 'suv') basePrice = basePrice * 1.30; // +30%
    if (formData.vehicleType === 'van') basePrice = basePrice * 1.60; // +60%

    setEstimate({
      price: Math.round(basePrice / 100) * 100, // Round to nearest 100
      distance,
      duration
    });

  }, [formData.origin, formData.destination, formData.vehicleType]);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeField, setActiveField] = useState<'origin' | 'destination' | null>(null);

  const DUMMY_LOCATIONS = [
    'Aeropuerto Int. Arturo Merino Benítez (SCL)',
    'Centro de Santiago, Metro Moneda',
    'Hotel Sheraton, Providencia',
    'Minera Escondida, Antofagasta',
    'Minera Los Pelambres, Salamanca',
    'Codelco División Andina, Los Andes',
    'Minera Collahuasi, Iquique',
    'Plaza de Armas, Santiago',
    'Terminal de Buses, Estación Central',
    'Costanera Center, Las Condes',
    'Oficinas Corporativas Anglo American, Las Condes',
    'Parque Arauco, Las Condes',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'origin' || name === 'destination') {
      if (value.length > 0) {
        const filtered = DUMMY_LOCATIONS.filter((loc) =>
          loc.toLowerCase().includes(value.toLowerCase()),
        );
        setSuggestions(filtered);
        setActiveField(name as 'origin' | 'destination');
      } else {
        setSuggestions([]);
        setActiveField(null);
      }
    }
  };

  const handleSelectSuggestion = (value: string) => {
    if (activeField) {
      setFormData((prev) => ({ ...prev, [activeField]: value }));
      setSuggestions([]);
      setActiveField(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificación simple de Auth para el demo
    // En producción, podrías redirigir a Login o permitir crear usuario invitado
    if (!isAuthenticated || !user) {
      alert("Debes iniciar sesión para cotizar y reservar."); 
      // Opcional: navigate('/login');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Calcular tarifa estimada (desde el estado dinámico)
      const estimatedFare = estimate.price;

      const newTrip = await tripService.createTrip({
        origin: formData.origin,
        destination: formData.destination,
        clientId: user.id,
        fare: estimatedFare 
      });

      // Redirigir al pago con el ID real
      navigate('/client/payment', { 
        state: { 
          tripId: newTrip.id,
          tripDetails: {
            amount: newTrip.fare || estimatedFare,
            origin: newTrip.origin,
            destination: newTrip.destination,
            date: formData.date || new Date().toLocaleDateString(),
            vehicle: formData.vehicleType === 'sedan' ? 'Sedán Ejecutivo' : 
                     formData.vehicleType === 'suv' ? 'SUV Premium' : 'Van Grupal'
          }
        } 
      });

    } catch (error) {
      console.error('Failed to create trip:', error);
      alert('Error al crear la solicitud. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
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
                <li>
                  <Link to="/" className="hover:text-primary transition">
                    Inicio
                  </Link>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li className="text-secondary font-medium">Nueva Solicitud</li>
              </ol>
            </nav>
            <h1 className="text-3xl font-bold text-primary">Planificar Nuevo Viaje</h1>
            <p className="text-gray-500 mt-1">
              Complete los detalles para cotizar y agendar un servicio.
            </p>
          </div>
        </div>

        {/* Main Layout Split */}
        <div className="flex flex-col lg:flex-row gap-6 lg:h-[750px] mb-12">
          {/* Left Column: Form */}
          <div className="w-full lg:w-5/12 h-full flex flex-col">
            <div
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full"
              onClick={() => setActiveField(null)}
            >
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin size={20} />
                </div>
                <h2 className="font-bold text-gray-800">Detalles del Servicio</h2>
              </div>

              <div className="p-6 overflow-y-auto custom-scroll flex-grow">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">
                      Cliente
                    </label>
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
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">
                        Origen
                      </label>
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
                        <button
                          type="button"
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-primary transition"
                        >
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
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">
                        Destino
                      </label>
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
                        <button
                          type="button"
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-primary transition"
                        >
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
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">
                        Fecha
                      </label>
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
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">
                        Hora
                      </label>
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
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">
                        Pasajeros
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 text-gray-400" size={18} />
                        <select
                          name="passengers"
                          value={formData.passengers}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        >
                          {[1, 2, 3, 4, 5, 6, 10, 15].map((p) => (
                            <option key={p} value={p}>
                              {p} pax
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">
                        Vehículo
                      </label>
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

                  {/* Resumen de Cotización Automática */}
                  <div className="bg-gray-100 p-4 rounded-xl border border-gray-200 animate-fade-in-up">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Estimación de Viaje</h3>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="flex items-center gap-4 text-xs text-gray-600 mb-1">
                          <span className="flex items-center gap-1"><Map size={14}/> {estimate.distance}</span>
                          <span className="flex items-center gap-1"><Clock size={14}/> {estimate.duration}</span>
                        </div>
                        <div className="text-2xl font-extrabold text-primary">
                          ${estimate.price.toLocaleString('es-CL')}
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1">* Tarifa referencial sujeta a confirmación final.</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-auto">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-secondary hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{isSubmitting ? 'Procesando...' : 'Cotizar y Pagar'}</span>
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column: Map */}
          <div className="w-full lg:w-7/12 h-[400px] lg:h-full">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden h-full relative z-0">
              <MapContainer
                center={[-33.4489, -70.6693]}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[-33.4489, -70.6693]}>
                  <Popup>
                    Santiago, Chile <br /> Centro de operaciones.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
};

export default ClientRequest;
