import { complaintsMockData } from '../services/mockApi';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function Complaints() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 font-sans text-gray-800 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto p-6 lg:p-10 w-full">
        {/* Navigation & Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="text-gray-500 hover:text-primary flex items-center gap-1 transition-colors mb-4 group"
          >
            <span className="material-icons text-sm transition-transform group-hover:-translate-x-1">arrow_back</span> 
            Volver al inicio
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-danger rounded-2xl flex items-center justify-center text-white shadow-lg">
              <span className="material-icons text-3xl">report_problem</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">{complaintsMockData.pageTitle}</h1>
              <p className="text-slate-500 font-medium">{complaintsMockData.description}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-red-50 text-danger rounded-xl">
                <span className="material-icons">info_outline</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Compromiso con la transparencia</h3>
                <p className="text-slate-600 leading-relaxed mt-2">
                  Nuestro canal de denuncias y reclamos garantiza la confidencialidad absoluta. 
                  Procesamos cada caso bajo los más altos estándares de ética profesional 
                  y cumplimiento normativo.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex gap-4">
              <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2">
                <span className="material-icons">add_comment</span>
                Nueva Denuncia
              </button>
              <button className="px-6 py-3 border border-gray-200 text-slate-600 rounded-xl font-bold hover:bg-gray-50 transition-all">
                Seguir un caso anterior
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-10 border-t border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-400">
          © 2026 Transportes El Loa | Sistema de Gestión y Cumplimiento
        </div>
      </footer>
    </div>
  );
}
