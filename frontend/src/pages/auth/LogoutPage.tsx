import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Ejecutar logout del contexto
    logout();

    // Esperar 5 segundos antes de redirigir
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center font-sans">
      <div className="text-center">
        <div className="w-24 h-24 bg-primary rounded-full mx-auto flex items-center justify-center text-white mb-6 border-4 border-white shadow-md">
          <LogOut size={60} />
        </div>
        <h1 className="text-3xl font-bold text-primary mb-2">Cerrando sesión</h1>
        <p className="text-gray-600 mb-6">Tu sesión será cerrada en unos momentos...</p>

        <div className="inline-block animate-spin text-secondary">
             <Loader2 size={48} />
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
