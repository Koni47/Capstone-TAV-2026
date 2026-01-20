import React from "react";
import { useNavigate } from "react-router-dom";
import { userDetailMockData } from "../mocks/data";

const UserDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <nav className="bg-primary text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/")}
                className="flex-shrink-0 text-white flex items-center gap-2 font-bold text-xl hover:opacity-80"
              >
                EL LOA
              </button>
              <div className="hidden md:block ml-10">
                <button
                  onClick={() => navigate("/users")}
                  className="text-white font-medium px-3 py-2 rounded-md hover:bg-opacity-80"
                >
                  Usuarios
                </button>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">
          Detalle del Usuario
        </h1>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            <p>
              <strong>Nombre:</strong> {userDetailMockData.user.name}
            </p>
            <p>
              <strong>Email:</strong> {userDetailMockData.user.email}
            </p>
            <p>
              <strong>Rol:</strong> {userDetailMockData.user.role}
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => navigate("/user-edit")}
              className="px-4 py-2 bg-secondary text-white rounded font-medium hover:opacity-90"
            >
              Editar usuario
            </button>
            <button
              onClick={() => navigate("/users")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
            >
              Volver a usuarios
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-slate-600">
          © 2026 Servicios de Transporte El Loa
        </div>
      </footer>
    </div>
  );
};

export default UserDetail;
