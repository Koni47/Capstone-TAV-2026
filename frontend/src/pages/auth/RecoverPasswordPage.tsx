import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, ArrowLeft } from 'lucide-react';

const RecoverPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recovering password for:', email);
    alert('Si el correo existe en nuestro sistema, recibirás las instrucciones en breve.');
  };

  return (
    <div className="bg-gray-900 font-sans flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
          alt="Road Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-black/60"></div>
      </div>

      {/* Card Container */}
      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-primary font-bold text-3xl shadow-2xl ring-4 ring-white/10">
            EL
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 backdrop-blur-sm relative overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Recuperar Acceso</h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Ingresa tu correo electrónico registrado y te enviaremos instrucciones para
              restablecer tu contraseña.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 pl-1">
                Correo Electrónico
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-secondary transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="nombre@empresa.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all duration-200 shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-blue-900 text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>Enviar Enlace de Recuperación</span>
              <Send size={16} />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-primary transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Volver al Inicio de Sesión
            </Link>
          </div>
        </div>

        <div className="text-center mt-8 text-white/40 text-xs">
          &copy; 2026 Servicios El Loa SpA. Todos los derechos reservados.
        </div>
      </div>
    </div>
  );
};

export default RecoverPasswordPage;
