import PublicNavbar from "../components/layout/PublicNavbar";
import PublicFooter from "../components/layout/PublicFooter";
import { Link } from "react-router-dom";
import { Shield, FolderOpen, Scale, Cookie, ArrowRight, CheckCircle2 } from "lucide-react";

const PrivacyPage = () => {
  return (
    <div className="font-sans flex flex-col min-h-screen bg-gray-50">
      <PublicNavbar />

      {/* Header Banner */}
      <div className="bg-[#002244] text-white py-16 relative overflow-hidden">
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')" }}
        ></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Política de Privacidad</h1>
            <p className="text-blue-200 text-lg">Transparencia y seguridad en el manejo de tu información personal.</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            
            <div className="p-8 md:p-12 space-y-8">
                
                {/* Last Updated */}
                <div className="text-sm text-gray-500 border-b border-gray-100 pb-6">
                    Última actualización: <span className="font-semibold text-primary">21 de Enero de 2026</span>
                </div>

                {/* Section 1 */}
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                            <Shield size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">1. Compromiso de Seguridad</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        En Servicios de Transporte El Loa SpA ("nosotros", "nuestro"), nos comprometemos a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y salvaguardamos su información cuando visita nuestro sitio web o utiliza nuestros servicios de transporte corporativo y privado.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Nos adherimos a los estándares más altos de seguridad de la información, utilizando encriptación SSL y protocolos seguros para proteger sus datos durante la transmisión y el almacenamiento.
                    </p>
                </section>

                {/* Section 2 */}
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-secondary">
                            <FolderOpen size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">2. Información que Recopilamos</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-3">
                        Podemos recopilar información sobre usted de diversas maneras, incluyendo:
                    </p>
                    <ul className="list-disc list-outside ml-5 space-y-2 text-gray-600">
                        <li><strong className="text-gray-800">Datos Personales:</strong> Nombre, dirección de correo electrónico, número de teléfono y dirección física cuando se registra para nuestros servicios.</li>
                        <li><strong className="text-gray-800">Datos del Viaje:</strong> Ubicación de origen y destino, horarios preferidos y preferencias de vehículos para la prestación del servicio.</li>
                        <li><strong className="text-gray-800">Datos Financieros:</strong> Información relacionada con el método de pago (no almacenamos números de tarjetas de crédito completos, estos son procesados por proveedores de pago seguros).</li>
                        <li><strong className="text-gray-800">Datos de Geolocalización:</strong> Podemos solicitar acceso o permiso para rastrear información basada en la ubicación desde su dispositivo móvil, ya sea de forma continua o mientras utiliza la aplicación, para proporcionar servicios basados en la ubicación.</li>
                    </ul>
                </section>

                {/* Section 3 */}
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                            <Scale size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">3. Uso de su Información</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-3">
                        Utilizamos la información recopilada para:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <CheckCircle2 size={18} className="text-primary mt-1" />
                            <span className="text-sm text-gray-700">Gestionar sus reservas y viajes.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                             <CheckCircle2 size={18} className="text-primary mt-1" />
                            <span className="text-sm text-gray-700">Procesar pagos y reembolsos.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                             <CheckCircle2 size={18} className="text-primary mt-1" />
                            <span className="text-sm text-gray-700">Enviar notificaciones sobre el estado del servicio.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                             <CheckCircle2 size={18} className="text-primary mt-1" />
                            <span className="text-sm text-gray-700">Mejorar la eficiencia de nuestras rutas.</span>
                        </div>
                    </div>
                </section>

                {/* Section 4 */}
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-secondary">
                            <Cookie size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">4. Cookies y Tecnologías de Rastreo</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        Utilizamos cookies, balizas web y otras tecnologías de rastreo para personalizar su experiencia y mejorar nuestros servicios. Usted puede configurar su navegador para rechazar todas o algunas cookies del navegador, o para avisarle cuando los sitios web instalen o accedan a cookies.
                    </p>
                </section>

                {/* Contact Box */}
                <div className="bg-gradient-to-r from-[#003366] to-[#004080] rounded-lg p-6 text-white mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold mb-2">¿Tiene dudas sobre su privacidad?</h3>
                        <p className="text-blue-200 text-sm">Nuestro equipo de protección de datos está disponible para resolver sus consultas.</p>
                    </div>
                    <Link to="/contact" className="flex-shrink-0 bg-secondary hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition flex items-center gap-2">
                        <span>Contáctanos</span>
                        <ArrowRight size={18} />
                    </Link>
                </div>

            </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};

export default PrivacyPage;
