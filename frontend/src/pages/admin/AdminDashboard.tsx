import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { 
  Users, 
  MapPin, 
  Car, 
  TrendingUp,
  DollarSign, 
  Activity,
  Calendar
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
);

const AdminDashboard = () => {
  const { user } = useAuth();

  // Mock Data
  const stats = [
    { label: "Total Viajes", value: "1,234", icon: MapPin, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Ingresos Totales", value: "$4.5M", icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
    { label: "Viajes Pendientes", value: "42", icon: Activity, color: "text-orange-600", bg: "bg-orange-100" },
    { label: "Vehículos Activos", value: "18/24", icon: Car, color: "text-purple-600", bg: "bg-purple-100" }
  ];

  const chartData = {
    labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
    datasets: [
      {
        label: 'Viajes Realizados',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: '#003366',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Panel de Control</h1>
          <p className="text-gray-500">Bienvenido de nuevo, {user?.fullName}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition">
            Exportar Reporte
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-800 shadow-sm transition">
            + Nuevo Servicio
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
            <CardContent className="p-6 relative">
              <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${stat.color}`}>
                <stat.icon size={64} />
              </div>
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-500"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" />
              Rendimiento Semanal
            </h3>
            <select className="text-sm border-gray-200 rounded-md focus:ring-primary focus:border-primary">
              <option>Últimos 7 días</option>
              <option>Este Mes</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Top Clients / Quick List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
           <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Users size={20} className="text-primary" />
              Top Clientes
            </h3>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                  E{i}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-800">Empresa Minera {i}</h4>
                  <p className="text-xs text-gray-500">12 viajes este mes</p>
                </div>
                <span className="text-xs font-bold text-green-600">+$1.2M</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Últimos Viajes</h3>
            <button className="text-sm text-primary font-medium hover:underline">Ver todos</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Cliente</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">Origen / Destino</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="hover:bg-gray-50 transition">
                   <td className="px-6 py-4 font-medium text-primary">#TR-202{item}</td>
                   <td className="px-6 py-4">Empresa Minera {item}</td>
                   <td className="px-6 py-4 text-gray-500">27 Ene 2026</td>
                   <td className="px-6 py-4">
                      <div className="flex flex-col">
                          <span>Aeropuerto CJC</span>
                          <span className="text-xs text-gray-400">Hotel Diego de Almagro</span>
                      </div>
                   </td>
                   <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-full">
                        COMPLETADO
                      </span>
                   </td>
                   <td className="px-6 py-4 font-bold">$45.000</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
