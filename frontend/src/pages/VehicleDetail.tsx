import React from "react";
import { useNavigate } from "react-router-dom";
import { vehicleDetailMockData } from "../services/mockApi";
import Header from '../components/Header';

const VehicleDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow max-w-6xl mx-auto p-6 lg:p-10 w-full">
        {/* Navigation & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <button 
              onClick={() => navigate("/vehicles")} 
              className="text-gray-500 hover:text-primary flex items-center gap-1 transition-colors mb-2"
            >
              <span className="material-icons text-sm">arrow_back</span> Volver a la flota
            </button>
            <h1 className="text-3xl font-bold text-primary">Detalle del Vehículo</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/vehicle-edit")}
              className="bg-primary text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-all shadow-md active:scale-95"
            >
              <span className="material-icons text-sm">edit</span>
              Editar Datos
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Vehicle Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <span className="material-icons text-3xl">local_shipping</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{vehicleDetailMockData.vehicle.plate}</h2>
                    <p className="text-white/80 font-medium">{vehicleDetailMockData.vehicle.model}</p>
                  </div>
                  <div className="ml-auto bg-white/20 px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-md">
                    {vehicleDetailMockData.vehicle.status}
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                  <span className="material-icons text-xl">info</span>
                  Especificaciones Técnicas
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Patente</p>
                    <p className="text-lg font-bold text-slate-700">{vehicleDetailMockData.vehicle.plate}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Modelo</p>
                    <p className="text-lg font-bold text-slate-700">{vehicleDetailMockData.vehicle.model}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 md:col-span-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Estado de Operación</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-3 h-3 rounded-full bg-success"></span>
                      <p className="text-lg font-bold text-slate-700">{vehicleDetailMockData.vehicle.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* History Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
              <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2 border-b pb-4">
                <span className="material-icons text-xl">history</span>
                Historial Histórico
              </h3>
              
              <div className="space-y-6">
                {vehicleDetailMockData.history.map((item: any, idx: number) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-slate-100 last:border-0 pb-2">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-primary"></div>
                    <p className="text-xs font-bold text-slate-400">{item.date}</p>
                    <p className="text-sm font-medium text-slate-700 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-8 py-3 px-4 border-2 border-dashed border-gray-200 rounded-xl text-slate-400 font-bold text-sm hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
                <span className="material-icons text-sm">add</span>
                Ver Historial Completo
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-10 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-400">
          © 2026 Transportes El Loa | Sistema de Gestión de Flota
        </div>
      </footer>
    </div>
  );
};

export default VehicleDetail;
