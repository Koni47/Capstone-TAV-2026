import React from 'react';
import PublicNavbar from '../components/layout/PublicNavbar';
import PublicFooter from '../components/layout/PublicFooter';
import {
  ShieldCheck,
  TrendingUp,
  Handshake,
  Mail,
  FileText,
  User,
  Phone,
  Calendar,
  CloudUpload,
  Send,
} from 'lucide-react';

const WorkWithUsPage = () => {
  return (
    <div className="font-sans flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <PublicNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
        {/* Hero Header */}
        <div className="text-center mb-12 relative">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Únete a Nuestro Equipo
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Buscamos profesionales comprometidos con la excelencia y la seguridad. Construye tu
            carrera con el líder en transporte corporativo de la región.
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
                    <ShieldCheck className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Seguridad Primero</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      Estándares mineros de excelencia. Tu seguridad y la de nuestros pasajeros es
                      intransable.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <TrendingUp className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Crecimiento Profesional</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      Capacitación continua y oportunidades reales de ascenso dentro de la compañía.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Handshake className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Estabilidad Laboral</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      Contratos sólidos y beneficios corporativos pensados para ti y tu familia.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Box */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
              <h3 className="text-gray-900 font-bold mb-2">¿Tienes dudas?</h3>
              <p className="text-sm text-gray-500 mb-4">
                Escríbenos directamente a nuestro equipo de Selección.
              </p>
              <a
                href="mailto:seleccion@elloa.cl"
                className="flex items-center gap-2 text-primary font-semibold hover:text-secondary transition"
              >
                <Mail size={18} />
                seleccion@elloa.cl
              </a>
            </div>
          </div>

          {/* Pillar Right: Application Form */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50/50 px-8 py-5">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FileText className="text-secondary" size={24} />
                  Formulario de Postulación
                </h2>
              </div>

              <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                      Nombre Completo
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <User size={20} />
                      </div>
                      <input
                        type="text"
                        placeholder="Ej: Juan Pérez"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Telefono */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                      Teléfono
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Phone size={20} />
                      </div>
                      <input
                        type="tel"
                        placeholder="+56 9 ..."
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Mail size={20} />
                      </div>
                      <input
                        type="email"
                        placeholder="nombre@correo.com"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>
                  {/* Fecha Nac */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                      Fecha de Nacimiento
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Calendar size={20} />
                      </div>
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                    Currículum Vitae
                  </label>
                  <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-colors text-center cursor-pointer group">
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-blue-50 text-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <CloudUpload size={24} />
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        Haz clic o arrastra tu archivo aquí
                      </span>
                      <span className="text-xs text-gray-400">PDF, DOCX (Máx. 5MB)</span>
                    </div>
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                    Presentación / Mensaje
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Cuéntanos por qué quieres postular..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-secondary hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex justify-center items-center gap-2"
                >
                  <span>Enviar Postulación</span>
                  <Send size={18} />
                </button>

                <p className="text-center text-xs text-gray-400 mt-4">
                  Al enviar este formulario aceptas nuestra{' '}
                  <a href="/privacy" className="underline hover:text-primary">
                    Política de Privacidad
                  </a>{' '}
                  de datos.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};

export default WorkWithUsPage;
