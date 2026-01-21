import React from 'react'
import Header from '../components/Header'
import { site } from '../mocks/data'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const d = site.adminDashboard

  const formatCurrency = (n: number) => {
    return '$' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">Panel de Control</h1>
            <p className="text-gray-600">Bienvenido, visualiza el desempeño de tu negocio</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-2">Total Viajes</p>
                  <p className="text-3xl font-bold text-primary">{d.kpis.totalTrips}</p>
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">+12% vs mes anterior</p>
                </div>
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="material-icons text-2xl text-primary">directions_car</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-2">Ingresos Totales</p>
                  <p className="text-3xl font-bold text-secondary">{formatCurrency(d.kpis.totalRevenue)}</p>
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">+18% vs mes anterior</p>
                </div>
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="material-icons text-2xl text-secondary">attach_money</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-2">Viajes Pendientes</p>
                  <p className="text-3xl font-bold text-yellow-600">{d.kpis.pendingTrips}</p>
                  <p className="text-xs text-gray-500 mt-2">Requieren atención</p>
                </div>
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="material-icons text-2xl text-yellow-600">hourglass_empty</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-2">Vehículos Activos</p>
                  <p className="text-3xl font-bold text-green-600">{d.kpis.activeVehicles}</p>
                  <p className="text-xs text-gray-500 mt-2">Operativos</p>
                </div>
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="material-icons text-2xl text-green-600">directions_bus</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-icons">trending_up</span> Ingresos por Tipo de Servicio
              </h3>
              <div className="h-40 flex items-end gap-4">
                {d.revenueByService.map((s) => (
                  <div key={s.label} className="flex-1">
                    <div style={{height: `${Math.max(30, (s.value / 520000) * 160)}px`}} className="bg-blue-600 rounded-t-md"></div>
                    <div className="text-xs text-gray-600 mt-2 truncate">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-icons">business</span> Top 5 Clientes
              </h3>
              <div className="space-y-3">
                {d.topClients.map((c) => (
                  <div key={c.name} className="flex items-center justify-between pb-2 border-b">
                    <span className="text-sm text-gray-700">{c.name}</span>
                    <span className="text-sm font-bold text-secondary">{formatCurrency(c.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-icons">calendar_month</span> Viajes por Mes
              </h3>
              <div className="h-40 flex items-end">
                {d.tripsByMonth.map((v, i) => (
                  <div key={i} style={{height: `${Math.max(20, ((v - 160) / 100) * 160)}px`}} className="flex-1 mx-1 bg-blue-700 rounded-md"></div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-icons">pie_chart</span> Ocupación de Vehículos
              </h3>
              <div className="h-40 flex flex-col justify-center items-center">
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">{d.vehicleOccupancy.occupied} ocupados</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-icons">list</span> Últimos Viajes Realizados
            </h3>

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
                  {d.recentTrips.map((t) => (
                    <tr key={t.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-3 px-4 text-sm text-primary font-bold">{t.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{t.client}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{t.driver}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{t.origin}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{t.dest}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{t.date}</td>
                      <td className="py-3 px-4 text-sm font-bold text-secondary">{formatCurrency(t.fare)}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">{t.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-center">
              <Link to="/trips" className="text-secondary font-bold text-sm flex items-center gap-1 justify-center hover:gap-2 transition-all">Ver todos los viajes <span className="material-icons text-sm">arrow_forward</span></Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
