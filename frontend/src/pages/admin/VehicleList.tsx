import { useState } from "react";
// import { useVehicles } from "../../hooks/useVehicles"; // Hook commented out for now to focus on UI
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
// import { Button } from "../../components/ui/Button"; // Replaced with Tailwind button
import { Link } from "react-router-dom";
import { 
    Loader2, 
    Plus, 
    Truck, 
    Search, 
    Filter, 
    MoreVertical, 
    Settings,
    FileText
} from "lucide-react";

/**
 * VehicleList
 * Updated to match vehicles.html mockup.
 */
const VehicleList = () => {
  const [page, setPage] = useState(1);
  // Mock Data instead of hook for now
  const loading = false;
  const error = null;
  const vehicles = [
      { id: 1, plate: "JD-20-21", model: "Toyota Hilux", year: 2024, status: "AVAILABLE", nextMaintenance: "15/03/2026", type: "Camioneta" },
      { id: 2, plate: "KK-LL-99", model: "Mercedes Sprinter", year: 2023, status: "IN_USE", nextMaintenance: "01/02/2026", type: "Van/Minibus" },
      { id: 3, plate: "XX-YY-12", model: "Nissan Navara", year: 2022, status: "MAINTENANCE", nextMaintenance: "PENDIENTE", type: "Camioneta" },
  ];

  /*
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "AVAILABLE": return <Badge variant="success">Disponible</Badge>;
      case "IN_USE": return <Badge variant="info">En Uso</Badge>;
      case "MAINTENANCE": return <Badge variant="warning">Mantenimiento</Badge>;
      case "OUT_OF_SERVICE": return <Badge variant="error">Fuera de Servicio</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };
  */
  // New Badge Style matching users.html/vehicles.html
   const getStatusBadge = (status: string) => {
    switch (status) {
      case "AVAILABLE": return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Disponible</span>;
      case "IN_USE": return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">En Ruta</span>;
      case "MAINTENANCE": return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Taller</span>;
      default: return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <nav className="flex text-sm text-gray-500 mb-1">
              <ol className="flex items-center space-x-2">
                 <li><Link to="/admin/dashboard" className="hover:text-primary transition">Inicio</Link></li>
                 <li><span className="text-gray-400">/</span></li>
                 <li className="text-primary font-medium">Gestión de Flota</li>
              </ol>
           </nav>
           <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Truck className="text-primary" /> Flota de Vehículos
           </h1>
           <p className="text-gray-500 mt-1">Administra la flota, mantenciones y documentación.</p>
        </div>
        
        <button className="bg-primary hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-2 font-bold">
           <Plus size={20} /> Nuevo Vehículo
        </button>
      </div>
      
      {/* KPI Stats Row (Optional if in mockup) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
             <span className="text-xs font-bold text-gray-400 uppercase">Total Flota</span>
             <div className="text-2xl font-bold text-gray-900 mt-1">24</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
             <span className="text-xs font-bold text-green-600 uppercase">Disponibles</span>
             <div className="text-2xl font-bold text-gray-900 mt-1">18</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
             <span className="text-xs font-bold text-blue-600 uppercase">En Ruta</span>
             <div className="text-2xl font-bold text-gray-900 mt-1">4</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
             <span className="text-xs font-bold text-yellow-600 uppercase">Taller</span>
             <div className="text-2xl font-bold text-gray-900 mt-1">2</div>
          </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input type="text" placeholder="Buscar por patente o modelo..." className="pl-10 w-full border border-gray-300 rounded-lg py-2 focus:ring-primary focus:border-primary" />
         </div>
         <div className="flex gap-2">
             <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 text-gray-700 font-medium">
                <Filter size={18} /> Filtros
             </button>
         </div>
      </div>

      {error && <div className="text-red-500 font-medium">{error}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200 font-semibold">
                <tr>
                  <th className="px-6 py-4">Vehículo</th>
                  <th className="px-6 py-4">Tipo</th>
                  <th className="px-6 py-4">Año</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4">Próx. Mantención</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                   <tr><td colSpan={6} className="text-center py-8"><Loader2 className="mx-auto animate-spin"/></td></tr>
                ) : (
                   vehicles.map((v) => (
                      <tr key={v.id} className="hover:bg-gray-50 transition group">
                         <td className="px-6 py-4">
                            <div className="font-bold text-gray-900">{v.plate}</div>
                            <div className="text-xs text-gray-500">{v.model}</div>
                         </td>
                         <td className="px-6 py-4 text-gray-600">{v.type}</td>
                         <td className="px-6 py-4 text-gray-600">{v.year}</td>
                         <td className="px-6 py-4">{getStatusBadge(v.status)}</td>
                         <td className="px-6 py-4">
                             <div className="flex items-center gap-2 text-gray-600">
                                <Settings size={14} /> {v.nextMaintenance}
                             </div>
                         </td>
                         <td className="px-6 py-4 text-right">
                             <div className="flex items-center justify-end gap-2">
                                <button className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-full transition" title="Ver Documentos">
                                   <FileText size={18} />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition">
                                   <MoreVertical size={18} />
                                </button>
                             </div>
                         </td>
                      </tr>
                   ))
                )}
              </tbody>
            </table>
          </div>
      </div>
    
    </div>
  );
};

export default VehicleList;
