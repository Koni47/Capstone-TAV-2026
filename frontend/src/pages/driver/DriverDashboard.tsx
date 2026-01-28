import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { 
  BarChart3, 
  MapPin, 
  Car, 
  Wallet,
  Star,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
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
import { Bar, Doughnut } from 'react-chartjs-2';

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

const DriverDashboard = () => {
  const { user } = useAuth(); // Asumimos rol Chofer

  // Mock Data
  const stats = [
    { label: "Viajes Hoy", value: "8", icon: Car, color: "text-blue-600", bg: "bg-blue-100", border: 'border-blue-500' },
    { label: "Ganancias Hoy", value: "$125k", icon: Wallet, color: "text-orange-600", bg: "bg-orange-100", border: 'border-orange-500' },
    { label: "Calificación", value: "4.9", icon: Star, color: "text-yellow-600", bg: "bg-yellow-100", border: 'border-yellow-500' },
    { label: "Vehículo", value: "OK", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100", border: 'border-green-500' }
  ];

  const weeklyIncomeData = {
    labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
    datasets: [{
      label: 'Ganancias',
      data: [180, 220, 190, 250, 280, 0, 0],
      backgroundColor: '#FF6600',
      borderRadius: 4
    }]
  };

  const tripTypeData = {
    labels: ['Corta', 'Media', 'Larga'],
    datasets: [{
      data: [35, 45, 20],
      backgroundColor: ['#66BB6A', '#FFA726', '#EF5350'],
      borderWidth: 0
    }]
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Mi Panel Chofer</h1>
        <p className="text-gray-600">Bienvenido, {user?.fullName || "Conductor"}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${stat.border} hover:shadow-md transition`}>
             <div className="flex items-center justify-between">
                <div>
                   <p className="text-sm font-semibold text-gray-500 uppercase">{stat.label}</p>
                   <h3 className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                </div>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <stat.icon size={28} />
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         
         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
               <Wallet size={20} /> Ganancias Semanal
            </h3>
            <div className="h-64">
               <Bar data={weeklyIncomeData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
         </div>

         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
               <BarChart3 size={20} /> Distribución de Viajes
            </h3>
            <div className="h-64 flex justify-center">
               <Doughnut data={tripTypeData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
         </div>

      </div>

      {/* Next Trips */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
         <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <Clock size={20} /> Mis Próximos Viajes
         </h3>
         
         <div className="space-y-4">
            {[1, 2, 3].map((i) => (
               <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-blue-50/50 border-l-4 border-blue-500 rounded-r-lg hover:bg-blue-50 transition">
                  <div className="space-y-1">
                     <p className="font-bold text-gray-900">Pasajero: Juan Pérez</p>
                     <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={14} /> <span>Origen: Aeropuerto CJC</span>
                        <span className="mx-1">→</span>
                        <span>Destino: Centro Calama</span>
                     </div>
                  </div>
                   <div className="mt-2 sm:mt-0 text-right">
                      <p className="text-sm font-bold text-blue-900">Hoy, 15:30</p>
                      <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded font-bold mt-1">ASIGNADO</span>
                   </div>
               </div>
            ))}
         </div>
      </div>

    </div>
  );
};

export default DriverDashboard;
