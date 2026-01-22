import React from "react";
import { useNavigate } from "react-router-dom";
import { userDetailMockData, getHtmlMock } from "../services/mockApi";
import HtmlMockRenderer from '../components/HtmlMockRenderer'
import Header from '../components/Header';

const UserDetail = () => {
  const mock = getHtmlMock('user-detail.html')
  if (mock) return <HtmlMockRenderer html={mock} />

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="mb-4">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-primary flex items-center gap-1 transition-colors">
            <span className="material-icons text-sm">arrow_back</span>
            Volver
          </button>
        </div>
        <h1 className="text-3xl font-bold text-primary mb-6">
          Perfil de Usuario
        </h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
              <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold ring-4 ring-blue-50">
                {userDetailMockData.user.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{userDetailMockData.user.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-3 py-1 bg-blue-100 text-primary rounded-full text-xs font-bold uppercase transition">
                    {userDetailMockData.user.role}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase transition">
                    {userDetailMockData.user.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Información de Contacto</h3>
                <div className="flex items-center gap-3">
                  <span className="material-icons text-gray-400">email</span>
                  <span className="text-gray-700">{userDetailMockData.user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-icons text-gray-400">phone</span>
                  <span className="text-gray-700">{userDetailMockData.user.phone || 'No registrado'}</span>
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <button
                onClick={() => navigate("/user-edit")}
                className="px-8 py-2 bg-secondary text-white rounded-md font-bold shadow-md hover:bg-orange-700 transition-all flex items-center gap-2"
              >
                <span className="material-icons text-sm">edit</span>
                Editar Perfil
              </button>
              <button
                onClick={() => navigate("/users")}
                className="px-6 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition"
              >
                Volver al listado
              </button>
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

export default UserDetail;
