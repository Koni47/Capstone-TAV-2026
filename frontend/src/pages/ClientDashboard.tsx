import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

export default function ClientDashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
            ← Inicio
          </button>
          <h1 className="text-3xl font-bold text-primary">Dashboard Cliente</h1>
          <div></div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">Contenedor de métricas cliente (mock)</div>
      </main>
    </div>
  )
}