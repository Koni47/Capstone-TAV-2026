import React, { useEffect, useState } from 'react'
import { site } from '../mocks/data'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [notifications, setNotifications] = useState<number>(0)

  useEffect(() => {
    setUserEmail(localStorage.getItem('userEmail'))
    setUserRole(localStorage.getItem('userRole'))
    const n = parseInt(localStorage.getItem('notifications') || '0', 10)
    setNotifications(isNaN(n) ? 0 : n)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('loginTime')
    navigate('/login')
  }

  const getInitials = () => {
    const name = localStorage.getItem('userName') || userEmail || ''
    if (!name) return 'US'
    const parts = name.split(/[\s@._-]+/).filter(Boolean)
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + (parts[1][0] || '')).toUpperCase()
  }

  const current = typeof window !== 'undefined' ? window.location.pathname : '/'

  return (
    <nav className="bg-primary text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}> 
            <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center text-primary font-bold text-xl">EL</div>
            <span className="font-bold text-xl tracking-wide">{site.companyName}</span>
          </div>

          <div className="hidden md:block ml-6">
            <div className="flex items-baseline gap-6">
              {site.nav.map((n) => (
                <Link
                  key={n.href}
                  to={n.href}
                  className={`${current === n.href ? 'text-white border-b-2 border-secondary px-4 py-3' : 'text-gray-300 hover:bg-primary-light hover:text-white px-4 py-3'} rounded-md text-sm font-medium transition`}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {userEmail ? (
              <>
                <button
                  onClick={() => navigate('/notifications')}
                  className="relative p-2 rounded-full bg-primary hover:bg-primary-dark text-white"
                  aria-label="Notifications"
                >
                  <span className="material-icons">notifications</span>
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold rounded-full px-2 leading-none">{notifications}</span>
                  )}
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-primary-light">
                  <div className="text-right hidden sm:block text-white">
                    <p className="text-sm font-bold leading-none">{userEmail.split('@')[0]}</p>
                    <p className="text-xs text-secondary">{userRole || 'Usuario'}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-white text-xs font-bold ring-2 ring-primary-dark">{getInitials()}</div>
                  <button onClick={handleLogout} className="ml-2 text-sm font-semibold hover:text-secondary text-white transition-colors">Salir</button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold hover:text-gray-300">Iniciar sesión</Link>
                <Link to="/register" className="bg-secondary hover:bg-orange-600 text-white text-sm font-bold py-2 px-5 rounded-md transition shadow-md">Registrarse</Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button className="text-white hover:text-secondary" onClick={() => navigate('/menu')}>
              <span className="material-icons text-3xl">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
