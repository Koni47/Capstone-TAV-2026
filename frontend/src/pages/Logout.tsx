import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Logout() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  useEffect(() => {
    // Ejecutar el logout
    logout()

    const timeout = setTimeout(() => {
      navigate('/login')
    }, 2000)

    return () => clearTimeout(timeout)
  }, [navigate, logout])

  return (
    <div className="bg-gray-50 font-sans flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-white text-5xl font-bold mb-6 border-4 border-white shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Sesión Cerrada</h1>
        <p className="text-gray-600 mb-6">Redirigiendo al inicio de sesión...</p>

        <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-gray-300 rounded-full"></div>
      </div>
    </div>
  )
}
