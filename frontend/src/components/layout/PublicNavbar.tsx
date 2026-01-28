import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const PublicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center text-primary font-bold text-xl">
              EL
            </div>
            <span className="font-bold text-xl tracking-wide">Servicios El Loa</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-secondary font-bold border-b-2 border-secondary px-1 pb-1">
              Inicio
            </Link>
            <Link to="/client/request" className="hover:text-gray-300 transition px-1 pb-1">
              Solicitudes
            </Link>
            <Link to="/driver/trips" className="hover:text-gray-300 transition px-1 pb-1">
              Viajes
            </Link>
            <Link to="/admin/vehicles" className="hover:text-gray-300 transition px-1 pb-1">
              Vehículos
            </Link>
            <Link to="/complaints" className="hover:text-gray-300 transition px-1 pb-1">
              Denuncias
            </Link>
            <Link to="/contact" className="hover:text-gray-300 transition px-1 pb-1">
              Contacto
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold hover:text-gray-300">
              Iniciar sesión
            </Link>
            <Link 
              to="/register" 
              className="bg-secondary hover:bg-orange-600 text-white text-sm font-bold py-2 px-5 rounded-md transition shadow-md"
            >
              Registrarse
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-secondary focus:outline-none"
            >
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary pb-4 px-2">
            <div className="flex flex-col space-y-2">
                <Link to="/" className="px-3 py-2 text-white hover:bg-blue-800 rounded-md">Inicio</Link>
                <Link to="/client/request" className="px-3 py-2 text-white hover:bg-blue-800 rounded-md">Solicitudes</Link>
                <Link to="/admin/vehicles" className="px-3 py-2 text-white hover:bg-blue-800 rounded-md">Vehículos</Link>
                <Link to="/complaints" className="px-3 py-2 text-white hover:bg-blue-800 rounded-md">Denuncias</Link>
                <Link to="/contact" className="px-3 py-2 text-white hover:bg-blue-800 rounded-md">Contacto</Link>
                <Link to="/login" className="px-3 py-2 text-white hover:bg-blue-800 rounded-md font-bold">Iniciar Sesión</Link>
                <Link to="/register" className="px-3 py-2 text-secondary font-bold">Registrarse</Link>
            </div>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;
