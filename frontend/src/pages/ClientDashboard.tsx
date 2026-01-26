import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler)

interface Trip {
  id: string
  title: string
  status: string
  origin: string
  destination: string
  scheduledDate: string
  fare: number
}

export default function ClientDashboard() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api/v1'
      const response = await fetch(`${API_BASE_URL}/trips`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error('Failed to fetch trips')
      }
      const data = await response.json()
      setTrips(data.trips || [])
    } catch (error) {
      console.error('Error fetching trips:', error)
      setTrips([])
    } finally {
      setLoading(false)
    }
  }

  // Calcular KPIs
  const currentMonth = new Date().getMonth()
  const tripsThisMonth = trips.filter(
    (trip) => new Date(trip.scheduledDate).getMonth() === currentMonth
  ).length
  const totalSpent = trips
    .filter((trip) => trip.status === 'FINALIZADO')
    .reduce((sum, trip) => sum + (trip.fare || 0), 0)
  const scheduledTrips = trips.filter((trip) => trip.status === 'PENDIENTE' || trip.status === 'ASIGNADO').length
  const completedTrips = trips.filter((trip) => trip.status === 'FINALIZADO')
  const upcomingTrips = trips.filter((trip) => trip.status === 'ASIGNADO' || trip.status === 'EN_RUTA')

  // Datos para gráfico de gastos mensuales
  const monthlyData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Gasto Mensual ($)',
        data: [180000, 195000, 165000, 225000, 240000, totalSpent],
        borderColor: '#FF6600',
        backgroundColor: 'rgba(255, 102, 0, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#FF6600',
        pointBorderWidth: 2,
        pointRadius: 4,
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Datos para gráfico de distribución
  const distributionData = {
    labels: ['Corporativo', 'Turismo', 'Personal'],
    datasets: [
      {
        data: [8, 3, 1],
        backgroundColor: ['#003366', '#FF6600', '#cbd5e1'],
        hoverOffset: 4,
        borderWidth: 0,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#003366',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
    cutout: '75%',
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <Header />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <nav className="flex text-sm text-gray-500 mb-1" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li>
                    <a href="/" className="hover:text-primary transition">
                      Inicio
                    </a>
                  </li>
                  <li>
                    <span className="text-gray-400">/</span>
                  </li>
                  <li className="text-gray-800 font-medium">Dashboard Cliente</li>
                </ol>
              </nav>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Mi Panel de Control</h1>
              <p className="text-gray-500 mt-1">Resumen de actividad, viajes y estado de cuenta.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right mr-2">
                <p className="text-sm font-medium text-gray-900">Saldo Disponible</p>
                <p className="text-xs text-secondary font-bold">Línea de Crédito</p>
              </div>
              <div className="text-2xl font-bold text-gray-900">$1.500.000</div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Viajes Mes */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="p-1.5 bg-blue-50 rounded-lg text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </span>
                <span className="text-sm font-semibold text-gray-600">Viajes este Mes</span>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-gray-900">{tripsThisMonth}</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  +2
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">vs. mes anterior</p>
            </div>

            {/* Gasto Total */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="p-1.5 bg-orange-50 rounded-lg text-secondary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="text-sm font-semibold text-gray-600">Consumo Total</span>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-gray-900">${(totalSpent / 1000).toFixed(0)}k</h3>
              </div>
              <p className="text-xs text-gray-500 mt-2">Facturación cierre de mes</p>
            </div>

            {/* Programados */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="p-1.5 bg-blue-50 rounded-lg text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="text-sm font-semibold text-gray-600">Programados</span>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-gray-900">{scheduledTrips}</h3>
                <span className="text-sm text-gray-500 font-medium">viajes</span>
              </div>
              <p className="text-xs text-orange-600 font-medium mt-2 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>{' '}
                1 por confirmar
              </p>
            </div>

            {/* Calificación */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="p-1.5 bg-green-50 rounded-lg text-green-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
                <span className="text-sm font-semibold text-gray-600">Nivel Cliente</span>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-gray-900">Oro</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  4.8 ⭐
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Acceso a tarifas preferenciales</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gasto Mensual Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>{' '}
                  Evolución de Gastos
                </h3>
              </div>
              <div className="relative h-64 w-full">
                <Line data={monthlyData} options={chartOptions} />
              </div>
            </div>

            {/* Distribución Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>{' '}
                  Distribución de Viajes
                </h3>
              </div>
              <div className="relative h-64 w-full flex justify-center">
                <Doughnut data={distributionData} options={doughnutOptions} />
              </div>
            </div>
          </div>

          {/* Próximos Viajes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">Próximos Viajes</h3>
              <a
                href="/service-request"
                className="flex items-center gap-1 text-sm font-medium text-primary hover:text-secondary transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>{' '}
                Solicitar Nuevo
              </a>
            </div>

            <div className="divide-y divide-gray-100">
              {loading ? (
                <div className="p-8 text-center text-gray-500">Cargando viajes...</div>
              ) : upcomingTrips.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No hay viajes próximos</div>
              ) : (
                upcomingTrips.slice(0, 2).map((trip) => (
                  <div
                    key={trip.id}
                    className="p-4 hover:bg-blue-50/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 text-primary flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-gray-900">{trip.title}</h4>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              trip.status === 'EN_RUTA'
                                ? 'bg-blue-100 text-blue-800'
                                : trip.status === 'ASIGNADO'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {trip.status === 'EN_RUTA' ? 'En Ruta' : trip.status === 'ASIGNADO' ? 'Confirmado' : 'Pendiente'}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 mt-1">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>{' '}
                            {new Date(trip.scheduledDate).toLocaleDateString('es-CL')}
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>{' '}
                            {trip.origin} → {trip.destination}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex flex-row sm:flex-col justify-between items-end">
                      <span className="text-lg font-bold text-gray-900">${trip.fare?.toLocaleString() || 'N/A'}</span>
                      <button className="text-sm text-secondary font-medium hover:underline">Ver detalles</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Historial Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Historial Reciente</h3>
              <a href="#" className="text-sm font-medium text-primary hover:text-secondary transition">
                Ver todos →
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ruta</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Chofer</th>
                    <th className="text-right py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Monto</th>
                    <th className="text-center py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">
                        Cargando historial...
                      </td>
                    </tr>
                  ) : completedTrips.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">
                        No hay viajes finalizados
                      </td>
                    </tr>
                  ) : (
                    completedTrips.slice(0, 3).map((trip) => (
                      <tr key={trip.id} className="hover:bg-gray-50 transition">
                        <td className="py-4 px-6 text-sm text-gray-600">
                          {new Date(trip.scheduledDate).toLocaleDateString('es-CL')}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-800 font-medium">
                          {trip.origin} → {trip.destination}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600">Juan Pérez</td>
                        <td className="py-4 px-6 text-sm font-bold text-gray-900 text-right">
                          ${trip.fare?.toLocaleString() || 'N/A'}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Finalizado
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}