import React from 'react'
import Header from '../components/Header'
import { site, getHtmlMock } from '../services/mockApi'
import HtmlMockRenderer from '../components/HtmlMockRenderer'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate();
  const mock = getHtmlMock('profile.html')
  if (mock) return <HtmlMockRenderer html={mock} navigate={navigate} />

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Mi Perfil</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Gestiona tu información</p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold">Nombre</label>
              <input className="w-full mt-1 px-3 py-2 border rounded" defaultValue="Usuario Demo" />
            </div>
            <div>
              <label className="text-xs font-bold">Email</label>
              <input className="w-full mt-1 px-3 py-2 border rounded" defaultValue="demo@cliente.cl" />
            </div>
          </div>
          <div className="mt-4">
            <button className="bg-secondary text-white px-4 py-2 rounded">Guardar</button>
          </div>
        </div>
      </main>
    </div>
  )
}