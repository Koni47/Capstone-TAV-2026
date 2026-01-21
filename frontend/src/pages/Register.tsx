import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Register() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userRole, setUserRole] = useState('cliente')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !email || !password) {
      alert('Por favor completa todos los campos')
      return
    }

    // Simular registro: aquí podrías llamar a la API
    localStorage.setItem('userRole', userRole)
    localStorage.setItem('userEmail', email)
    localStorage.setItem('loginTime', new Date().toISOString())

    alert('Cuenta creada correctamente. Redirigiendo al portal...')
    navigate('/client-portal')
  }

  return (
    <div className="bg-gray-50 font-sans flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-primary rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold mb-4 border-4 border-white shadow-md">
            <span className="material-icons text-white" style={{ fontSize: 60 }}>person_add</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Crear Cuenta</h1>
          <p className="text-sm text-gray-500">Regístrate para acceder al portal de clientes</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre Completo</label>
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Correo Electrónico</label>
            <input
              type="email"
              placeholder="Ej: correo@dominio.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Rol de Usuario</label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="cliente">Cliente</option>
              <option value="chofer">Chofer</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-blue-900 text-white font-bold py-2 rounded shadow transition mt-4">Crear Cuenta</button>

          <a href="/login" className="block text-center text-sm text-gray-500 mt-4 hover:text-gray-700">¿Ya tienes cuenta? Inicia sesión</a>
        </form>
      </div>
    </div>
  )
}

export default Register
