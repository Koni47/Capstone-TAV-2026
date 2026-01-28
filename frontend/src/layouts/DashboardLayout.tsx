import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/layout/Sidebar";
import { Menu, UserCircle, LogOut, Settings, User as UserIcon, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Component: Recibe el estado para mobile */}
      <Sidebar 
        role={user?.role || "CLIENT"} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 relative">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 mr-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 lg:hidden">
              El Loa
            </h1>
          </div>

          <div className="relative ml-3">
            {/* Profile Dropdown Trigger */}
            <div 
                className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition select-none"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
                <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-bold text-gray-900 leading-tight">{user?.fullName || "Usuario"}</span>
                    <span className="text-xs text-gray-500 font-medium">{user?.role || "Invitado"}</span>
                </div>
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-primary border border-blue-200 uppercase font-bold">
                    {user?.fullName ? user.fullName.charAt(0) : <UserCircle size={28} />}
                </div>
                <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Menu */}
            {isProfileOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsProfileOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 animate-fadeIn">
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                            <p className="text-sm font-bold text-gray-900">{user?.fullName}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                        
                        <div className="py-1">
                            <Link 
                                to="/profile" 
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition"
                                onClick={() => setIsProfileOpen(false)}
                            >
                                <UserIcon size={16} className="mr-2.5 text-gray-400" /> Mi Perfil
                            </Link>
                            
                            {user?.role === 'ADMIN' && (
                                <Link 
                                    to="/admin/settings" 
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    <Settings size={16} className="mr-2.5 text-gray-400" /> Configuración
                                </Link>
                            )}
                        </div>
                        
                        <div className="border-t border-gray-100 my-1"></div>
                        
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-medium"
                        >
                            <LogOut size={16} className="mr-2.5" /> Cerrar Sesión
                        </button>
                    </div>
                </>
            )}
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
           <div className="mx-auto max-w-7xl">
              <Outlet />
           </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
