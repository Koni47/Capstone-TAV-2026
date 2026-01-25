import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HtmlMockRenderer from '../components/HtmlMockRenderer';
import { getHtmlMock } from '../services/mockApi';
import Header from '../components/Header';
import { getServiceRequestStats, getTrips, getVehicles, recalculateAllFares } from '../services/api';

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
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalViajes: 0,
    ingresosTotales: 0,
    pendientes: 0,
    flotaActiva: 0,
    flotaTotal: 0,
    ultimosViajes: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Obtener estadísticas de solicitudes
        const stats: any = await getServiceRequestStats();
        console.log('Service request stats:', stats);
        
        // Obtener viajes
        const tripsData: any = await getTrips();
        const trips = Array.isArray(tripsData) ? tripsData : tripsData.trips || [];
        
        // Obtener vehículos
        const vehiclesData: any = await getVehicles();
        const vehicles = Array.isArray(vehiclesData) ? vehiclesData : vehiclesData.vehicles || [];
        
        // Procesar datos
        const totalTrips = trips.length;
        const pendingRequests = stats.PENDIENTE || 0;
        
        // Calcular flota activa (vehículos en uso)
        const activeVehicles = vehicles.filter((v: any) => 
          v.status === 'ACTIVO' || v.currentDriver
        ).length;
        
        // Calcular ingresos estimados desde los trips finalizados
        const estimatedIncome = trips
          .filter((t: any) => t.status === 'FINALIZADO')
          .reduce((sum: number, t: any) => sum + (t.fare || 0), 0);
        
        // Obtener últimos viajes
        const recentTrips = trips
          .sort((a: any, b: any) => 
            new Date(b.scheduledDate || b.createdAt).getTime() - 
            new Date(a.scheduledDate || a.createdAt).getTime()
          )
          .slice(0, 3);

        setDashboardData({
          totalViajes: totalTrips,
          ingresosTotales: estimatedIncome,
          pendientes: pendingRequests,
          flotaActiva: Math.round((activeVehicles / vehicles.length) * 100),
          flotaTotal: vehicles.length,
          ultimosViajes: recentTrips
        });
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    const handleRecalculateFares = async () => {
      if (!confirm('¿Estás seguro de recalcular todos los montos de viajes existentes? Esta acción no se puede deshacer.')) {
        return;
      }

      try {
        const result: any = await recalculateAllFares();
        alert(`${result.message}\nViajes actualizados: ${result.updatedTrips}\nFórmula: ${result.formula}`);
        // Recargar datos del dashboard
        fetchDashboardData();
      } catch (error) {
        console.error('Error recalculando fares:', error);
        alert('Error al recalcular montos');
      }
    };

    // Exponer función globalmente para el botón
    (window as any).handleRecalculateFares = handleRecalculateFares;

    console.log('Loading Chart.js...');

    // Load Chart.js dynamically
    const loadChartJS = () => {
      if (window.Chart) {
        console.log('Chart.js already loaded, initializing charts...');
        initCharts();
        return;
      }

      console.log('Loading Chart.js from CDN...');
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
      script.onload = () => {
        console.log('Chart.js loaded successfully, initializing charts...');
        initCharts();
      };
      script.onerror = (error) => {
        console.error('Failed to load Chart.js:', error);
      };
      document.head.appendChild(script);
    };

    const initCharts = () => {
      console.log('Initializing charts...');
      try {
        // Chart: Ingresos por Tipo de Servicio
        if (chartServiciosRef.current) {
          console.log('Creating servicios chart...');
          new window.Chart(chartServiciosRef.current, {
            type: 'bar',
            data: {
              labels: ['Transporte Personal', 'Corporativo', 'Turismo', 'Otros'],
              datasets: [{
                label: 'Ingresos ($)',
                data: [450000, 520000, 180000, 95000],
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
          new window.Chart(chartViajesRef.current, {
            type: 'line',
            data: {
              labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
              datasets: [{
                label: 'Viajes Realizados',
                data: [180, 195, 210, 225, 235, 245],
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
          new window.Chart(chartOcupacionRef.current, {
            type: 'doughnut',
            data: {
              labels: ['Ocupados', 'Disponibles', 'Mantenimiento'],
              datasets: [{
                data: [12, 6, 2],
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
    setTimeout(loadChartJS, 100);
  }, []);

  const formatDateInput = (date: Date | null) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(value);
  };

  const generateProfessionalReport = async () => {
    if (!startDate || !endDate) return;

    setGeneratingReport(true);

    try {
      // Crear documento HTML con estilos profesionales
      const reportHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reporte de Gestión - Servicios El Loa</title>
  <style>
    @page { size: A4; margin: 2cm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      color: #2c3e50;
      line-height: 1.6;
      background: white;
    }
    .header {
      text-align: center;
      padding: 30px 0;
      border-bottom: 4px solid #003366;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #003366;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .header .subtitle {
      color: #FF6600;
      font-size: 16px;
      font-weight: 600;
    }
    .header .period {
      color: #666;
      font-size: 14px;
      margin-top: 10px;
    }
    .summary {
      background: linear-gradient(135deg, #003366 0%, #0055aa 100%);
      color: white;
      padding: 25px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    .summary h2 {
      font-size: 20px;
      margin-bottom: 20px;
      border-bottom: 2px solid rgba(255,255,255,0.3);
      padding-bottom: 10px;
    }
    .summary p {
      font-size: 14px;
      line-height: 1.8;
      margin-bottom: 8px;
    }
    .metrics {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }
    .metric-card {
      background: #f8f9fa;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
    }
    .metric-card .label {
      font-size: 13px;
      color: #6c757d;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
      font-weight: 600;
    }
    .metric-card .value {
      font-size: 32px;
      font-weight: 700;
      color: #003366;
      margin-bottom: 5px;
    }
    .metric-card .change {
      font-size: 12px;
      color: #28a745;
      font-weight: 600;
    }
    .section {
      margin-bottom: 30px;
    }
    .section h3 {
      font-size: 18px;
      color: #003366;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid #FF6600;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
      font-size: 13px;
    }
    table thead {
      background: #003366;
      color: white;
    }
    table th {
      padding: 12px;
      text-align: left;
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    table td {
      padding: 12px;
      border-bottom: 1px solid #e9ecef;
    }
    table tbody tr:nth-child(even) {
      background: #f8f9fa;
    }
    table tbody tr:hover {
      background: #e3f2fd;
    }
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .status-completado { background: #d4edda; color: #155724; }
    .status-en-curso { background: #fff3cd; color: #856404; }
    .status-pendiente { background: #f8d7da; color: #721c24; }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e9ecef;
      text-align: center;
      font-size: 12px;
      color: #6c757d;
    }
    .chart-placeholder {
      background: #f8f9fa;
      border: 2px dashed #dee2e6;
      border-radius: 8px;
      padding: 40px;
      text-align: center;
      color: #6c757d;
      margin: 20px 0;
    }
    .highlights {
      background: #fff8e1;
      border-left: 4px solid #FF6600;
      padding: 15px 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .highlights ul {
      list-style: none;
      padding-left: 0;
    }
    .highlights li {
      padding: 5px 0;
      padding-left: 25px;
      position: relative;
    }
    .highlights li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #FF6600;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>SERVICIOS EL LOA</h1>
    <div class="subtitle">Reporte de Gestión Operacional</div>
    <div class="period">Período: ${startDate.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })} - ${endDate.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
    <div class="period">Generado: ${new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
  </div>

  <div class="summary">
    <h2>Resumen Ejecutivo</h2>
    <p><strong>Descripción General:</strong> El presente informe detalla el desempeño operacional y financiero de Servicios El Loa durante el período seleccionado. Se incluyen métricas clave de rendimiento, análisis de la flota vehicular, y estado de las operaciones.</p>
    <p><strong>Conclusión Principal:</strong> Durante el período analizado, la empresa mantiene una operatividad óptima del 90% con un crecimiento sostenido del 12% en servicios completados. Los ingresos totales reflejan un incremento del 18% respecto al período anterior, consolidando la posición de liderazgo en el sector de transporte corporativo.</p>
  </div>

  <div class="metrics">
    <div class="metric-card">
      <div class="label">Total de Viajes</div>
      <div class="value">245</div>
      <div class="change">↑ 12% vs período anterior</div>
    </div>
    <div class="metric-card">
      <div class="label">Ingresos Totales</div>
      <div class="value">${formatCurrency(1245000)}</div>
      <div class="change">↑ 18% vs período anterior</div>
    </div>
    <div class="metric-card">
      <div class="label">Servicios Pendientes</div>
      <div class="value">23</div>
      <div class="change">Requieren atención inmediata</div>
    </div>
    <div class="metric-card">
      <div class="label">Flota Activa</div>
      <div class="value">90%</div>
      <div class="change">18 de 20 vehículos operativos</div>
    </div>
  </div>

  <div class="highlights">
    <strong>Puntos Destacados del Período:</strong>
    <ul>
      <li>Incremento del 12% en viajes completados, consolidando el crecimiento trimestral</li>
      <li>Tasa de cumplimiento del 95% en puntualidad de servicios</li>
      <li>90% de operatividad de flota, dentro del rango óptimo establecido</li>
      <li>Ingresos por transporte corporativo representan el 42% del total</li>
      <li>Satisfacción del cliente mantiene promedio de 4.7/5.0</li>
    </ul>
  </div>

  <div class="section">
    <h3>Análisis por Tipo de Servicio</h3>
    <table>
      <thead>
        <tr>
          <th>Tipo de Servicio</th>
          <th>Cantidad Viajes</th>
          <th>Ingresos</th>
          <th>% del Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Transporte Corporativo</td>
          <td>103</td>
          <td>${formatCurrency(520000)}</td>
          <td>42%</td>
        </tr>
        <tr>
          <td>Transporte Personal</td>
          <td>95</td>
          <td>${formatCurrency(450000)}</td>
          <td>36%</td>
        </tr>
        <tr>
          <td>Turismo</td>
          <td>32</td>
          <td>${formatCurrency(180000)}</td>
          <td>15%</td>
        </tr>
        <tr>
          <td>Otros Servicios</td>
          <td>15</td>
          <td>${formatCurrency(95000)}</td>
          <td>7%</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <h3>Top 5 Clientes del Período</h3>
    <table>
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Viajes</th>
          <th>Ingresos</th>
          <th>% del Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Minera ABC</td>
          <td>12</td>
          <td>${formatCurrency(450000)}</td>
          <td>36%</td>
        </tr>
        <tr>
          <td>Constructora XYZ</td>
          <td>8</td>
          <td>${formatCurrency(320000)}</td>
          <td>26%</td>
        </tr>
        <tr>
          <td>Transportes ABC</td>
          <td>6</td>
          <td>${formatCurrency(250000)}</td>
          <td>20%</td>
        </tr>
        <tr>
          <td>Empresas LMN</td>
          <td>4</td>
          <td>${formatCurrency(150000)}</td>
          <td>12%</td>
        </tr>
        <tr>
          <td>Servicios PQR</td>
          <td>3</td>
          <td>${formatCurrency(75000)}</td>
          <td>6%</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <h3>Estado de la Flota Vehicular</h3>
    <table>
      <thead>
        <tr>
          <th>Estado</th>
          <th>Cantidad</th>
          <th>Porcentaje</th>
          <th>Observaciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="status-badge status-completado">Operativos</span></td>
          <td>12</td>
          <td>60%</td>
          <td>En servicio activo</td>
        </tr>
        <tr>
          <td><span class="status-badge status-en-curso">Disponibles</span></td>
          <td>6</td>
          <td>30%</td>
          <td>Listos para asignación</td>
        </tr>
        <tr>
          <td><span class="status-badge status-pendiente">Mantenimiento</span></td>
          <td>2</td>
          <td>10%</td>
          <td>Mantenimiento programado</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <h3>Últimos Servicios Registrados</h3>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Ruta</th>
          <th>Fecha</th>
          <th>Estado</th>
          <th>Monto</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#VJ-2601</td>
          <td>Minera ABC</td>
          <td>Aeropuerto → Faena Atacama</td>
          <td>20 Ene, 08:30</td>
          <td><span class="status-badge status-completado">Completado</span></td>
          <td>${formatCurrency(85000)}</td>
        </tr>
        <tr>
          <td>#VJ-2600</td>
          <td>Constructora XYZ</td>
          <td>Centro Calama → Obra Norte</td>
          <td>20 Ene, 07:15</td>
          <td><span class="status-badge status-completado">Completado</span></td>
          <td>${formatCurrency(42000)}</td>
        </tr>
        <tr>
          <td>#VJ-2597</td>
          <td>Minera ABC</td>
          <td>Oficina Central → Faena Norte</td>
          <td>19 Ene, 14:20</td>
          <td><span class="status-badge status-en-curso">En Curso</span></td>
          <td>${formatCurrency(95000)}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <h3>Recomendaciones y Conclusiones</h3>
    <div class="highlights">
      <ul>
        <li><strong>Optimización de Recursos:</strong> Mantener el índice de operatividad actual del 90% mediante mantenimiento preventivo programado</li>
        <li><strong>Expansión del Servicio:</strong> Considerar ampliación de flota dados los indicadores de crecimiento del 12% mensual</li>
        <li><strong>Fidelización de Clientes:</strong> Implementar programa de beneficios para los top 5 clientes que representan el 60% de ingresos</li>
        <li><strong>Gestión de Pendientes:</strong> Atender los 23 servicios pendientes para mejorar índices de satisfacción</li>
        <li><strong>Análisis de Rentabilidad:</strong> El segmento corporativo muestra mayor rentabilidad, recomendar focus estratégico</li>
      </ul>
    </div>
  </div>

  <div class="footer">
    <p><strong>Servicios El Loa</strong> | Transporte Corporativo y Privado</p>
    <p>Región de Antofagasta, Chile | www.elloa.cl | contacto@elloa.cl</p>
    <p>Documento confidencial - Uso interno exclusivo</p>
  </div>
</body>
</html>
      `;

      // Crear un blob con el HTML
      const blob = new Blob([reportHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      // Crear un enlace temporal para descargar
      const a = document.createElement('a');
      a.href = url;
      a.download = `Reporte_Gestion_${startDate.toISOString().split('T')[0]}_${endDate.toISOString().split('T')[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Cerrar modal
      setShowDateRangeModal(false);
      setStartDate(null);
      setEndDate(null);
    } catch (error) {
      console.error('Error generando reporte:', error);
      alert('Error al generar el reporte. Por favor intente nuevamente.');
    } finally {
      setGeneratingReport(false);
    }
  };

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
              <p className="text-gray-500 mt-1">Resumen general del rendimiento de la flota y servicios del mes actual.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDateRangeModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition shadow-sm"
              >
                <span className="material-icons text-base">description</span> Exportar Reporte
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
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
                  <h3 className="text-3xl font-bold text-gray-900">{dashboardData.totalViajes}</h3>
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
                  <h3 className="text-3xl font-bold text-gray-900">${(dashboardData.ingresosTotales / 1000000).toFixed(1)}M</h3>
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
                  <h3 className="text-3xl font-bold text-gray-900">{dashboardData.pendientes}</h3>
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
                  <h3 className="text-3xl font-bold text-gray-900">{dashboardData.flotaActiva}%</h3>
                  <span className="text-sm text-gray-500 font-medium">{dashboardData.flotaTotal > 0 ? `${Math.round(dashboardData.flotaActiva * dashboardData.flotaTotal / 100)}/${dashboardData.flotaTotal}` : '0/0'}</span>
                </div>
                <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
                  <span className="material-icons text-xs">check_circle</span> Operatividad óptima
                </p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 bg-secondary w-full opacity-60"></div>
            </div>
          </div>
          )}

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
                <span className="text-xs font-semibold text-gray-500 uppercase">Montos</span>
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
                  {dashboardData.ultimosViajes.length > 0 ? (
                    dashboardData.ultimosViajes.map((trip: any, index: number) => {
                      const statusConfig = {
                        'FINALIZADO': { label: 'Completado', class: 'bg-green-100 text-green-800' },
                        'EN_CURSO': { label: 'En Curso', class: 'bg-yellow-100 text-yellow-800' },
                        'PENDIENTE': { label: 'Pendiente', class: 'bg-blue-100 text-blue-800' },
                        'CANCELADO': { label: 'Cancelado', class: 'bg-red-100 text-red-800' }
                      };
                      const status = statusConfig[trip.status as keyof typeof statusConfig] || { label: trip.status, class: 'bg-gray-100 text-gray-800' };
                      
                      const formatDate = (date: string) => {
                        if (!date) return 'N/A';
                        const d = new Date(date);
                        return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
                      };

                      return (
                        <tr key={trip.id} className="hover:bg-blue-50/30 transition">
                          <td className="py-4 px-6 text-sm font-medium text-primary">#{trip.id}</td>
                          <td className="py-4 px-6 text-sm text-gray-700">{trip.serviceRequest?.client || trip.serviceRequest?.company || 'N/A'}</td>
                          <td className="py-4 px-6 text-sm text-gray-500">{trip.assignedDriver?.name || trip.assignedDriver?.user?.name || 'Sin asignar'}</td>
                          <td className="py-4 px-6 text-sm text-gray-700">
                            <div className="flex flex-col">
                              <span className="font-medium">{trip.pickupLocation || 'N/A'}</span>
                              <span className="text-xs text-gray-400">{trip.dropoffLocation || 'N/A'}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500">{formatDate(trip.scheduledDate || trip.createdAt)}</td>
                          <td className="py-4 px-6 text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.class}`}>{status.label}</span>
                          </td>
                          <td className="py-4 px-6 text-sm font-bold text-gray-900 text-right">${(trip.estimatedCost || 45000).toLocaleString('es-CL')}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-8 px-6 text-center text-sm text-gray-500">No hay viajes recientes</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Date Range Modal */}
      {showDateRangeModal && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity" onClick={() => setShowDateRangeModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl transform transition-transform pointer-events-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <span className="material-icons text-primary">description</span>
                      Generar Reporte
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Selecciona el período para el informe</p>
                  </div>
                  <button onClick={() => setShowDateRangeModal(false)} className="text-gray-400 hover:text-gray-600">
                    <span className="material-icons">close</span>
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Inicio</label>
                    <input
                      type="date"
                      value={formatDateInput(startDate)}
                      onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Fin</label>
                    <input
                      type="date"
                      value={formatDateInput(endDate)}
                      onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                      min={formatDateInput(startDate)}
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <p className="text-xs text-blue-800 flex items-start gap-2">
                    <span className="material-icons text-sm mt-0.5">info</span>
                    <span>El reporte incluirá: Total de viajes, ingresos, servicios pendientes, estado de flota, análisis por tipo de servicio, top clientes y recomendaciones estratégicas.</span>
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDateRangeModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={generateProfessionalReport}
                    disabled={!startDate || !endDate || generatingReport}
                    className="flex-1 bg-primary hover:bg-blue-900 text-white font-medium py-3 rounded-lg transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {generatingReport ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Generando...
                      </>
                    ) : (
                      <>
                        <span className="material-icons text-sm">file_download</span>
                        Generar Reporte
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;