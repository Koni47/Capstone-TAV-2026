import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vehicleEditMockData } from "../mocks/data";
import Header from '../components/Header';

const VehicleEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    plate: vehicleEditMockData.vehicle.plate,
    model: vehicleEditMockData.vehicle.model,
    status: vehicleEditMockData.vehicle.status,
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
    navigate("/vehicle-detail");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Editar Vehículo</h1>

        <form
          onSubmit={handleSave}
          className="bg-white rounded-lg shadow p-6 grid gap-4"
        >
          <label className="block">
            <span className="text-sm text-slate-600">Patente</span>
            <input
              type="text"
              name="plate"
              value={formData.plate}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">Modelo</span>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">Estado</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {vehicleEditMockData.statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
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
              onClick={() => navigate("/vehicle-detail")}
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

export default VehicleEdit;
