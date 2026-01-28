import React, { useState } from "react";
import PublicNavbar from '../components/layout/PublicNavbar';
import PublicFooter from '../components/layout/PublicFooter';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Crosshair,
  Armchair,
  Receipt,
  Car,
  MapPin,
  ArrowRight,
  Users,
  Building2,
  CalendarCheck,
  CreditCard,
  Circle,
  Calculator,
  User,
  Lock,
  Clock // Added Clock
} from 'lucide-react';

/**
 * Landing Page
 */
const LandingPage = () => {
  const navigate = useNavigate();
  const { user, login, isAuthenticated } = useAuth();
  
  // Tabs State
  const [activeTab, setActiveTab] = useState<'quote' | 'request'>('quote');

  // Quote State
  const [quoteInput, setQuoteInput] = useState({ origin: '', destination: '' });
  const [quoteResult, setQuoteResult] = useState<{ amount: number; distance: string, time: string } | null>(null);

  // Login State (for Request Tab)
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // --- Handlers ---

  const handleQuote = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica Dummy de Cotización
    const origin = quoteInput.origin.toLowerCase();
    const dest = quoteInput.destination.toLowerCase();
    
    let basePrice = 15000;
    let distance = "15 km";
    let time = "25 min";

    // Simulación simple: Santiago Centro <-> Norte
    if ((origin.includes('santiago') || origin.includes('centro')) && 
        (dest.includes('norte') || dest.includes('antofagasta') || dest.includes('calama') || dest.includes('serena'))) {
      basePrice = 450000;
      distance = "1,350 km";
      time = "14 hrs";
    } else if (origin.includes('aeropuerto') || dest.includes('aeropuerto')) {
       basePrice = 25000;
       distance = "25 km";
       time = "45 min";
    }

    setQuoteResult({
      amount: basePrice,
      distance,
      time
    });
  };

  const handleLoginAndRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      await login(loginData);
      navigate('/client/request');
    } catch (err) {
      setLoginError('Credenciales incorrectas');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRequestClick = () => {
    if (isAuthenticated) {
      navigate('/client/request');
    } else {
      setActiveTab('request');
    }
  };

  return (
    <div className="font-sans flex flex-col min-h-screen">
      <PublicNavbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[700px] flex items-center pt-24 pb-20">
        <img
          src="/assets/img/hero.jpg"
          alt="Vista Pasajero Carretera"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#002244]/95 via-[#003366]/80 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-semibold text-secondary">
              <ShieldCheck size={18} />
              <span>Estándar de Seguridad en Transporte</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
              Viaja seguro. <br />
              <span className="text-gray-200 font-medium text-3xl block mt-2">
                Ya seas una gran empresa o un particular.
              </span>
            </h1>

            <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
              Llevamos la excelencia operativa de la minería a tus traslados personales. Aeropuerto,
              turismo o faena, llegamos donde necesites.
            </p>

            <div className="flex items-center gap-6 pt-4 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex flex-col items-center">
                <Crosshair size={32} className="mb-1" />
                <span className="text-xs uppercase tracking-widest">GPS 24/7</span>
              </div>
              <div className="flex flex-col items-center">
                <Armchair size={32} className="mb-1" />
                <span className="text-xs uppercase tracking-widest">Confort</span>
              </div>
              <div className="flex flex-col items-center">
                <Receipt size={32} className="mb-1" />
                <span className="text-xs uppercase tracking-widest">Facturación</span>
              </div>
            </div>
          </div>

          {/* Right Form Card (COTIZADOR / LOGIN) */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform lg:translate-y-8 border-t-8 border-secondary">
            
            {/* Tabs Header */}
            <div className="flex text-sm font-bold border-b border-gray-100">
              <button 
                onClick={() => setActiveTab('quote')}
                className={`flex-1 py-4 flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'quote' 
                    ? 'bg-white text-primary border-b-2 border-primary' 
                    : 'bg-gray-50 text-gray-400 hover:text-gray-600'
                }`}
              >
                <Calculator size={18} />
                Cotizar Rápido
              </button>
              <button 
                onClick={handleRequestClick}
                className={`flex-1 py-4 flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'request' 
                    ? 'bg-white text-secondary border-b-2 border-secondary' 
                    : 'bg-gray-50 text-gray-400 hover:text-gray-600'
                }`}
              >
                <Car size={18} />
                Agendar Viaje
              </button>
            </div>

            <div className="p-6 md:p-8">
              
              {/* --- TAB 1: COTIZADOR --- */}
              {activeTab === 'quote' && (
                <div className="animate-fade-in">
                  <h3 className="text-primary font-bold text-xl mb-4">
                    Estima tu tarifa al instante
                  </h3>
                  
                  <form onSubmit={handleQuote} className="space-y-4">
                    <div className="space-y-3">
                      <div className="relative">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Origen</label>
                        <div className="relative mt-1">
                          <Circle size={16} className="absolute left-3 top-3 text-green-500" />
                          <input
                            type="text"
                            placeholder="Ej: Santiago Centro, Aeropuerto..."
                            className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary outline-none transition"
                            value={quoteInput.origin}
                            onChange={(e) => setQuoteInput({...quoteInput, origin: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Destino</label>
                        <div className="relative mt-1">
                          <MapPin size={18} className="absolute left-3 top-2.5 text-red-500" />
                          <input
                            type="text"
                            placeholder="Ej: Antofagasta, Calama, Norte..."
                            className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary outline-none transition"
                            value={quoteInput.destination}
                            onChange={(e) => setQuoteInput({...quoteInput, destination: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {!quoteResult ? (
                      <button type="submit" className="w-full mt-2 bg-primary hover:bg-[#002244] text-white font-bold py-3 rounded-lg shadow-lg flex justify-center items-center gap-2 transition group">
                        Calcular Tarifa Estimada
                      </button>
                    ) : (
                      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 text-center animate-fade-in-up">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Tarifa Estimada</p>
                        <div className="text-3xl font-extrabold text-primary mb-1">
                          ${quoteResult.amount.toLocaleString('es-CL')}
                        </div>
                        <div className="flex justify-center gap-4 text-xs text-gray-500 mt-2">
                           <span className="flex items-center gap-1"><Car size={12}/> {quoteResult.distance}</span>
                           <span className="flex items-center gap-1"><Clock size={12}/> {quoteResult.time}</span>
                        </div>
                        <div className="mt-4 flex gap-2">
                           <button 
                             type="button" 
                             onClick={() => setQuoteResult(null)}
                             className="flex-1 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition"
                           >
                             Recalcular
                           </button>
                           <button 
                             type="button" 
                             onClick={() => setActiveTab('request')}
                             className="flex-1 py-2 text-sm bg-secondary text-white font-bold rounded-lg hover:bg-orange-600 transition shadow-sm"
                           >
                             Reservar Ahora
                           </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              )}

              {/* --- TAB 2: SOLICITAR (LOGIN) --- */}
              {activeTab === 'request' && (
                <div className="animate-fade-in">
                  {isAuthenticated ? (
                    <div className="text-center py-8">
                       <ShieldCheck className="mx-auto text-green-500 mb-4" size={48} />
                       <h3 className="text-xl font-bold text-gray-800 mb-2">Bienvenido de nuevo</h3>
                       <p className="text-gray-500 mb-6">Ya estás identificado como {user?.fullName}</p>
                       <button 
                         onClick={() => navigate('/client/request')}
                         className="w-full bg-secondary hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-lg transition"
                       >
                         Continuar a Reserva
                       </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-primary font-bold text-xl mb-2">
                        Acceso Clientes
                      </h3>
                      <p className="text-gray-500 text-sm mb-4">
                        Ingresa para gestionar y reservar tus viajes de forma rápida.
                      </p>

                      <form onSubmit={handleLoginAndRequest} className="space-y-4">
                        <div>
                          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email</label>
                          <div className="relative mt-1">
                            <User size={18} className="absolute left-3 top-2.5 text-gray-400" />
                            <input
                              type="email"
                              className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary outline-none transition"
                              placeholder="tu@email.com"
                              value={loginData.email}
                              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Contraseña</label>
                          <div className="relative mt-1">
                            <Lock size={18} className="absolute left-3 top-2.5 text-gray-400" />
                            <input
                              type="password"
                              className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary outline-none transition"
                              placeholder="••••••••"
                              value={loginData.password}
                              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                              required
                            />
                          </div>
                        </div>

                        {loginError && (
                          <div className="text-red-500 text-xs bg-red-50 p-2 rounded border border-red-100">
                            {loginError}
                          </div>
                        )}

                        <button 
                          type="submit" 
                          disabled={isLoggingIn}
                          className="w-full bg-primary hover:bg-[#002244] text-white font-bold py-3 rounded-lg shadow-lg flex justify-center items-center gap-2 transition disabled:opacity-70"
                        >
                          {isLoggingIn ? 'Ingresando...' : 'Ingresar y Reservar'}
                          {!isLoggingIn && <ArrowRight size={20} />}
                        </button>
                        
                        <div className="text-center mt-3">
                          <Link to="/register" className="text-xs text-secondary hover:underline font-medium">
                            ¿No tienes cuenta? Regístrate aquí
                          </Link>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm">
              Soluciones Integrales
            </span>
            <h2 className="text-3xl font-bold text-primary mt-2">Nuestros Servicios</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition border border-gray-100 group hover:-translate-y-1 duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Transporte de Personal</h3>
              <p className="text-gray-600 text-sm mb-6">
                Traslado seguro y puntual para trabajadores y colaboradores hacia faenas o plantas.
              </p>
              <Link
                to="/client/request"
                className="text-secondary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                Solicitar servicio <ArrowRight size={16} />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition border border-gray-100 group hover:-translate-y-1 duration-300">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-white transition">
                <Building2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Servicios Corporativos</h3>
              <p className="text-gray-600 text-sm mb-6">
                Soluciones de transporte exclusivas para empresas con contratos mensuales y
                facturación.
              </p>
              <Link
                to="#"
                className="text-secondary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                Ver clientes <ArrowRight size={16} />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition border border-gray-100 group hover:-translate-y-1 duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition">
                <CalendarCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Viajes Programados</h3>
              <p className="text-gray-600 text-sm mb-6">
                Reserva anticipada y seguimiento de viajes en tiempo real con nuestra App.
              </p>
              <Link
                to="/driver/trips"
                className="text-secondary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                Ver viajes <ArrowRight size={16} />
              </Link>
            </div>

            {/* Service 4 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition border border-gray-100 group hover:-translate-y-1 duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 group-hover:bg-green-600 group-hover:text-white transition">
                <CreditCard size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Pago de Servicios</h3>
              <p className="text-gray-600 text-sm mb-6">
                Paga tus servicios particulares de forma segura mediante nuestra pasarela web.
              </p>
              <Link
                to="#"
                className="text-secondary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                Ir a pagos <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default LandingPage;
