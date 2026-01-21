import React from 'react'
import { clientDashboardMockData } from '../mocks/data'
import '../components/charts/ChartSetup'
import LineChart from '../components/charts/LineChart'
import DoughnutChart from '../components/charts/DoughnutChart'

export default function ClientDashboard() {
  const { header, kpis, upcomingTrips, history } = clientDashboardMockData

  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">{header.title}</h1>
          <p className="text-gray-600">{header.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 border-l-4 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-2">{kpi.label}</p>
                  <p className={`text-3xl font-bold ${kpi.color === 'secondary' ? 'text-secondary' : 'text-primary'}`}>{kpi.value}</p>
                  {(kpi as any).sub && <p className="text-xs text-gray-500 mt-2">{(kpi as any).sub}</p>}
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
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2"><span className="material-icons">trending_up</span> Gasto Mensual</h3>
            <div className="h-48">
              <LineChart data={clientDashboardMockData.chartGasto} options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx:any) => '$' + Number(ctx.raw).toLocaleString() } } } }} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2"><span className="material-icons">pie_chart</span> Tipos de Viajes</h3>
            <div className="h-48">
              <DoughnutChart data={clientDashboardMockData.chartTipos} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2"><span className="material-icons">list</span> Mis Viajes Próximos</h3>
          <div className="space-y-4">
            {upcomingTrips.map((t, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                <div>
                  <p className="font-bold text-primary">{t.title}</p>
                  <p className="text-sm text-gray-600">{t.route}</p>
                  <p className="text-xs text-gray-500 mt-1">Horario: {t.time} | Chofer: {t.driver}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-secondary">{t.price}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${t.status === 'Confirmado' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2"><span className="material-icons">history</span> Historial de Viajes</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Fecha</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Origen</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Destino</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Chofer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Monto</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Estado</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4 text-sm text-gray-700">{h.date}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{h.origin}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{h.destination}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{h.driver}</td>
                    <td className="py-3 px-4 text-sm font-bold text-secondary">{h.amount}</td>
                    <td className="py-3 px-4 text-sm"><span className={`bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold`}>{h.status}</span></td>
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
