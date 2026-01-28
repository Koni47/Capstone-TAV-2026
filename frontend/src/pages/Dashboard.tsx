import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserRole } from "../types/auth.types";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

/**
 * Dashboard Redirector
 * Redirige al usuario al dashboard correcto según su rol.
 */
const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate("/login");
      } else if (user) {
        switch (user.role) {
          case UserRole.ADMIN:
            navigate("/admin/dashboard");
            break;
          case UserRole.DRIVER:
            navigate("/driver/trips");
            break;
          case UserRole.CLIENT:
            navigate("/client/request"); // O dashboard cliente
            break;
          default:
            navigate("/");
        }
      }
    }
  }, [user, isAuthenticated, isLoading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-gray-500 font-medium">Redirigiendo a tu panel...</p>
      </div>
    </div>
  );
};

export default Dashboard;
