import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vehicleEditMockData } from "../services/mockApi";
import Header from '../components/Header';

const VehicleEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    plate: vehicleEditMockData.vehicle.plate,
    model: vehicleEditMockData.vehicle.model,
    status: vehicleEditMockData.vehicle.status,
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
    navigate("/vehicle-detail");
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
            Volver al detalle
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
              <span className="material-icons text-3xl">local_shipping</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">Editar Vehículo</h1>
              <p className="text-slate-500 font-medium font-['Montserrat']">Actualice la ficha técnica de la unidad</p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Field: Plate */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block ml-1 uppercase tracking-wider">
                    Patente del Vehículo
                  </label>
                  <div className="relative">
                    <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">badge</span>
                    <input
                      type="text"
                      name="plate"
                      value={formData.plate}
                      onChange={handleInputChange}
                      placeholder="ABC-123"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none uppercase"
                    />
                  </div>
                </div>

                {/* Field: Model */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block ml-1 uppercase tracking-wider">
                    Marca y Modelo
                  </label>
                  <div className="relative">
                    <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">commute</span>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      placeholder="Ej: Mercedes-Benz Sprinter"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Field: Status */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 block ml-1 uppercase tracking-wider">
                    Estado Operativo actual
                  </label>
                  <div className="relative">
                    <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">settings</span>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none appearance-none cursor-pointer font-bold text-slate-700"
                    >
                      {vehicleEditMockData.statuses.map((status: any) => (
                        <option key={status} value={status}>
                          {status}
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
                  Confirmar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-10 border-t border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-400">
          © 2026 Transportes El Loa | Sistema de Gestión de Flota
        </div>
      </footer>
    </div>
  );
};

export default VehicleEdit;
