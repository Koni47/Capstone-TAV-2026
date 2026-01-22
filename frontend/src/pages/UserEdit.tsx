import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userEditMockData, getHtmlMock } from "../services/mockApi";
import Header from '../components/Header';
import HtmlMockRenderer from '../components/HtmlMockRenderer';

const UserEdit = () => {
  const navigate = useNavigate();

  const htmlMock = getHtmlMock('user-edit.html');
  if (htmlMock) {
    return <HtmlMockRenderer html={htmlMock} />;
  }

  const [formData, setFormData] = useState({
    name: userEditMockData.user.name,
    email: userEditMockData.user.email,
    role: userEditMockData.user.role,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save data would go here
    navigate("/user-detail");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto p-6 lg:p-10 w-full">
        {/* Navigation & Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="text-gray-500 hover:text-primary flex items-center gap-1 transition-colors mb-4 group"
          >
            <span className="material-icons text-sm transition-transform group-hover:-translate-x-1">arrow_back</span> 
            Volver al perfil
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
              <span className="material-icons text-3xl">edit</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">Editar Usuario</h1>
              <p className="text-slate-500 font-medium font-['Montserrat']">Actualice la información del sistema</p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Field: Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block ml-1 uppercase tracking-wider">
                    Nombre Completo
                  </label>
                  <div className="relative">
                    <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ej: Juan Pérez"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Field: Email */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block ml-1 uppercase tracking-wider">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">email</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="usuario@translogistica.com"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Field: Role */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block ml-1 uppercase tracking-wider">
                    Rol asignado
                  </label>
                  <div className="relative">
                    <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">admin_panel_settings</span>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                    >
                      {userEditMockData.roles.map((role: any) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 border-t border-gray-100 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 text-slate-600 font-bold hover:bg-gray-100 rounded-xl transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-secondary text-white rounded-xl font-bold shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  <span className="material-icons">save</span>
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-10 border-t border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-400">
          © 2026 Transportes El Loa | Sistema de Gestión Empresarial
        </div>
      </footer>
    </div>
  );
};

export default UserEdit;
