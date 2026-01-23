import React from 'react'
import Header from '../components/Header'
import { getHtmlMock } from '../services/mockApi'
import HtmlMockRenderer from '../components/HtmlMockRenderer'
import { useNavigate } from 'react-router-dom'

export default function RecoverPassword() {
  const navigate = useNavigate();
  const mock = getHtmlMock('recover-password.html')
  if (mock) return <HtmlMockRenderer html={mock} navigate={navigate} />

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="max-w-md mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-xl font-bold mb-4">Recuperar Contraseña</h1>
          <form className="space-y-4">
            <input className="w-full px-3 py-2 border rounded" placeholder="Correo electrónico" />
            <button className="w-full bg-primary text-white py-2 rounded">Enviar instrucciones</button>
          </form>
        </div>
      </main>
    </div>
  )
}