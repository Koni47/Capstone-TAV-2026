import React from 'react'

export default function WorkWithUs() {
  return (
    <div className="font-sans bg-gray-50 text-gray-800 flex flex-col min-h-screen">
      <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center text-primary font-bold text-xl">EL</div>
              <span className="font-bold text-xl tracking-wide">Servicios El Loa</span>
            </div>

            <div className="hidden md:flex space-x-6">
              <a href="/" className="hover:text-gray-300 transition px-1 pb-1">Inicio</a>
              <a href="/service-request" className="hover:text-gray-300 transition px-1 pb-1">Solicitudes</a>
              <a href="/trips" className="hover:text-gray-300 transition px-1 pb-1">Viajes</a>
              <a href="/vehicles" className="hover:text-gray-300 transition px-1 pb-1">Flota</a>
              <a href="/companies" className="hover:text-gray-300 transition px-1 pb-1">Clientes</a>
              <a href="/trabaja-nosotros" className="text-secondary font-bold border-b-2 border-secondary px-1 pb-1">Trabaja con Nosotros</a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a href="/login" className="text-sm font-semibold hover:text-gray-300">Iniciar sesión</a>
              <a href="/register" className="bg-secondary hover:bg-orange-600 text-white text-sm font-bold py-2 px-5 rounded-md transition shadow-md">
                Registrarse
              </a>
            </div>

            <div className="md:hidden">
              <button className="text-white hover:text-secondary">
                <span className="material-icons text-3xl">menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        {/* Hero Header */}
        <div className="text-center mb-12 relative">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Únete a Nuestro Equipo</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Buscamos profesionales comprometidos con la excelencia y la seguridad. Construye tu carrera con el líder en transporte corporativo de la región.
          </p>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent -z-10"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Pillar Left: Benefits/Culture */}
          <div className="w-full lg:w-5/12 space-y-8">
            <div className="bg-primary rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
              {/* Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>

              <h2 className="text-2xl font-bold mb-6 relative z-10">¿Por qué El Loa?</h2>
              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <span className="material-icons text-secondary">verified_user</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Seguridad Primero</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">Estándares mineros de excelencia. Tu seguridad y la de nuestros pasajeros es intransable.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <span className="material-icons text-secondary">trending_up</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Crecimiento Profesional</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">Capacitación continua y oportunidades reales de ascenso dentro de la compañía.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <span className="material-icons text-secondary">handshake</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Estabilidad Laboral</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">Contratos sólidos y beneficios corporativos pensados para ti y tu familia.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Box */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
              <h3 className="text-gray-900 font-bold mb-2">¿Tienes dudas?</h3>
              <p className="text-sm text-gray-500 mb-4">Escríbenos directamente a nuestro equipo de Selección.</p>
              <a href="mailto:seleccion@elloa.cl" className="flex items-center gap-2 text-primary font-semibold hover:text-secondary transition">
                <span className="material-icons text-sm">email</span>
                seleccion@elloa.cl
              </a>
            </div>
          </div>

          {/* Pillar Right: Application Form */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50/50 px-8 py-5">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="material-icons text-secondary">description</span>
                  Formulario de Postulación
                </h2>
              </div>

              <form className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Nombre Completo</label>
                    <div className="relative">
                      <span className="material-icons absolute left-3 top-3 text-gray-400 text-xl">person</span>
                      <input type="text" placeholder="Ej: Juan Pérez" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                    </div>
                  </div>

                  {/* Telefono */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Teléfono</label>
                    <div className="relative">
                      <span className="material-icons absolute left-3 top-3 text-gray-400 text-xl">phone</span>
                      <input type="tel" placeholder="+56 9 ..." className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Correo Electrónico</label>
                    <div className="relative">
                      <span className="material-icons absolute left-3 top-3 text-gray-400 text-xl">email</span>
                      <input type="email" placeholder="nombre@correo.com" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                    </div>
                  </div>
                  {/* Fecha Nac */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Fecha de Nacimiento</label>
                    <div className="relative">
                      <span className="material-icons absolute left-3 top-3 text-gray-400 text-xl">calendar_today</span>
                      <input type="date" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Currículum Vitae</label>
                  <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-colors text-center cursor-pointer group">
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-blue-50 text-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="material-icons">cloud_upload</span>
                      </div>
                      <span className="text-sm font-medium text-gray-600">Haz clic o arrastra tu archivo aquí</span>
                      <span className="text-xs text-gray-400">PDF, DOCX (Máx. 5MB)</span>
                    </div>
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Presentación / Mensaje</label>
                  <textarea rows={3} placeholder="Cuéntanos por qué quieres postular..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"></textarea>
                </div>

                {/* Submit */}
                <button type="submit" className="w-full bg-secondary hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex justify-center items-center gap-2">
                  <span>Enviar Postulación</span>
                  <span className="material-icons text-sm">send</span>
                </button>

                <p className="text-center text-xs text-gray-400 mt-4">
                  Al enviar este formulario aceptas nuestra <a href="/privacy" className="underline hover:text-primary">Política de Privacidad</a> de datos.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>

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
                <a href="https://facebook.com" target="_blank" className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-secondary transition text-white">
                  <span className="material-icons text-sm">facebook</span>
                </a>
                <a href="https://elloa.cl" target="_blank" className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-secondary transition text-white">
                  <span className="material-icons text-sm">public</span>
                </a>
                <a href="https://instagram.com" target="_blank" className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-secondary transition text-white">
                  <span className="material-icons text-sm">photo_camera</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-blue-800 pb-2 inline-block">Navegación</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Inicio</a></li>
                <li><a href="/service-request" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Solicitudes</a></li>
                <li><a href="/companies" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Clientes</a></li>
                <li><a href="/portal" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Portal Choferes</a></li>
                <li><a href="/contact" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Contáctanos</a></li>
                <li><a href="/trabaja-nosotros" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Trabaja con Nosotros</a></li>
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
              <a href="/terms" className="hover:text-white transition">Términos y Condiciones</a>
              <a href="/privacy" className="hover:text-white transition">Política de Privacidad</a>
              <a href="/complaints" className="hover:text-white transition">Portal de Denuncias</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}