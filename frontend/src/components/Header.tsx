import React from 'react'
import { site } from '../mocks/data'

export default function Header() {
  const current = typeof window !== 'undefined' ? window.location.pathname : '/'
  return (
    <nav className="bg-primary text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center text-primary font-bold text-xl">EL</div>
            <span className="font-bold text-xl tracking-wide">{site.companyName}</span>
          </div>

          <div className="hidden md:block ml-6">
            <div className="flex items-baseline gap-6">
              {site.nav.map((n) => (
                <a key={n.href} href={n.href} className={`${current === n.href ? 'text-white border-b-2 border-secondary px-4 py-3' : 'text-gray-300 hover:bg-blue-800 hover:text-white px-4 py-3'} rounded-md text-sm font-medium transition`}>
                  {n.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="/login" className="text-sm font-semibold hover:text-gray-300">Iniciar sesión</a>
            <a href="/register" className="bg-secondary hover:bg-orange-600 text-white text-sm font-bold py-2 px-5 rounded-md transition shadow-md">Registrarse</a>
          </div>

          <div className="md:hidden">
            <button className="text-white hover:text-secondary">
              <span className="material-icons text-3xl">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
