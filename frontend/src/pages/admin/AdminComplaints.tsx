import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  AlertTriangle, 
  Search, 
  Trash2, 
  Eye,
  CheckCircle,
  Filter,
  ShieldAlert,
  Archive,
  MoreVertical
} from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const AdminComplaints = () => {
  // Mock Data
  const [complaints, setComplaints] = useState([
    { 
        id: "DEN-2026-001", 
        type: "Acoso Laboral", 
        subject: "Comportamiento inapropiado de supervisor",
        description: "El supervisor de turno ha tenido conductas...",
        isAnonymous: true,
        date: new Date(2026, 0, 26, 10, 0), 
        status: "PENDING",
        priority: "HIGH"
    },
    { 
        id: "DEN-2026-002", 
        type: "Seguridad", 
        subject: "Vehículo sin cinturones de seguridad traseros",
        description: "La van patente LHYT-88 no tiene cinturones...",
        isAnonymous: false,
        name: "Juan Pérez",
        email: "juan.perez@email.com",
        date: new Date(2026, 0, 25, 16, 30), 
        status: "INVESTIGATING",
        priority: "MEDIUM"
    },
    { 
        id: "DEN-2026-003", 
        type: "Calidad de Servicio", 
        subject: "Chofer manejando a exceso de velocidad",
        description: "En el trayecto a la mina, el conductor...",
        isAnonymous: false,
        name: "María González",
        email: "maria.g@cliente.cl",
        date: new Date(2026, 0, 20, 9, 15), 
        status: "CLOSED",
        priority: "HIGH"
    }
  ]);

  const handleDelete = (id: string) => {
    if (confirm("¿Está seguro de eliminar esta denuncia?")) {
        setComplaints(complaints.filter(c => c.id !== id));
    }
  };

  const getStatusBadge = (status: string) => {
      switch(status) {
          case "PENDING": return <Badge variant="error">Pendiente</Badge>;
          case "INVESTIGATING": return <Badge variant="warning">En Investigación</Badge>;
          case "CLOSED": return <Badge variant="success">Cerrada</Badge>;
          default: return <Badge variant="default">{status}</Badge>;
      }
  };

  const getPriorityColor = (priority: string) => {
      switch(priority) {
          case "HIGH": return "text-red-600 bg-red-50 border-red-100";
          case "MEDIUM": return "text-yellow-600 bg-yellow-50 border-yellow-100";
          case "LOW": return "text-green-600 bg-green-50 border-green-100";
          default: return "text-gray-600";
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
                        <li className="text-secondary font-medium">Canal de Denuncias</li>
                    </ol>
                </nav>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                    <ShieldAlert className="text-primary bg-red-100 p-1 rounded-lg" size={32} />
                    Gestión de Denuncias
                </h2>
                <p className="text-gray-500 mt-1">Seguimiento de casos reportados en el canal ético.</p>
            </div>
            <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 shadow-sm transition">
                    <Filter size={18} /> Filtrar
                </button>
            </div>
        </div>

        {/* Complaints List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                            <th className="p-4">ID / Fecha</th>
                            <th className="p-4">Tipo / Prioridad</th>
                            <th className="p-4">Asunto / Descripción</th>
                            <th className="p-4">Denunciante</th>
                            <th className="p-4">Estado</th>
                            <th className="p-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {complaints.map((complaint) => (
                            <tr key={complaint.id} className="hover:bg-blue-50/50 transition duration-150">
                                <td className="p-4 whitespace-nowrap">
                                    <span className="block font-mono font-bold text-primary text-sm">{complaint.id}</span>
                                    <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                        <Archive size={12} />
                                        {format(complaint.date, "dd MMM yyyy", { locale: es })}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="mb-1 text-sm font-medium text-gray-900">{complaint.type}</div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getPriorityColor(complaint.priority)}`}>
                                        {complaint.priority === 'HIGH' ? 'ALTA' : complaint.priority === 'MEDIUM' ? 'MEDIA' : 'BAJA'}
                                    </span>
                                </td>
                                <td className="p-4 max-w-xs">
                                    <div className="font-bold text-gray-800 text-sm truncate" title={complaint.subject}>
                                        {complaint.subject}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate mt-1" title={complaint.description}>
                                        {complaint.description}
                                    </div>
                                </td>
                                <td className="p-4">
                                    {complaint.isAnonymous ? (
                                        <div className="flex items-center gap-2 text-gray-500 italic text-sm">
                                            <ShieldAlert size={16} /> Anónimo
                                        </div>
                                    ) : (
                                        <div className="text-sm">
                                            <p className="font-medium text-gray-900">{complaint.name}</p>
                                            <p className="text-xs text-gray-500">{complaint.email}</p>
                                        </div>
                                    )}
                                </td>
                                <td className="p-4">
                                    {getStatusBadge(complaint.status)}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end items-center gap-2">
                                        <button className="p-1.5 hover:bg-blue-100 text-blue-600 rounded-lg transition" title="Ver detalle">
                                            <Eye size={18} />
                                        </button>
                                        <button className="p-1.5 hover:bg-green-100 text-green-600 rounded-lg transition" title="Resolver">
                                            <CheckCircle size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(complaint.id)}
                                            className="p-1.5 hover:bg-red-100 text-red-600 rounded-lg transition" 
                                            title="Eliminar"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {complaints.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                    <ShieldAlert className="mx-auto text-gray-300 mb-3" size={48} />
                    <p>No hay denuncias registradas.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default AdminComplaints;
