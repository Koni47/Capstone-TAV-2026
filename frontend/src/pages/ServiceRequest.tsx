import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { site, getHtmlMock } from '../services/mockApi';
import { htmlMocks } from '../mocks/data';
import HtmlMockRenderer from '../components/HtmlMockRenderer';

export default function ServiceRequest() {
  const navigate = useNavigate();
  const mock = htmlMocks['service-request.html'];
  console.log('ServiceRequest mock:', mock?.length || 'null');
  if (mock) return <HtmlMockRenderer html={mock} navigate={navigate} />;
  return (
    <div className="bg-surface font-sans text-gray-800 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-primary flex items-center gap-1 transition-colors">
            <span className="material-icons text-sm">arrow_back</span>
            Volver
          </button>
        </div>
        <h1 className="text-3xl font-bold text-primary mb-6">Solicitud de Servicio</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-gray-600 mb-8">Complete el siguiente formulario para solicitar un nuevo traslado. Nuestro equipo validará la disponibilidad a la brevedad.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-bold text-gray-700">Origen</span>
                <input type="text" className="form-input mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary" placeholder="Ej: Calama" />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-gray-700">Destino</span>
                <input type="text" className="form-input mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary" placeholder="Ej: Minera Gaby" />
              </label>
            </div>
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-bold text-gray-700">Fecha y Hora</span>
                <input type="datetime-local" className="form-input mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary" />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-gray-700">Pasajeros</span>
                <input type="number" min="1" className="form-input mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary" placeholder="1" />
              </label>
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <button className="bg-secondary hover:bg-orange-700 text-white font-bold py-3 px-10 rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center gap-2">
              <span className="material-icons">send</span>
              Enviar Solicitud
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
