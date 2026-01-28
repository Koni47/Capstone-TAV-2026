// import React from "react";
import PublicNavbar from '../components/layout/PublicNavbar';
import PublicFooter from '../components/layout/PublicFooter';
import { Link, useNavigate } from 'react-router-dom';
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
} from 'lucide-react';

/**
 * Landing Page - Identical to mockups/index.html
 */
const LandingPage = () => {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/client/request');
  };

  return (
    <div className="font-sans flex flex-col min-h-screen">
      <PublicNavbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[650px] flex items-center pt-20 pb-20">
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

          {/* Right Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 transform lg:translate-y-8 border-t-8 border-secondary">
            <h3 className="text-primary font-bold text-xl mb-6 flex items-center gap-2">
              <Car className="text-primary" size={24} />
              Cotiza tu traslado ahora
            </h3>

            <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
              <button className="flex-1 py-2 px-4 rounded-md bg-white text-primary font-bold shadow-sm transition">
                Persona Natural
              </button>
              <button className="flex-1 py-2 px-4 rounded-md text-gray-500 hover:text-primary font-medium transition">
                Empresa / Convenio
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSearch}>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Origen</label>
                  <div className="relative mt-1">
                    <Circle size={16} className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Aeropuerto, Casa..."
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary outline-none"
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Destino</label>
                  <div className="relative mt-1">
                    <MapPin size={18} className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Hotel, Faena..."
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                  Fecha y Hora
                </label>
                <input
                  type="datetime-local"
                  className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary outline-none text-gray-600"
                />
              </div>

              <button className="w-full bg-primary hover:bg-[#002244] text-white font-bold py-3 rounded-lg shadow-lg flex justify-center items-center gap-2 transition group">
                Ver Precios y Disponibilidad
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>

              <p className="text-center text-xs text-gray-400 mt-2">
                Pago seguro con WebPay y Transferencia
              </p>
            </form>
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
