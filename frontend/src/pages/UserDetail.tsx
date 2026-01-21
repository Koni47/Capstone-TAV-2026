import React from "react";
import { useNavigate } from "react-router-dom";
import { userDetailMockData } from "../mocks/data";
import Header from '../components/Header';

const UserDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <Header />

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
