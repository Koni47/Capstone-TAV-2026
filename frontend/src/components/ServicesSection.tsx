import React from 'react'
import { Link } from 'react-router-dom'

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm">Soluciones Integrales</span>
          <h2 className="text-3xl font-bold text-primary mt-2">Nuestros Servicios</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition border border-gray-100 group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition">
              <span className="material-icons text-3xl">groups</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Transporte de Personal</h3>
            <p className="text-gray-600 text-sm mb-6">Traslado seguro y puntual para trabajadores y colaboradores hacia faenas o plantas.</p>
            <Link to="/service-request" className="text-secondary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              Solicitar servicio <span className="material-icons text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition border border-gray-100 group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-white transition">
              <span className="material-icons text-3xl">apartment</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Servicios Corporativos</h3>
            <p className="text-gray-600 text-sm mb-6">Soluciones de transporte exclusivas para empresas con contratos mensuales y facturación.</p>
            <Link to="/companies" className="text-secondary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              Ver clientes <span className="material-icons text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition border border-gray-100 group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition">
              <span className="material-icons text-3xl">event_available</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Viajes Programados</h3>
            <p className="text-gray-600 text-sm mb-6">Reserva anticipada y seguimiento de viajes en tiempo real con nuestra App.</p>
            <Link to="/trips" className="text-secondary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              Ver viajes <span className="material-icons text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition border border-gray-100 group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 group-hover:bg-green-600 group-hover:text-white transition">
              <span className="material-icons text-3xl">credit_card</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Pago de Servicios</h3>
            <p className="text-gray-600 text-sm mb-6">Paga tus servicios particulares de forma segura mediante nuestra pasarela web.</p>
            <Link to="/payment" className="text-secondary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              Ir a pagos <span className="material-icons text-sm">arrow_forward</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
