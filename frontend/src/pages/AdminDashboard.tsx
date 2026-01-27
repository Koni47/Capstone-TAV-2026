import React, { useEffect, useRef, useState } from 'react';
import { useTrips } from '../hooks/useTrips'
import { useVehicles } from '../hooks/useVehicles'
import { useAuth } from '../context/AuthContext'
import reportService from '../services/report.service'
import { useNavigate } from 'react-router-dom';
import HtmlMockRenderer from '../components/HtmlMockRenderer';
import { getHtmlMock } from '../services/mockApi';
import Header from '../components/Header'

// Declare Chart.js types
declare global {
  interface Window {
    Chart: any;
  }
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  // Always use React version for better chart rendering
  return <DashboardWithCharts navigate={navigate} />;
};

// React component with Chart.js integration
const DashboardWithCharts: React.FC<{ navigate: any }> = ({ navigate }) => {
  const chartServiciosRef = useRef<HTMLCanvasElement>(null);
  const chartViajesRef = useRef<HTMLCanvasElement>(null);
  const chartOcupacionRef = useRef<HTMLCanvasElement>(null);
  // Chart instances refs to allow destroying before re-creating
  const serviciosChartInstance = React.useRef<any | null>(null)
  const viajesChartInstance = React.useRef<any | null>(null)
  const ocupacionChartInstance = React.useRef<any | null>(null)

  const { data: trips, loading: loadingTrips, totalTrips, tripsByMonth, recentTrips } = useTrips()
  const { data: vehiclesRaw, loading: loadingVehicles } = useVehicles()
  const vehicles = Array.isArray(vehiclesRaw) ? vehiclesRaw : []
  const { user } = useAuth()
  const [reportData, setReportData] = useState<any | null>(null)

  useEffect(() => {
    console.log('Loading Chart.js...');

    // Load Chart.js dynamically once (use a global promise to avoid double insertion)
    const loadChartJS = () => {
      const w = window as any
      if (w.Chart) {
        initCharts()
        return
      }
      if (!w.__chartjsPromise) {
        console.log('Loading Chart.js from CDN...');
        w.__chartjsPromise = new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js'
          script.onload = () => resolve()
          script.onerror = (e) => reject(e)
          document.head.appendChild(script)
        })
      }
      w.__chartjsPromise
        .then(() => initCharts())
        .catch((err: any) => console.error('Failed to load Chart.js:', err))
    }

    const initCharts = () => {
      console.log('Initializing charts...');
      try {
        // Chart: Ingresos por Tipo de Servicio
        if (chartServiciosRef.current) {
          console.log('Creating servicios chart...');
          // destroy previous instance if exists
          try {
            if (serviciosChartInstance.current) {
              serviciosChartInstance.current.destroy()
              serviciosChartInstance.current = null
            } else {
              // also attempt Chart.getChart if present
              const existing = (window as any).Chart?.getChart?.(chartServiciosRef.current as HTMLCanvasElement)
              if (existing) {
                existing.destroy()
              }
            }
          } catch (e) {
            // ignore destroy errors
          }
          // For now we derive revenues by grouping trips with fare by some category; fallback to mock if none
          const revenueData = [0, 0, 0, 0]
          // simple heuristic: distribute totals
          const totalRevenue = trips.reduce((s, t) => s + (t.fare || 0), 0)
          if (totalRevenue > 0) {
            // split evenly as placeholder
            const per = Math.floor(totalRevenue / 4)
            revenueData[0] = per
            revenueData[1] = per
            revenueData[2] = per
            revenueData[3] = totalRevenue - per * 3
          } else {
            revenueData[0] = 450000
            revenueData[1] = 520000
            revenueData[2] = 180000
            revenueData[3] = 95000
          }

          serviciosChartInstance.current = new window.Chart(chartServiciosRef.current, {
            type: 'bar',
            data: {
              labels: ['Transporte Personal', 'Corporativo', 'Turismo', 'Otros'],
              datasets: [{
                label: 'Ingresos ($)',
                data: revenueData,
                backgroundColor: ['#003366', '#FF6600', '#0066CC', '#66BB6A'],
                borderRadius: 8,
                borderSkipped: false,
              }]
            },
            options: {
              responsive: true,
              plugins: { legend: { display: false } },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function(value: any) {
                      return '$' + value.toLocaleString();
                    }
                  }
                }
              }
            }
          });
        }

        // Chart: Viajes por Mes
        if (chartViajesRef.current) {
          console.log('Creating viajes chart...');
          // destroy previous instance
          try {
            if (viajesChartInstance.current) {
              viajesChartInstance.current.destroy()
              viajesChartInstance.current = null
            } else {
              const existing = (window as any).Chart?.getChart?.(chartViajesRef.current as HTMLCanvasElement)
              if (existing) existing.destroy()
            }
          } catch (e) {}

          const labels = ['-5m', '-4m', '-3m', '-2m', '-1m', 'Ahora']
          const dataPoints = tripsByMonth && tripsByMonth.length === 6 ? tripsByMonth : [180,195,210,225,235,245]
          viajesChartInstance.current = new window.Chart(chartViajesRef.current, {
            type: 'line',
            data: {
              labels,
              datasets: [{
                label: 'Viajes Realizados',
                data: dataPoints,
                borderColor: '#003366',
                backgroundColor: 'rgba(0, 51, 102, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: '#FF6600',
              }]
            },
            options: {
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } }
            }
          });
        }

        // Chart: Ocupación de Vehículos
        if (chartOcupacionRef.current) {
          console.log('Creating ocupacion chart...');
          try {
            if (ocupacionChartInstance.current) {
              ocupacionChartInstance.current.destroy()
              ocupacionChartInstance.current = null
            } else {
              const existing = (window as any).Chart?.getChart?.(chartOcupacionRef.current as HTMLCanvasElement)
              if (existing) existing.destroy()
            }
          } catch (e) {}

          // derive occupancy from vehicles
          const occupied = vehicles?.filter((v: any) => v.status === 'EN_RUTA').length ?? 12
          const available = vehicles ? Math.max(0, vehicles.length - occupied) : 6
          const maintenance = vehicles?.filter((v: any) => v.status === 'MANTENCION').length ?? 2

          ocupacionChartInstance.current = new window.Chart(chartOcupacionRef.current, {
            type: 'doughnut',
            data: {
              labels: ['Ocupados', 'Disponibles', 'Mantenimiento'],
              datasets: [{
                data: [occupied, Math.max(0, available), maintenance],
                backgroundColor: ['#66BB6A', '#FFA726', '#EF5350'],
                borderColor: '#fff',
                borderWidth: 2
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    padding: 20,
                    usePointStyle: true
                  }
                },
                tooltip: {
                  enabled: true,
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                  borderColor: '#fff',
                  borderWidth: 1
                }
              },
              layout: {
                padding: {
                  top: 20,
                  bottom: 20
                }
              }
            }
          });
        }

        console.log('All charts initialized successfully');
      } catch (error) {
        console.error('Error initializing charts:', error);
      }
    };

    // Load Chart.js after a short delay to ensure DOM is ready
    const t = setTimeout(loadChartJS, 100)

    return () => {
      clearTimeout(t)
      // cleanup chart instances on unmount
      try {
        if (serviciosChartInstance.current) {
          serviciosChartInstance.current.destroy()
          serviciosChartInstance.current = null
        }
        if (viajesChartInstance.current) {
          viajesChartInstance.current.destroy()
          viajesChartInstance.current = null
        }
        if (ocupacionChartInstance.current) {
          ocupacionChartInstance.current.destroy()
          ocupacionChartInstance.current = null
        }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Fetch report data for ADMIN to populate charts/kpis
  useEffect(() => {
    if (user?.role === 'ADMIN') {
      ;(async () => {
        const d = await reportService.getDashboard()
        setReportData(d)
      })()
    }
  }, [user])

    return (
    <div className="bg-surface font-sans text-gray-800 min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Panel de Control</h1>
              <p className="text-gray-500 mt-1">Resumen general del rendimiento de la flota y servicios.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
                <span className="material-icons text-base">file_download</span> Exportar
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition shadow-sm">
                <span className="material-icons text-base">add</span> Nuevo Reporte
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-icons text-6xl text-primary transform rotate-12">directions_car</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-1.5 bg-blue-50 rounded-lg text-primary">
                    <span className="material-icons text-xl">directions_car</span>
                  </span>
                  <span className="text-sm font-semibold text-gray-600">Total Viajes</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-bold text-gray-900">{totalTrips ?? 0}</h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">+12%</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Mes actual</p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 bg-primary w-full"></div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-icons text-6xl text-secondary transform rotate-12">payments</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-1.5 bg-orange-50 rounded-lg text-secondary">
                    <span className="material-icons text-xl">payments</span>
                  </span>
                  <span className="text-sm font-semibold text-gray-600">Ingresos Totales</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-bold text-gray-900">{(() => {
                    const totalRevenue = trips.reduce((s, t) => s + (t.fare || 0), 0)
                    return totalRevenue > 0 ? `$${(totalRevenue).toLocaleString()}` : '$1.2M'
                  })()}</h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">+18%</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Mes actual</p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 bg-secondary w-full"></div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-icons text-6xl text-primary transform rotate-12">pending_actions</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-1.5 bg-blue-50 rounded-lg text-primary">
                    <span className="material-icons text-xl">pending_actions</span>
                  </span>
                  <span className="text-sm font-semibold text-gray-600">Pendientes</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-bold text-gray-900">{trips.filter(t => t.status === 'PENDIENTE').length ?? 0}</h3>
                </div>
                <p className="text-xs text-orange-600 font-medium mt-2 flex items-center gap-1">
                  <span className="material-icons text-xs">priority_high</span> Requieren atención
                </p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 bg-primary w-full opacity-60"></div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-icons text-6xl text-secondary transform rotate-12">local_shipping</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-1.5 bg-orange-50 rounded-lg text-secondary">
                    <span className="material-icons text-xl">local_shipping</span>
                  </span>
                  <span className="text-sm font-semibold text-gray-600">Flota Activa</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-bold text-gray-900">{vehicles && vehicles.length > 0 ? `${Math.round(((vehicles.length - (vehicles.filter(v=>v.status!=='DISPONIBLE').length))/vehicles.length)*100) || 0}%` : '90%'}</h3>
                  <span className="text-sm text-gray-500 font-medium">{vehicles ? `${vehicles.filter(v=>v.status==='DISPONIBLE').length}/${vehicles.length}` : '18/20'}</span>
                </div>
                <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
                  <span className="material-icons text-xs">check_circle</span> Operatividad óptima
                </p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 bg-secondary w-full opacity-60"></div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  Ingresos por Servicio
                </h3>
                <button className="text-gray-400 hover:text-primary transition">
                  <span className="material-icons">more_horiz</span>
                </button>
              </div>
              <canvas ref={chartServiciosRef} height="100"></canvas>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Top Clientes</h3>
                <button className="text-xs font-semibold text-primary hover:text-secondary transition uppercase">Ver Todos</button>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-xs">MA</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition">Minera ABC</p>
                      <p className="text-xs text-gray-500">12 Viajes</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">$450k</span>
                </div>

                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-secondary font-bold text-xs">CX</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition">Constructora XYZ</p>
                      <p className="text-xs text-gray-500">8 Viajes</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">$320k</span>
                </div>

                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs">TA</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition">Transportes ABC</p>
                      <p className="text-xs text-gray-500">6 Viajes</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">$250k</span>
                </div>

                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs">EL</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition">Empresas LMN</p>
                      <p className="text-xs text-gray-500">4 Viajes</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">$150k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Stats Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Evolución de Viajes</h3>
              </div>
              <canvas ref={chartViajesRef} height="150"></canvas>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Estado de la Flota</h3>
              </div>
              <div className="flex items-center justify-center" style={{ height: '250px', width: '250px', margin: '0 auto' }}>
                <canvas ref={chartOcupacionRef} width="250" height="250" style={{ maxWidth: '100%', maxHeight: '100%' }}></canvas>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Últimos Viajes</h3>
              <a onClick={() => navigate('/trips')} className="text-sm font-medium text-primary hover:text-secondary transition cursor-pointer">Ver historial completo &rarr;</a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Chofer</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Origen / Destino</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="text-right py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Monto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-blue-50/30 transition">
                    <td className="py-4 px-6 text-sm font-medium text-primary">#VJ-2601</td>
                    <td className="py-4 px-6 text-sm text-gray-700">Minera ABC</td>
                    <td className="py-4 px-6 text-sm text-gray-500">Juan Pérez</td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      <div className="flex flex-col">
                        <span className="font-medium">Aeropuerto</span>
                        <span className="text-xs text-gray-400">Faena Atacama</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">20 Ene, 08:30</td>
                    <td className="py-4 px-6 text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Completado</span>
                    </td>
                    <td className="py-4 px-6 text-sm font-bold text-gray-900 text-right">$85.000</td>
                  </tr>
                  <tr className="hover:bg-blue-50/30 transition">
                    <td className="py-4 px-6 text-sm font-medium text-primary">#VJ-2600</td>
                    <td className="py-4 px-6 text-sm text-gray-700">Constructora XYZ</td>
                    <td className="py-4 px-6 text-sm text-gray-500">Carlos López</td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      <div className="flex flex-col">
                        <span className="font-medium">Centro Calama</span>
                        <span className="text-xs text-gray-400">Obra Norte</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">20 Ene, 07:15</td>
                    <td className="py-4 px-6 text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Completado</span>
                    </td>
                    <td className="py-4 px-6 text-sm font-bold text-gray-900 text-right">$42.000</td>
                  </tr>
                  <tr className="hover:bg-blue-50/30 transition">
                    <td className="py-4 px-6 text-sm font-medium text-primary">#VJ-2597</td>
                    <td className="py-4 px-6 text-sm text-gray-700">Minera ABC</td>
                    <td className="py-4 px-6 text-sm text-gray-500">Francisco Silva</td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      <div className="flex flex-col">
                        <span className="font-medium">Oficina Central</span>
                        <span className="text-xs text-gray-400">Faena Norte</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">19 Ene, 14:20</td>
                    <td className="py-4 px-6 text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">En Curso</span>
                    </td>
                    <td className="py-4 px-6 text-sm font-bold text-gray-900 text-right">$95.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;