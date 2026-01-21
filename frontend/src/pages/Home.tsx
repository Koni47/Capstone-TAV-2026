import React from 'react'
import { site } from '../mocks/data'
import '../index.css'

export default function Home() {
  return (
    <div className="min-h-screen bg-surface text-gray-800 font-sans">
      <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center text-primary font-bold text-xl">EL</div>
              <span className="font-bold text-xl tracking-wide">{site.companyName}</span>
            </div>
            <div className="hidden md:flex space-x-6">
              {site.nav.map((n) => (
                <a key={n.href} href={n.href} className={`text-secondary font-bold border-b-2 border-secondary px-1 pb-1`}>{n.label}</a>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3">
              <a href="/login" className="text-sm font-semibold hover:text-gray-300">Iniciar sesión</a>
              <a href="/register" className="bg-secondary hover:bg-orange-600 text-white text-sm font-bold py-2 px-5 rounded-md transition shadow-md">Registrarse</a>
            </div>
            <div className="md:hidden">
              <button className="text-white hover:text-secondary">
                <span className="material-icons text-3xl">menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[650px] flex items-center pt-20 pb-20">
        <div className="absolute inset-0 w-full h-full bg-[url('/assets/img/hero.jpg')] bg-cover bg-center opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#002244]/95 via-[#003366]/80 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-semibold text-[#FF6600]">
              <span className="material-icons text-sm">verified_user</span> Estándar de Seguridad Minero
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
              {site.hero.title} <br />
              <span className="text-gray-200 font-medium text-3xl block mt-2">{site.hero.subtitle}</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-lg leading-relaxed">{site.hero.lead}</p>

            <div className="flex items-center gap-6 pt-4 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
              {site.features.map((f) => (
                <div className="flex flex-col items-center" key={f.title}>
                  <span className="material-icons text-3xl mb-1">{f.icon}</span>
                  <span className="text-xs uppercase tracking-widest">{f.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 transform lg:translate-y-8 border-t-8 border-[#FF6600]">
            <h3 className="text-primary font-bold text-xl mb-6 flex items-center gap-2">
              <span className="material-icons">directions_car</span> Cotiza tu traslado ahora
            </h3>

            <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
              <button className="flex-1 py-2 px-4 rounded-md bg-white text-primary font-bold shadow-sm transition">Persona Natural</button>
              <button className="flex-1 py-2 px-4 rounded-md text-gray-500 hover:text-primary font-medium transition">Empresa / Convenio</button>
            </div>

            <form className="space-y-4">
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

              <button className="w-full bg-[#003366] hover:bg-[#002244] text-white font-bold py-3 rounded-lg shadow-lg flex justify-center items-center gap-2 transition group">
                {site.hero.cta}
                <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              <p className="text-center text-xs text-gray-400 mt-2">Pago seguro con WebPay y Transferencia</p>
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm">Soluciones Integrales</span>
            <h2 className="text-3xl font-bold text-primary mt-2">Nuestros Servicios</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {site.services.map((s) => (
              <div key={s.title} className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition border border-gray-100 group hover:-translate-y-1 duration-300">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition">
                  <span className="material-icons text-3xl">{s.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{s.title}</h3>
                <p className="text-gray-600 text-sm mb-6">{s.desc}</p>
                <a href={s.href} className="text-secondary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">Ver más <span className="material-icons text-sm">arrow_forward</span></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#002244] text-gray-300 border-t-4 border-secondary mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <span className="material-icons text-secondary text-3xl">local_shipping</span>
                <span className="font-bold text-xl tracking-wide">{site.companyName}</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">Líderes en transporte corporativo y privado en la región de Antofagasta. Seguridad, puntualidad y tecnología al servicio de la minería.</p>
            </div>

            <div>
              <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-blue-800 pb-2 inline-block">Navegación</h3>
              <ul className="space-y-3 text-sm">
                {site.nav.map((n) => (
                  <li key={n.href}><a href={n.href} className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> {n.label}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-blue-800 pb-2 inline-block">Contacto Central</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3"><span className="material-icons text-secondary text-sm mt-1">location_on</span><span>{site.contact.address}</span></li>
                <li className="flex items-center gap-3"><span className="material-icons text-secondary text-sm">phone</span><span>{site.contact.phone}</span></li>
                <li className="flex items-center gap-3"><span className="material-icons text-secondary text-sm">email</span><span>{site.contact.email}</span></li>
                <li className="flex items-center gap-3"><span className="material-icons text-secondary text-sm">access_time</span><span>24/7 Soporte en Ruta</span></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-blue-800 pb-2 inline-block">Descarga la App</h3>
              <p className="text-xs text-gray-400 mb-4">Gestiona tus viajes y monitorea la ruta en tiempo real.</p>
              <div className="space-y-3">
                <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-2 flex items-center gap-3 transition">
                  <span className="material-icons text-3xl">apple</span>
                  <div className="text-left"><div className="text-[10px] uppercase">Disponible en</div><div className="font-bold text-sm text-white">App Store</div></div>
                </button>
                <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-2 flex items-center gap-3 transition">
                  <span className="material-icons text-3xl">android</span>
                  <div className="text-left"><div className="text-[10px] uppercase">Disponible en</div><div className="font-bold text-sm text-white">Google Play</div></div>
                </button>
              </div>
            </div>

          </div>
        </div>

        <div className="bg-[#001a33] py-6 border-t border-blue-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-gray-500 text-center md:text-left">&copy; 2026 {site.companyName} SpA. Todos los derechos reservados.</div>
            <div className="flex gap-6 text-xs text-gray-400 font-medium">
              {[
                { label: 'Iniciar sesión', href: '/login' },
                { label: 'Registrarse', href: '/register' },
                ...site.footerLinks.filter(l => l.href !== '/login' && l.href !== '/register')
              ].map((l) => (
                <a key={l.href} href={l.href} className="hover:text-white transition">{l.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
