import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { site } from '../services/mockApi'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userRole, setUserRole] = useState('')

  const { loginMockData } = site

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || !userRole) {
      alert('Por favor completa todos los campos')
      return
    }

    localStorage.setItem('userRole', userRole)
    localStorage.setItem('userEmail', email)
    localStorage.setItem('loginTime', new Date().toISOString())

    alert('¡Bienvenido! Redirigiendo al dashboard...')

    switch (userRole) {
      case 'admin':
        navigate('/dashboard-admin')
        break
      case 'cliente':
        navigate('/client-portal')
        break
      case 'chofer':
        navigate('/dashboard-driver')
        break
      default:
        navigate('/')
    }
  }

  return (
    <div className="bg-gray-50 font-sans flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-primary rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold mb-4 border-4 border-white shadow-md">
            <span className="material-icons text-white" style={{ fontSize: 60 }}>
              person
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{loginMockData.title}</h1>
          <p className="text-sm text-gray-500">{loginMockData.subtitle}</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Correo Electrónico</label>
            <div className="relative">
              <span className="material-icons absolute left-3 top-2 text-gray-400 text-sm">email</span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={loginMockData.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contraseña</label>
            <div className="relative">
              <span className="material-icons absolute left-3 top-2 text-gray-400 text-sm">lock</span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder={loginMockData.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Rol de Usuario</label>
            <select
              id="userRole"
              name="userRole"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              required
            >
              <option value="">Selecciona un rol</option>
              {loginMockData.roles.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <hr className="my-4" />

          <div className="text-center">
            <Link to={loginMockData.links.recoverPassword} className="block text-sm text-gray-500 hover:text-gray-700">Recuperar contraseña</Link>
            <Link to={loginMockData.links.register} className="block text-sm text-gray-500 hover:text-gray-700">Regístrate aquí</Link>
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-blue-900 text-white font-bold py-2 rounded shadow transition mt-4">
            {loginMockData.buttonText}
          </button>

          <Link to={loginMockData.links.home} className="block text-center text-sm text-gray-500 mt-4 hover:text-gray-700">Volver al Inicio</Link>
        </form>
      </div>
    </div>
  )
}
