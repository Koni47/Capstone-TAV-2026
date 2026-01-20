import React from "react";
import { tripDetailMockData } from "../mocks/data";

const TripDetail = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-white font-bold text-xl">Detalle de Servicio</h1>
            <p className="text-blue-200 text-sm">ID: {tripDetailMockData.trip.id}</p>
          </div>
          <span
            className={`px-3 py-1 rounded text-sm font-bold shadow text-white ${
              tripDetailMockData.trip.statusColor === "green"
                ? "bg-green-500"
                : "bg-yellow-500"
            }`}
          >
            {tripDetailMockData.trip.status}
          </span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column - Trip Information */}
          <div className="p-6 border-r border-gray-200">
            <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">
              Información del Traslado
            </h3>

            <div className="space-y-4">
              {/* Timeline */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <div className="w-0.5 h-8 bg-gray-200"></div>
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                </div>
                <div>
                  <div className="mb-4">
                    <p className="text-xs text-gray-500">
                      Origen • {tripDetailMockData.trip.origin.time}
                    </p>
                    <p className="font-bold text-gray-800">
                      {tripDetailMockData.trip.origin.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">
                      Destino • {tripDetailMockData.trip.destination.time}
                    </p>
                    <p className="font-bold text-gray-800">
                      {tripDetailMockData.trip.destination.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Driver and Vehicle Info */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-xs text-gray-500">Chofer</p>
                  <p className="font-medium">{tripDetailMockData.trip.driver}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Vehículo</p>
                  <p className="font-medium">{tripDetailMockData.trip.vehicle}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Evidence */}
          <div className="p-6 bg-gray-50">
            <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">
              Evidencia del Servicio
            </h3>

            {/* Evidence Image */}
            <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center mb-4 relative overflow-hidden group">
              <img
                src={tripDetailMockData.trip.evidenceImage}
                alt="Trip evidence"
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500"
              />
              <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded text-xs relative z-10">
                Ver Evidencia Completa
              </span>
            </div>

            {/* Driver Comments */}
            <div className="bg-white p-3 rounded border border-gray-200 shadow-sm">
              <p className="text-xs text-gray-500 font-bold mb-1">
                Comentarios del Chofer:
              </p>
              <p className="text-sm italic text-gray-600">
                {tripDetailMockData.trip.driverComment}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button className="text-gray-600 hover:text-gray-800 font-medium text-sm px-4 py-2">
            Descargar PDF
          </button>
          <button className="bg-primary text-white font-bold text-sm px-4 py-2 rounded shadow hover:bg-blue-900">
            Enviar Factura
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripDetail;
