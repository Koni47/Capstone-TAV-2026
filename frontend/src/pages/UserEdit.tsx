import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userEditMockData } from "../mocks/data";

const UserEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: userEditMockData.user.name,
    email: userEditMockData.user.email,
    role: userEditMockData.user.role,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e: any) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los datos
    navigate("/user-detail");
  };

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
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Editar Usuario</h1>

        <form
          onSubmit={handleSave}
          className="bg-white rounded-lg shadow p-6 grid gap-4"
        >
          <label className="block">
            <span className="text-sm text-slate-600">Nombre</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">Rol</span>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {userEditMockData.roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-secondary text-white rounded font-medium hover:opacity-90"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => navigate("/user-detail")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        </form>
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

export default UserEdit;
