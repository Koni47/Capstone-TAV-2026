import React from 'react'
import Header from '../components/Header'
import { tripsMockData, getHtmlMock } from '../services/mockApi'
import HtmlMockRenderer from '../components/HtmlMockRenderer'
import { Link, useNavigate } from 'react-router-dom'

export default function Trips() {
  const navigate = useNavigate()
  const mock = getHtmlMock('trips.html')
  if (mock) return <HtmlMockRenderer html={mock} navigate={navigate} />
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <div className="mb-4">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-primary flex items-center gap-1 transition-colors">
            <span className="material-icons text-sm">arrow_back</span>
            Volver
          </button>
        </div>
        <h1 className="text-2xl font-bold text-primary mb-4">Mis Viajes</h1>

        <div className="grid grid-cols-1 gap-6">
          {tripsMockData.trips.map((t: any) => (
            <Link to={`/trip-detail/${t.id}`} key={t.id} className="block hover:bg-gray-50 transition">
              <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between border hover:border-primary">
                <div>
                  <div className="font-bold text-sm text-primary">{t.title}</div>
                  <div className="text-xs text-gray-500">{t.date} · {t.time}</div>
                  <div className="text-sm text-gray-700 mt-1">{t.origin} → {t.dest}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-secondary">${t.fare}</div>
                  <div className="text-xs text-gray-500">{t.status}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}