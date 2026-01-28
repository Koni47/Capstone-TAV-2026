import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";
import {
  LayoutDashboard,
  Users,
  Car,
  FileText,
  Map,
  History,
  LogOut,
  X,
  MapPin,
  Building,
  ClipboardList,
  AlertTriangle,
  MessageSquare
} from "lucide-react";

interface SidebarProps {
  role?: "ADMIN" | "DRIVER" | "CLIENT";
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ role = "ADMIN", isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí iría la lógica real de logout (limpiar token, context, etc)
    console.log("Logout triggered");
    navigate("/login");
  };

  const adminLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/requests", label: "Solicitudes", icon: ClipboardList },
    { href: "/admin/dispatch", label: "Portal Choferes", icon: MapPin },
    { href: "/admin/users", label: "Usuarios", icon: Users },
    { href: "/admin/companies", label: "Clientes", icon: Building },
    { href: "/admin/vehicles", label: "Vehículos", icon: Car },
    { href: "/admin/messages", label: "Mensajes", icon: MessageSquare },
    { href: "/admin/complaints", label: "Denuncias", icon: AlertTriangle },
  ];

  const driverLinks = [
    { href: "/driver/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/driver/trips", label: "Mis Viajes", icon: Map },
    { href: "/complaints", label: "Denuncias", icon: AlertTriangle },
  ];

  const clientLinks = [
    { href: "/client/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/client/request", label: "Solicitar Servicio", icon: MapPin },
    { href: "/client/history", label: "Historial", icon: History },
    { href: "/complaints", label: "Denuncias", icon: AlertTriangle },
  ];

  let links = adminLinks;
  if (role === "DRIVER") links = driverLinks;
  if (role === "CLIENT") links = clientLinks;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-64 bg-white shadow-xl transition-transform duration-300 lg:translate-x-0 lg:static lg:shadow-none border-r border-gray-200",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-100">
          <span className="text-xl font-bold text-blue-900">Transporte El Loa</span>
          <button onClick={onClose} className="lg:hidden p-1 text-gray-500">
             <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={() => onClose()} // Cerrar en mobile al navegar
                className={({ isActive }) =>
                  cn(
                    "group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-900"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                        isActive ? "text-blue-900" : "text-gray-400 group-hover:text-gray-500"
                      )}
                    />
                    {link.label}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className="group flex w-full items-center px-3 py-3 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 text-red-500 group-hover:text-red-700" />
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
};

export { Sidebar };
