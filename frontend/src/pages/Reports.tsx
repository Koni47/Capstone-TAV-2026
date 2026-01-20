import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reportsMockData } from "../mocks/data";

const Reports = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedClient, setSelectedClient] = useState("Todas");

  const handleSearch = (e: any) => {
    e.preventDefault();
    // Aquí iría la lógica de búsqueda
  };

  const handleExport = () => {
    // Aquí iría la lógica para exportar a Excel
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Reportes de Gestión</h1>
        <button
          onClick={() => navigate("/")}
          className="text-gray-500 hover:text-primary flex items-center gap-1"
        >
          <span className="material-icons">arrow_back</span> Volver
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Generar Reporte
        </h2>
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Inicio
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Fin
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Empresa / Cliente
            </label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {reportsMockData.filters.clients.map((client) => (
                <option key={client} value={client}>
                  {client}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-secondary hover:bg-orange-700 text-white font-bold py-2 px-4 rounded shadow flex items-center justify-center gap-2"
          >
            <span className="material-icons text-sm">search</span> Buscar
          </button>
        </form>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <span className="font-bold text-gray-700">
            Resultados ({reportsMockData.results.month})
          </span>
          <button
            onClick={handleExport}
            className="text-green-600 hover:text-green-800 font-bold text-sm flex items-center gap-1"
          >
            <span className="material-icons text-sm">table_view</span> Exportar
            Excel
          </button>
        </div>

        {/* Table */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Centro de Costo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Cant. Viajes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total Kilómetros
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Total Facturable
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reportsMockData.results.rows.map((row, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 font-medium">{row.client}</td>
                <td className="px-6 py-4">{row.trips}</td>
                <td className="px-6 py-4">{row.kilometers}</td>
                <td className="px-6 py-4 text-right font-bold text-primary">
                  {row.total}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td
                colSpan={3}
                className="px-6 py-4 text-right font-bold text-gray-700"
              >
                TOTAL GENERAL:
              </td>
              <td className="px-6 py-4 text-right font-bold text-xl text-secondary">
                {reportsMockData.results.totalGeneral}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Reports;
