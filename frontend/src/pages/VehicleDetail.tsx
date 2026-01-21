import React from "react";
import { useNavigate } from "react-router-dom";
import { vehicleDetailMockData } from "../mocks/data";
import Header from '../components/Header';

const VehicleDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">
          Detalle del Vehículo
        </h1>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            <p>
              <strong>Patente:</strong> {vehicleDetailMockData.vehicle.plate}
            </p>
            <p>
              <strong>Modelo:</strong> {vehicleDetailMockData.vehicle.model}
            </p>
            <p>
              <strong>Estado:</strong> {vehicleDetailMockData.vehicle.status}
            </p>
          </div>

          <p className="mt-6 font-medium">
            Historial de mantenciones y viajes:
          </p>
          <ul className="list-disc ml-6 mt-2 text-sm text-gray-600 space-y-1">
            {vehicleDetailMockData.history.map((item, idx) => (
              <li key={idx}>
                {item.date} - {item.description}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => navigate("/vehicle-edit")}
              className="px-4 py-2 bg-secondary text-white rounded font-medium hover:opacity-90"
            >
              Editar vehículo
            </button>
            <button
              onClick={() => navigate("/vehicles")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
            >
              Volver a la flota
            </button>
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

export default VehicleDetail;
