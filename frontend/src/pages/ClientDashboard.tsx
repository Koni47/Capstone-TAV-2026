import React from 'react'
import Header from '../components/Header'

export default function ClientDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-primary mb-4">Dashboard Cliente</h1>
        <div className="bg-white rounded-lg p-6 shadow">Contenedor de métricas cliente (mock)</div>
      </main>
    </div>
  )
}