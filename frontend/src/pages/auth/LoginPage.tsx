import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Headphones, 
  LogIn, 
  IdCard, 
  ChevronDown 
} from "lucide-react";
import { UserRole } from "../../types/auth.types";

// Schema de validación
const loginSchema = z.object({
  email: z.string().email("El correo electrónico no es válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
  role: z.string().optional(), // Campo opcional/visual para cumplir con el mockup
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { login, isAuthenticated, user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Redirección si ya está autenticado
  if (isAuthenticated && user) {
    switch (user.role) {
      case UserRole.ADMIN: return <Navigate to="/admin/dashboard" />;
      case UserRole.DRIVER: return <Navigate to="/driver/trips" />;
      case UserRole.CLIENT: return <Navigate to="/client/request" />;
      default: return <Navigate to="/" />;
    }
  }

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try {
      // El rol seleccionado en el UI es visual; el backend determina el rol real.
      await login({ email: data.email, password: data.password });
    } catch (err: any) {
        console.error("Login Error Full Object:", err);
        if (err.response?.status === 401) {
             setError("Credenciales incorrectas.");
        } else if (err.response?.status === 404) {
             setError(`Ruta no encontrada (404). Verifique la URL de la API. Intentó conectar a: ${err.config?.baseURL}${err.config?.url}`);
        } else {
             setError(err.response?.data?.message || "Error al conectar con el servidor.");
        }
    }
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen flex text-gray-800 selection:bg-secondary selection:text-white">
      
      {/* --- Lado Izquierdo: Imagen Corporativa --- */}
      <div className="hidden lg:flex w-full lg:w-5/12 bg-[#001a33] relative justify-center items-center overflow-hidden">
        {/* Imagen de fondo */}
        <img 
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" 
          alt="Transporte Corporativo Paisaje" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        
        {/* Gradiente Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-blue-900/80 mix-blend-multiply"></div>

        {/* Contenido Branding */}
        <div className="relative z-10 p-12 text-white max-w-lg">
            <div className="mb-8 flex items-center gap-3">
                 <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-primary font-bold text-2xl shadow-lg">EL</div>
                 <span className="text-3xl font-bold tracking-wide">Servicios El Loa</span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 leading-tight text-white">Tu socio confiable en rutas mineras y turismo.</h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-8">
                Gestiona tus viajes, monitorea tus rutas y accede a soporte 24/7 a través de nuestra plataforma digital integrada.
            </p>
            
            <div className="space-y-4">
                 <div className="flex items-center gap-4 text-sm font-medium bg-white/10 px-5 py-3 rounded-xl backdrop-blur-sm border border-white/10">
                    <ShieldCheck className="text-secondary" size={24} /> 
                    <span>Plataforma Segura SSL</span>
                 </div>
                 <div className="flex items-center gap-4 text-sm font-medium bg-white/10 px-5 py-3 rounded-xl backdrop-blur-sm border border-white/10">
                    <Headphones className="text-secondary" size={24} /> 
                    <span>Soporte Técnico Especializado</span>
                 </div>
            </div>
        </div>

        {/* Footer Izquierdo */}
        <div className="absolute bottom-8 left-12 text-xs text-blue-200/60 font-medium">
            &copy; 2026 Servicios El Loa SpA.
        </div>
      </div>

      {/* --- Lado Derecho: Formulario --- */}
      <div className="w-full lg:w-7/12 flex flex-col justify-center items-center p-6 lg:p-20 bg-white relative">
        {/* Botón Volver Absoluto */}
        <Link to="/" className="absolute top-6 right-6 lg:top-10 lg:right-10 text-gray-400 hover:text-primary transition flex items-center gap-2 text-sm font-medium group">
            <span className="group-hover:-translate-x-1 transition-transform duration-200">Volver al inicio</span> 
            <ArrowRight size={18} />
        </Link>

        {/* Contenedor Formulario */}
        <div className="w-full max-w-md">
            
            {/* Cabecera Mobile (Logo) */}
            <div className="lg:hidden flex justify-center mb-8">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-white text-3xl font-bold shadow-md">EL</div>
            </div>

            {/* Título Formulario */}
            <div className="text-center lg:text-left mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Bienvenido de nuevo!</h1>
                <p className="text-gray-500">Ingresa tus credenciales para acceder a tu panel.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Input Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico</label>
                    <div className="relative group">
                        <Mail className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                        <input 
                            {...register("email")}
                            type="email" 
                            id="email"
                            placeholder="nombre@empresa.com" 
                            className={`w-full pl-11 pr-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all duration-200`} 
                        />
                    </div>
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>

                {/* Input Password */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Contraseña</label>
                        <Link to="/recover-password" className="text-xs font-semibold text-primary hover:text-secondary transition">¿Olvidaste tu contraseña?</Link>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                        <input 
                            {...register("password")}
                            type="password" 
                            id="password"
                            placeholder="••••••••" 
                            className={`w-full pl-11 pr-4 py-3 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all duration-200`} 
                        />
                    </div>
                    {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                </div>

                {/* Select Rol */}
                <div>
                    <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">Perfil de Acceso</label>
                    <div className="relative">
                        <IdCard className="absolute left-3 top-3.5 text-gray-400" size={20} />
                        <select 
                            {...register("role")}
                            id="role"
                            className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all duration-200 appearance-none cursor-pointer text-gray-600"
                        >
                            <option value="" disabled selected>Selecciona tu rol...</option>
                            <option value="admin">Administrador</option>
                            <option value="client">Cliente Empresa / Particular</option>
                            <option value="driver">Conductor / Operador</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" size={20} />
                    </div>
                </div>

                {/* Botón Login */}
                 <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-[#002244] text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    <span>{isSubmitting ? "Autenticando..." : "Iniciar Sesión"}</span>
                    {!isSubmitting && <LogIn size={18} />}
                </button>

            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">
                    ¿Aún no tienes una cuenta? <Link to="/register" className="font-bold text-secondary hover:text-orange-700 transition">Regístrate aquí</Link>
                </p>
            </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
