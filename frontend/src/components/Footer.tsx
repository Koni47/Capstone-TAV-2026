import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#002244] text-gray-300 border-t-4 border-secondary mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <span className="material-icons text-secondary text-3xl">local_shipping</span>
              <span className="font-bold text-xl tracking-wide">Servicios El Loa</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Líderes en transporte corporativo y privado en la región de Antofagasta. Seguridad, puntualidad y tecnología al servicio de la minería.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-secondary transition text-white">
                <span className="material-icons text-sm">facebook</span>
              </a>
              <a href="https://elloa.cl" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-secondary transition text-white">
                <span className="material-icons text-sm">public</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-secondary transition text-white">
                <span className="material-icons text-sm">photo_camera</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-blue-800 pb-2 inline-block">Navegación</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Inicio</Link></li>
              <li><Link to="/service-request" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Solicitudes</Link></li>
              <li><Link to="/companies" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Clientes</Link></li>
              <li><Link to="/portal-choferes" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Portal Choferes</Link></li>
              <li><Link to="/contacto" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Contáctanos</Link></li>
              <li><Link to="/trabaja-nosotros" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Trabaja con Nosotros</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-blue-800 pb-2 inline-block">Contacto Central</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="material-icons text-secondary text-sm mt-1">location_on</span>
                <span>Av. Granaderos 2550, Of. 304<br />Calama, Región de Antofagasta</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-icons text-secondary text-sm">phone</span>
                <span>+56 55 234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-icons text-secondary text-sm">email</span>
                <span>operaciones@elloa.cl</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-icons text-secondary text-sm">access_time</span>
                <span>24/7 Soporte en Ruta</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-blue-800 pb-2 inline-block">Descarga la App</h3>
            <p className="text-xs text-gray-400 mb-4">Gestiona tus viajes y monitorea la ruta en tiempo real.</p>
            
            <div className="space-y-3">
              <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-2 flex items-center gap-3 transition">
                <span className="material-icons text-3xl">apple</span>
                <div className="text-left">
                  <div className="text-[10px] uppercase">Disponible en</div>
                  <div className="font-bold text-sm text-white">App Store</div>
                </div>
              </button>
              <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-2 flex items-center gap-3 transition">
                <span className="material-icons text-3xl">android</span>
                <div className="text-left">
                  <div className="text-[10px] uppercase">Disponible en</div>
                  <div className="font-bold text-sm text-white">Google Play</div>
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-[#001a33] py-6 border-t border-blue-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-gray-500 text-center md:text-left">
                &copy; 2026 Servicios de Transporte El Loa SpA. Todos los derechos reservados.
            </div>
            <div className="flex gap-6 text-xs text-gray-400 font-medium">
                <Link to="/terms" className="hover:text-white transition">Términos y Condiciones</Link>
                <Link to="/privacy" className="hover:text-white transition">Política de Privacidad</Link>
                <Link to="/complaints" className="hover:text-white transition">Portal de Denuncias</Link>
            </div>
        </div>
      </div>
    </footer>
  )
}
