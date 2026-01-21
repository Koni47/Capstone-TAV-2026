import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutMockData } from '../mocks/data'

export default function Logout() {
  const navigate = useNavigate()

  useEffect(() => {
    // Limpiar el almacenamiento local y de sesión
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('loginTime')

    sessionStorage.removeItem('userRole')
    sessionStorage.removeItem('userEmail')

    const timeout = setTimeout(() => {
      navigate('/login')
    }, logoutMockData.redirectDelayMs || 2000)

    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <div className="bg-gray-50 font-sans flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="w-24 h-24 bg-primary rounded-full mx-auto flex items-center justify-center text-white text-5xl font-bold mb-6 border-4 border-white shadow-md">
          <span className="material-icons" style={{ fontSize: 60 }}>
            {logoutMockData.icon}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-primary mb-2">{logoutMockData.title}</h1>
        <p className="text-gray-600 mb-6">{logoutMockData.message}</p>

        <div className="animate-spin inline-block w-8 h-8 border-4 border-primary border-t-secondary rounded-full"></div>
      </div>
    </div>
  )
}
