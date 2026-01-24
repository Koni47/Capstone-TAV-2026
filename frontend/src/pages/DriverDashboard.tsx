import React from 'react'
import { driverDashboardMockData } from '../services/mockApi'
import '../components/charts/ChartSetup'
import BarChart from '../components/charts/BarChart'
import DoughnutChart from '../components/charts/DoughnutChart'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

export default function DriverDashboard() {
  const navigate = useNavigate();
  const { header, kpis, nextTrips, completed } = driverDashboardMockData

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
            ← Inicio
          </button>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-2">{header.title}</h1>
            <p className="text-gray-600">{header.subtitle}</p>
          </div>
          <div></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi: any, idx: number) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 border-l-4 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-2">{kpi.label}</p>
                  <p className={`text-3xl font-bold ${kpi.color === 'secondary' ? 'text-secondary' : 'text-primary'}`}>{kpi.value}</p>
                  {kpi.sub && <p className="text-xs text-gray-500 mt-2">{kpi.sub}</p>}
                </div>
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="material-icons text-2xl text-primary">{kpi.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2"><span className="material-icons">trending_up</span> Ganancias Semanal</h3>
            <div className="h-48">
              <BarChart data={driverDashboardMockData.chartGanancias} options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx:any) => '$' + Number(ctx.raw).toLocaleString() } } } }} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2"><span className="material-icons">pie_chart</span> Distribución de Viajes</h3>
            <div className="h-48">
              <DoughnutChart data={driverDashboardMockData.chartDistribucion} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2"><span className="material-icons">schedule</span> Mis Próximos Viajes</h3>
          <div className="space-y-4">
            {nextTrips.map((t: any, i: number) => (
              <div key={i} className={`flex items-center justify-between p-4 border-l-4 bg-${t.level}-50 rounded-lg`}>
                <div>
                  <p className="font-bold text-primary">{t.title}</p>
                  <p className="text-sm text-gray-600">{t.passenger} → {t.client} | {t.time}</p>
                  <p className="text-xs text-gray-500 mt-1">{t.routeInfo}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-secondary">{t.price}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${t.status === 'En Ruta' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2"><span className="material-icons">history</span> Viajes Completados Hoy</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Hora</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Cliente</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Ruta</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Km</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tarifa</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Calificación</th>
                </tr>
              </thead>
              <tbody>
                {completed.map((c: any, idx: number) => (
                  <tr key={idx} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4 text-sm text-gray-700">{c.time}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{c.client}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{c.route}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{c.km}</td>
                    <td className="py-3 px-4 text-sm font-bold text-secondary">{c.fare}</td>
                    <td className="py-3 px-4 text-sm"><span className="flex items-center gap-1">{c.stars} <span className="text-xs text-gray-500">({c.rating})</span></span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      </div>
    </div>
  )
}
