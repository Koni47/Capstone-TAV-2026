import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getReports } from "../services/api";
import Header from '../components/Header';

const Reports = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedClient, setSelectedClient] = useState("Todas");
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        // Cambiar a dashboard que tiene los KPIs
        const data: any = await getReports(); 
        // Si viene structure diferente, adaptamos
        setReports(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Error al cargar reportes');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleExport = () => {
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto p-6 lg:p-10 w-full">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <button 
              onClick={() => navigate("/")} 
              className="text-gray-500 hover:text-primary flex items-center gap-1 transition-colors mb-2 group"
            >
              <span className="material-icons text-sm transition-transform group-hover:-translate-x-1">arrow_back</span> 
              Volver al inicio
            </button>
            <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
              <span className="material-icons text-3xl">analytics</span>
              Reportes de Gestión
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="bg-success text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-green-700 transition-all shadow-lg shadow-success/20 active:scale-95 font-bold"
            >
              <span className="material-icons">table_view</span>
              Exportar Excel
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="material-icons text-primary">filter_alt</span>
            Generar Reporte Personalizado
          </h2>
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end"
          >
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Fecha Inicio</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Fecha Fin</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Empresa / Cliente</label>
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="Todas">Todas las empresas</option>
                {Array.from(new Set(reports.map(r => r.empresaCliente?.nombre_comercial).filter(Boolean))).map((client: any) => (
                  <option key={client} value={client}>{client}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-secondary/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span className="material-icons">search</span> Buscar
            </button>
          </form>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Results Section */}
        {!loading && !error && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <span className="font-bold text-slate-700">
              Resultados: {new Date().toLocaleDateString('es-CL', {month: 'long', year: 'numeric'})}
            </span>
            <div className="text-sm font-bold text-primary bg-white px-3 py-1 rounded-lg border border-gray-200">
              {reports.length} Registros
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Centro de Costo</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Cant. Viajes</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Kilómetros</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Total Facturable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reports.map((report: any, idx: number) => (
                  <tr key={report.id || idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5 font-bold text-slate-700">
                      {report.empresaCliente?.nombre_comercial || 'Sin empresa'}
                    </td>
                    <td className="px-8 py-5 text-center text-slate-600 font-medium">
                      {report.cantidad_viajes || 0}
                    </td>
                    <td className="px-8 py-5 text-center text-slate-600 font-medium">
                      {report.total_kilometros || 0} km
                    </td>
                    <td className="px-8 py-5 text-right font-bold text-primary">
                      ${(report.monto_total || 0).toLocaleString('es-CL')}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 border-t-2 border-slate-100">
                <tr>
                  <td colSpan={3} className="px-8 py-6 text-right font-bold text-slate-500 uppercase tracking-wider">Total General</td>
                  <td className="px-8 py-6 text-right font-black text-2xl text-secondary">
                    ${reports.reduce((sum, r) => sum + (r.monto_total || 0), 0).toLocaleString('es-CL')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        )}
      </main>

      <footer className="mt-auto py-10 border-t border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-400">
          © 2026 Transportes El Loa | Inteligencia de Negocios
        </div>
      </footer>
    </div>
  );
};

export default Reports;
