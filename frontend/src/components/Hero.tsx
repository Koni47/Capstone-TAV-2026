import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()
  const [clientType, setClientType] = useState<'person' | 'company'>('person')

  return (
    <section className="relative min-h-[650px] flex items-center pt-20 pb-20">
      <img
        src="/assets/img/hero.jpg"
        alt="Vista Pasajero Carretera"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#002244]/95 via-[#003366]/80 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center">

        <div className="text-white space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-semibold text-[#FF6600]">
            <span className="material-icons text-sm">verified_user</span> Estándar de Seguridad en Transporte
          </div>

          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
            Viaja seguro. <br />
            <span className="text-gray-200 font-medium text-3xl block mt-2">Ya seas una gran empresa o un particular.</span>
          </h1>

          <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
            Llevamos la excelencia operativa de la minería a tus traslados personales. Aeropuerto, turismo o faena, llegamos donde necesites.
          </p>

          <div className="flex items-center gap-6 pt-4 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex flex-col items-center">
              <span className="material-icons text-3xl mb-1">gps_fixed</span>
              <span className="text-xs uppercase tracking-widest">GPS 24/7</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-icons text-3xl mb-1">airline_seat_recline_extra</span>
              <span className="text-xs uppercase tracking-widest">Confort</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-icons text-3xl mb-1">receipt_long</span>
              <span className="text-xs uppercase tracking-widest">Facturación</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 transform lg:translate-y-8 border-t-8 border-[#FF6600]">
          <h3 className="text-primary font-bold text-xl mb-6 flex items-center gap-2">
            <span className="material-icons">directions_car</span> Cotiza tu traslado ahora
          </h3>

          <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
            <button 
              onClick={() => setClientType('person')}
              className={`flex-1 py-2 px-4 rounded-md font-bold shadow-sm transition ${clientType === 'person' ? 'bg-white text-primary' : 'text-gray-500 hover:text-primary font-medium'}`}
            >
              Persona Natural
            </button>
            <button 
              onClick={() => setClientType('company')}
              className={`flex-1 py-2 px-4 rounded-md font-bold shadow-sm transition ${clientType === 'company' ? 'bg-white text-primary' : 'text-gray-500 hover:text-primary font-medium'}`}
            >
              Empresa / Convenio
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/service-request'); }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Origen</label>
                <div className="relative mt-1">
                  <span className="material-icons absolute left-3 top-2.5 text-gray-400 text-sm">trip_origin</span>
                  <input type="text" placeholder="Aeropuerto, Casa..." className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6600] outline-none" />
                </div>
              </div>
              <div className="relative">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Destino</label>
                <div className="relative mt-1">
                  <span className="material-icons absolute left-3 top-2.5 text-gray-400 text-sm">location_on</span>
                  <input type="text" placeholder="Hotel, Faena..." className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6600] outline-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Fecha y Hora</label>
              <input type="datetime-local" className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6600] outline-none text-gray-600" />
            </div>

            <button type="submit" className="w-full bg-[#003366] hover:bg-[#002244] text-white font-bold py-3 rounded-lg shadow-lg flex justify-center items-center gap-2 transition group">
              Ver Precios y Disponibilidad
              <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>

            <p className="text-center text-xs text-gray-400 mt-2">
              Pago seguro con WebPay y Transferencia
            </p>
          </form>
        </div>

      </div>
    </section>
  )
}
