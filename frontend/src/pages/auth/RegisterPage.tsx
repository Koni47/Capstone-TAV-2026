import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Lock,
  ArrowRight,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth.types';

// Schema de validación
const registerSchema = z
  .object({
    fullName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    rut: z.string().min(8, 'RUT inválido'), // Validación básica
    phone: z.string().min(8, 'Teléfono inválido'),
    email: z.string().email('Correo electrónico inválido'),
    address: z.string().min(5, 'Dirección requerida'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string(),
    terms: z.literal(true, {
      errorMap: () => ({ message: 'Debes aceptar los términos y condiciones' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    try {
      // Adaptamos los datos para el servicio de autenticación
      // Nota: El backend actual podría no aceptar todos los campos aún,
      // pero los enviamos o procesamos según corresponda.
      await registerAuth({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        role: UserRole.CLIENT, // Por defecto registro de cliente
      });
      navigate('/client/request'); // o dashboard correspondiente
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Register Error:', err);
      setServerError('Ocurrió un error al registrarse. Intente nuevamente.');
    }
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen flex text-gray-800 selection:bg-secondary selection:text-white">
      {/* --- Lado Izquierdo: Branding (Visible en pantallas grandes) --- */}
      <div className="hidden lg:flex w-full lg:w-5/12 bg-[#001a33] relative justify-center items-center overflow-hidden">
        {/* Imagen de fondo */}
        <img
          src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2071&auto=format&fit=crop"
          alt="Ruta del Desierto"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
        />

        {/* Gradiente Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-blue-900/90 mix-blend-multiply"></div>

        {/* Contenido Branding */}
        <div className="relative z-10 p-12 text-white max-w-lg">
          <div className="mb-8 flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-primary font-bold text-2xl shadow-lg">
              EL
            </div>
            <span className="text-3xl font-bold tracking-wide">Servicios El Loa</span>
          </div>

          <h2 className="text-3xl font-bold mb-6 leading-tight text-white">
            Únete a nuestra red de transporte de primer nivel.
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-8">
            Registra tu cuenta para gestionar solicitudes de transporte, consultar estados de flota
            y acceder a reportes detallados.
          </p>

          <ul className="space-y-4 text-blue-100/90">
            <li className="flex items-center gap-3">
              <CheckCircle className="text-secondary" size={24} />
              <span>Acceso a monitoreo en tiempo real</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-secondary" size={24} />
              <span>Gestión centralizada de facturación</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-secondary" size={24} />
              <span>Soporte dedicado para empresas</span>
            </li>
          </ul>
        </div>

        {/* Footer Izquierdo */}
        <div className="absolute bottom-8 left-12 text-xs text-blue-200/60 font-medium">
          &copy; 2026 Servicios El Loa SpA.
        </div>
      </div>

      {/* --- Lado Derecho: Formulario de Registro --- */}
      <div className="w-full lg:w-7/12 flex flex-col justify-center items-center p-6 lg:p-12 bg-white relative overflow-y-auto h-screen">
        {/* Botón Volver Absoluto */}
        <Link
          to="/"
          className="absolute top-6 right-6 lg:top-10 lg:right-10 text-gray-400 hover:text-primary transition flex items-center gap-2 text-sm font-medium group z-20"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">
            Volver al inicio
          </span>
          <ArrowRight size={18} />
        </Link>

        <div className="w-full max-w-lg my-auto">
          {/* Cabecera Mobile (Logo) */}
          <div className="lg:hidden flex justify-center mb-6">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-md">
              EL
            </div>
          </div>

          {/* Título Formulario */}
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Cuenta</h1>
            <p className="text-gray-500">Completa tus datos para comenzar.</p>
          </div>

          {serverError && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Grid de Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Nombre */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Nombre Completo / Razón Social
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-3 top-3 text-gray-400 group-focus-within:text-primary transition-colors"
                    size={20}
                  />
                  <input
                    {...register('fullName')}
                    type="text"
                    placeholder="Ej: Juan Pérez o Empresa Ltda."
                    className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>
                )}
              </div>

              {/* RUT */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">RUT</label>
                <div className="relative group">
                  <CreditCard
                    className="absolute left-3 top-3 text-gray-400 group-focus-within:text-primary transition-colors"
                    size={20}
                  />
                  <input
                    {...register('rut')}
                    type="text"
                    placeholder="Ej: 12.345.678-9"
                    className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border ${errors.rut ? 'border-red-500' : 'border-gray-200'} rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all`}
                  />
                </div>
                {errors.rut && <p className="mt-1 text-xs text-red-500">{errors.rut.message}</p>}
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
                <div className="relative group">
                  <Phone
                    className="absolute left-3 top-3 text-gray-400 group-focus-within:text-primary transition-colors"
                    size={20}
                  />
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="+56 9 ..."
                    className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-3 top-3 text-gray-400 group-focus-within:text-primary transition-colors"
                    size={20}
                  />
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="nombre@ejemplo.com"
                    className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Dirección */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Dirección</label>
                <div className="relative group">
                  <MapPin
                    className="absolute left-3 top-3 text-gray-400 group-focus-within:text-primary transition-colors"
                    size={20}
                  />
                  <input
                    {...register('address')}
                    type="text"
                    placeholder="Ej: Av. Granaderos 1234, Calama"
                    className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border ${errors.address ? 'border-red-500' : 'border-gray-200'} rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all`}
                  />
                </div>
                {errors.address && (
                  <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>
                )}
              </div>

              {/* Passwords */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
                <div className="relative group">
                  <Lock
                    className="absolute left-3 top-3 text-gray-400 group-focus-within:text-primary transition-colors"
                    size={20}
                  />
                  <input
                    {...register('password')}
                    type="password"
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all`}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirmar</label>
                <div className="relative group">
                  <Lock
                    className="absolute left-3 top-3 text-gray-400 group-focus-within:text-primary transition-colors"
                    size={20}
                  />
                  <input
                    {...register('confirmPassword')}
                    type="password"
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* Términos */}
            <div className="mt-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    {...register('terms', {
                      setValueAs: (v) => v === true || v === 'true', // Handle string/boolean
                    })}
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700">
                    Acepto los{' '}
                    <Link
                      to="/terms"
                      className="text-primary hover:text-secondary font-bold hover:underline"
                    >
                      términos y condiciones
                    </Link>
                  </label>
                </div>
              </div>
              {errors.terms && <p className="mt-1 text-xs text-red-500">{errors.terms.message}</p>}
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:-translate-y-0.5 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} /> Registrando...
                </>
              ) : (
                'Crear mi cuenta'
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="font-bold text-primary hover:text-secondary transition">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
