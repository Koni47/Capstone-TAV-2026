import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { 
  CreditCard, 
  MapPin, 
  LayoutDashboard, 
  Wallet,
  Star,
  Clock,
  ArrowRight
} from "lucide-react";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { Link } from "react-router-dom";

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement,
  ArcElement,
  LineElement, 
  PointElement,
  Title, 
  Tooltip, 
  Legend 
);

const ClientDashboard = () => {
  const { user } = useAuth(); // Asumimos rol Cliente

  // Mock Data
  const stats = [
    { label: "Viajes Mes", value: "15", icon: LayoutDashboard, color: "text-primary", bg: "", border: 'border-l-4 border-primary' },
    { label: "Gasto Total", value: "$450k", icon: Wallet, color: "text-secondary", bg: "", border: 'border-l-4 border-secondary' },
    { label: "Próximos", value: "2", icon: Clock, color: "text-green-600", bg: "", border: 'border-l-4 border-green-600' },
    { label: "Mi Nivel", value: "Gold", icon: Star, color: "text-yellow-600", bg: "", border: 'border-l-4 border-yellow-500' }
  ];

  const expenseData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [{
      label: 'Gasto Mensual ($)',
      data: [120000, 150000, 180000, 140000, 200000, 250000],
      borderColor: '#FF6600',
      backgroundColor: 'rgba(255, 102, 0, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  const tripsDistributionData = {
    labels: ['Personal', 'Corporativo', 'Turismo'],
    datasets: [{
      data: [40, 50, 10],
      backgroundColor: ['#003366', '#FF6600', '#66BB6A'],
      borderWidth: 0
    }]
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
           <nav className="text-sm text-gray-500 mb-1">Inicio / Panel</nav>
           <h1 className="text-3xl font-bold text-gray-900">Mi Panel de Control</h1>
           <p className="text-gray-500">Resumen de actividad, viajes y estado de cuenta</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
             <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Saldo Disponible</p>
                <p className="text-xs text-secondary font-bold">Línea de Crédito</p>
            </div>
             <div className="text-2xl font-bold text-gray-900">$1.5M</div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 relative overflow-hidden group hover:shadow-md transition ${stat.border}`}>
             <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${stat.color}`}>
                <stat.icon size={64} />
             </div>
             <div className="relative z-10">
               <div className="flex items-center gap-2 mb-2">
                 <stat.icon className={stat.color} size={24} />
                 <span className="text-sm font-medium text-gray-500 uppercase">{stat.label}</span>
               </div>
               <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
             </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
               <Wallet size={20} className="text-secondary" /> Historial de Gastos
            </h3>
            <div className="h-64">
               <Line data={expenseData} options={{ responsive: true, plugins: { legend: { display: false } }, maintainAspectRatio: false }} />
            </div>
         </div>

         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
               <LayoutDashboard size={20} className="text-primary" /> Distribución de Servicios
            </h3>
            <div className="h-64 flex justify-center">
               <Doughnut data={tripsDistributionData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
         </div>

      </div>

      {/* Próximos Viajes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
             <h3 className="text-lg font-bold text-gray-900">Próximos Viajes</h3>
             <Link to="/client/request" className="flex items-center gap-1 text-sm font-medium text-primary hover:text-secondary transition">
                Solicitar Nuevo <ArrowRight size={14} />
             </Link>
          </div>
          <div className="divide-y divide-gray-100">
             {[1, 2].map(i => (
                <div key={i} className="p-4 hover:bg-gray-50 transition flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold">
                           <LayoutDashboard size={20} />
                        </div>
                        <div>
                           <p className="font-bold text-gray-900">Traslado Ejecutivo</p>
                           <p className="text-sm text-gray-500">Hoy, 18:00 hrs • 2 Pasajeros</p>
                        </div>
                    </div>
                    <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4">
                        <div className="text-right">
                           <p className="font-bold text-gray-900">$15.000</p>
                           <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full font-medium">Asignando Chófer</span>
                        </div>
                        <button className="p-2 hover:bg-gray-200 rounded-full text-gray-400">
                           <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
             ))}
          </div>
      </div>

    </div>
  );
};

export default ClientDashboard;
