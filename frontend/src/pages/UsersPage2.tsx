import React from "react";
import { useNavigate } from "react-router-dom";
import { usersPage2MockData } from "../mocks/data";

const UsersPage2 = () => {
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
          Usuarios — Página {usersPage2MockData.pagination.current}
        </h1>

        <div className="bg-white rounded-lg shadow p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Rol
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usersPage2MockData.users.map((user, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => navigate("/user-detail")}
                      className="text-primary hover:underline"
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => navigate("/users")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
            >
              Volver a página 1
            </button>
            <div className="text-sm text-slate-600">
              Página {usersPage2MockData.pagination.current} de{" "}
              {usersPage2MockData.pagination.total}
            </div>
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

export default UsersPage2;
