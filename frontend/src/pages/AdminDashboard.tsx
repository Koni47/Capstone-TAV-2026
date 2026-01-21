import React from 'react'
import { adminDashboardMockData } from '../mocks/data'
import '../components/charts/ChartSetup'
import BarChart from '../components/charts/BarChart'
import LineChart from '../components/charts/LineChart'
import DoughnutChart from '../components/charts/DoughnutChart'

export default function AdminDashboard() {
  const { header, kpis, topClients, recentTrips } = adminDashboardMockData

  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">{header.title}</h1>
          <p className="text-gray-600">{header.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, idx) => (
            <div key={idx} className={`bg-white rounded-lg shadow-md p-6 border-l-4 hover:shadow-lg transition ${(kpi as any).border || ''}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-2">{kpi.label}</p>
                  <p className={`text-3xl font-bold ${kpi.color === 'secondary' ? 'text-secondary' : 'text-primary'}`}>{kpi.value}</p>
                  {kpi.delta && <p className="text-xs text-green-600 mt-2 flex items-center gap-1"><span className="material-icons text-sm">trending_up</span> {kpi.delta}</p>}
                </div>
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="material-icons text-2xl text-primary">{kpi.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2"><span className="material-icons">trending_up</span> Ingresos por Tipo de Servicio</h3>
            <div className="h-56">
              <BarChart data={adminDashboardMockData.chartServices} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { callback: (v:any) => '$' + Number(v).toLocaleString() } } } }} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2"><span className="material-icons">business</span> Top 5 Clientes</h3>
            <div className="space-y-3">
              {topClients.map((c, i) => (
                <div key={i} className="flex items-center justify-between pb-2 border-b">
                  <span className="text-sm text-gray-700">{c.name}</span>
                  <span className="text-sm font-bold text-secondary">{c.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2"><span className="material-icons">calendar_month</span> Viajes por Mes</h3>
            <div className="h-48">
              <LineChart data={adminDashboardMockData.chartViajesPorMes} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2"><span className="material-icons">pie_chart</span> Ocupación de Vehículos</h3>
            <div className="h-48">
              <DoughnutChart data={adminDashboardMockData.chartOcupacion} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2"><span className="material-icons">list</span> Últimos Viajes Realizados</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID Viaje</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Cliente</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Chofer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Origen</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Destino</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Fecha</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tarifa</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentTrips.map((t, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4 text-sm text-primary font-bold">{t.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{t.client}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{t.driver}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{t.origin}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{t.destination}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{t.date}</td>
                    <td className="py-3 px-4 text-sm font-bold text-secondary">{t.fare}</td>
                    <td className="py-3 px-4 text-sm"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${t.statusColor === 'green' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
