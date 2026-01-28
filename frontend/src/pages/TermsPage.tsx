import React from 'react';
import PublicNavbar from '../components/layout/PublicNavbar';
import PublicFooter from '../components/layout/PublicFooter';
import {
  Gavel,
  History,
  ClipboardCheck,
  Calendar,
  CreditCard,
  Moon,
  ShieldCheck,
  RotateCcw,
  CheckCircle,
  Printer,
  Download,
} from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="font-sans flex flex-col min-h-screen bg-gray-50">
      <PublicNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-4">
            <Gavel className="text-primary" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Por favor, lee atentamente los siguientes términos antes de utilizar nuestros servicios
            de transporte corporativo y privado.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest bg-white px-4 py-1.5 rounded-full border border-gray-200 shadow-sm">
            <History size={14} />
            Última actualización: Enero 2026
          </div>
        </div>

        {/* Document Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
          {/* Top decorative bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-600 to-secondary"></div>

          <div className="p-8 md:p-12 space-y-12">
            {/* Item 1 */}
            <section className="flex gap-5 md:gap-8 group">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-primary group-hover:text-white text-primary flex items-center justify-center transition-all duration-300 shadow-sm border border-blue-100">
                  <ClipboardCheck size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-3">
                  1. Solicitud de Servicios
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  El usuario declara que la información proporcionada en la solicitud de transporte
                  es <strong className="text-gray-800">verídica y completa</strong>. La empresa se
                  reserva el derecho de rechazar solicitudes que presenten inconsistencias, datos
                  incorrectos o información insuficiente para la correcta prestación del servicio.
                </p>
              </div>
            </section>

            {/* Item 2 */}
            <section className="flex gap-5 md:gap-8 group">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-orange-50 group-hover:bg-secondary group-hover:text-white text-secondary flex items-center justify-center transition-all duration-300 shadow-sm border border-orange-100">
                  <Calendar size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  2. Confirmación y Modificación
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Una vez enviada la solicitud, el usuario recibirá una confirmación digital.
                  Cualquier modificación o cancelación debe ser informada con al menos{' '}
                  <strong className="text-gray-800">2 horas de anticipación</strong> al horario
                  programado a través de la plataforma o nuestros canales oficiales.
                </p>
              </div>
            </section>

            {/* Item 3 */}
            <section className="flex gap-5 md:gap-8 group">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-primary group-hover:text-white text-primary flex items-center justify-center transition-all duration-300 shadow-sm border border-blue-100">
                  <CreditCard size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">3. Tarifas y Pagos</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  El valor del servicio se calcula automáticamente en base a la distancia y horario
                  seleccionados. El usuario acepta pagar el monto total indicado{' '}
                  <strong className="text-gray-800">antes de la prestación del servicio</strong>,
                  utilizando los medios de pago seguros habilitados en la plataforma.
                </p>
              </div>
            </section>

            {/* Item 4 */}
            <section className="flex gap-5 md:gap-8 group">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-primary group-hover:text-white text-primary flex items-center justify-center transition-all duration-300 shadow-sm border border-blue-100">
                  <Moon size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">4. Recargos Nocturnos</h3>
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-primary">
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    Los servicios solicitados entre las{' '}
                    <strong className="text-primary">22:01 y las 06:59 horas</strong> tendrán un
                    recargo adicional automático del 5% sobre la tarifa base, debido a la normativa
                    laboral vigente.
                  </p>
                </div>
              </div>
            </section>

            {/* Item 5 */}
            <section className="flex gap-5 md:gap-8 group">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-primary group-hover:text-white text-primary flex items-center justify-center transition-all duration-300 shadow-sm border border-blue-100">
                  <ShieldCheck size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">5. Responsabilidad</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Servicios El Loa se compromete a la seguridad de los pasajeros. No obstante, la
                  empresa no se hace responsable por retrasos causados exclusivamente por fuerza
                  mayor, condiciones climáticas severas, cortes de ruta no programados u otros
                  factores externos fuera de nuestro control.
                </p>
              </div>
            </section>

            {/* Item 6 */}
            <section className="flex gap-5 md:gap-8 group">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-primary group-hover:text-white text-primary flex items-center justify-center transition-all duration-300 shadow-sm border border-blue-100">
                  <RotateCcw size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  6. Reembolsos y Cancelaciones
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  En caso de cancelación con la debida anticipación (ver punto 2), se podrá
                  solicitar el reembolso del pago realizado. No se realizarán devoluciones por
                  cancelaciones fuera del plazo establecido o por &quot;no show&quot; (ausencia del
                  pasajero).
                </p>
              </div>
            </section>

            {/* Item 7 */}
            <section className="flex gap-5 md:gap-8 group">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-green-50 group-hover:bg-green-600 group-hover:text-white text-green-600 flex items-center justify-center transition-all duration-300 shadow-sm border border-green-100">
                  <CheckCircle size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">7. Aceptación</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Al solicitar y pagar el servicio a través de nuestra plataforma web o móvil, el
                  usuario declara haber leído, comprendido y aceptado estos términos y condiciones
                  en su totalidad.
                </p>
              </div>
            </section>
          </div>

          {/* Footer Card */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              ¿Tienes dudas sobre estos términos?{' '}
              <a href="/contact" className="text-secondary font-bold hover:underline">
                Contáctanos
              </a>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-primary transition shadow-sm text-sm font-medium"
              >
                <Printer size={18} />
                Imprimir
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-white bg-primary rounded-lg hover:bg-blue-900 transition shadow-md text-sm font-medium">
                <Download size={18} />
                Descargar PDF
              </button>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};

export default TermsPage;
