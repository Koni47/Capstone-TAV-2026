import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  Search, 
  MapPin, 
  Phone, 
  Star, 
  Car, 
  CheckCircle2, 
  Clock, 
  User, 
  FileText,
  X 
} from "lucide-react";
import { Badge } from "../../components/ui/Badge";

// Mock Data
const MOCK_DRIVERS = [
    {
        id: '1',
        name: 'Juan Pérez García',
        email: 'juan.perez@elloa.cl',
        phone: '+56 9 8765 4321',
        rating: 4.8,
        vehicle: {
            id: 'v1',
            plate: 'LHYT-88',
            model: 'Toyota Hiace',
            year: 2023,
            status: 'AVAILABLE'
        },
        assignedTrips: 2
    },
    {
        id: '2',
        name: 'Carlos Rodríguez López',
        email: 'carlos.rodriguez@elloa.cl',
        phone: '+56 9 9876 5432',
        rating: 4.6,
        vehicle: {
            id: 'v2',
            plate: 'LHYT-89',
            model: 'Mercedes Sprinter',
            year: 2022,
            status: 'ON_ROUTE'
        },
        assignedTrips: 3
    },
    {
        id: '3',
        name: 'Miguel Fernández Silva',
        email: 'miguel.fernandez@elloa.cl',
        phone: '+56 9 7654 3210',
        rating: 4.9,
        vehicle: {
            id: 'v3',
            plate: 'LHYT-90',
            model: 'Ford Transit',
            year: 2024,
            status: 'AVAILABLE'
        },
        assignedTrips: 1
    },
    {
        id: '4',
        name: 'Roberto González Martínez',
        email: 'roberto.gonzalez@elloa.cl',
        phone: '+56 9 6543 2109',
        rating: 4.5,
        vehicle: {
            id: 'v4',
            plate: 'LHYT-91',
            model: 'Toyota Coaster',
            year: 2021,
            status: 'MAINTENANCE'
        },
        assignedTrips: 0
    }
];

const MOCK_PENDING_REQUESTS = [
    {
        id: 'req-001',
        origin: 'Aeropuerto Santiago',
        destination: 'Faena Minera La Moneda',
        date: '2025-01-22T09:00:00',
        pax: 4,
        client: "Minera Escondida"
    },
    {
        id: 'req-002',
        origin: 'Centro Comercial Las Condes',
        destination: 'Hotel W Santiago',
        date: '2025-01-22T14:30:00',
        pax: 2,
        client: "Codelco"
    },
    {
        id: 'req-003',
        origin: 'Terminal de Buses',
        destination: 'Residencia Corporativa',
        date: '2025-01-22T16:00:00',
        pax: 6,
        client: "Particular"
    }
];

const DispatchPage = () => {
    const [drivers, setDrivers] = useState(MOCK_DRIVERS);
    const [requests, setRequests] = useState(MOCK_PENDING_REQUESTS);
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
    const [selectedRequestId, setSelectedRequestId] = useState<string>("");

    const handleAssignClick = (driverId: string) => {
        setSelectedDriverId(driverId);
        setIsModalOpen(true);
        setSelectedRequestId("");
    };

    const confirmAssignment = () => {
        if (!selectedDriverId || !selectedRequestId) return;

        alert(`Solicitud ${selectedRequestId} asignada al conductor ${selectedDriverId} correctamente.`);
        
        // Update mock state (remove request from list)
        setRequests(prev => prev.filter(r => r.id !== selectedRequestId));
        
        // Update driver status (mock)
        setDrivers(prev => prev.map(d => {
            if (d.id === selectedDriverId) {
                return { 
                    ...d, 
                    assignedTrips: d.assignedTrips + 1,
                    vehicle: { ...d.vehicle, status: 'ON_ROUTE' }
                };
            }
            return d;
        }));

        setIsModalOpen(false);
    };

    const getStatusStyle = (status: string) => {
        switch(status) {
            case 'AVAILABLE': return { bg: 'bg-green-100', text: 'text-green-800', label: 'Disponible' };
            case 'ON_ROUTE': return { bg: 'bg-blue-100', text: 'text-blue-800', label: 'En Ruta' };
            case 'MAINTENANCE': return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Mantención' };
            default: return { bg: 'bg-gray-100', text: 'text-gray-800', label: status };
        }
    };

    const selectedRequest = requests.find(r => r.id === selectedRequestId);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                     <nav className="flex text-sm text-gray-500 mb-1">
                        <ol className="flex items-center space-x-2">
                            <li><Link to="/admin/dashboard" className="hover:text-primary transition">Inicio</Link></li>
                            <li><span className="text-gray-400">/</span></li>
                            <li className="text-secondary font-medium">Despacho de Unidades</li>
                        </ol>
                    </nav>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                        <MapPin className="text-primary bg-blue-100 p-1 rounded-lg" size={32} />
                        Disponibilidad de Flota
                    </h2>
                    <p className="text-gray-500 mt-1">Monitoreo en tiempo real y asignación de solicitudes.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 shadow-sm transition">
                        <Search size={18} /> Buscar Chofer
                    </button>
                    <div className="bg-primary text-white px-4 py-2 rounded-lg font-bold shadow-md flex items-center gap-2">
                        <Clock size={18} /> {requests.length} Pendientes
                    </div>
                </div>
            </div>

            {/* Drivers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {drivers.map(driver => {
                    const status = getStatusStyle(driver.vehicle.status);
                    return (
                        <div key={driver.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition duration-300 group">
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-primary to-[#004488] text-white p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-full bg-secondary ring-2 ring-white/30 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                                            {driver.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg leading-tight">{driver.name}</h3>
                                            <p className="text-blue-200 text-xs">{driver.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 space-y-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Phone size={16} className="text-secondary" />
                                    <span>{driver.phone}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                    <span className="font-bold text-gray-900">{driver.rating}</span>
                                    <span className="text-gray-400">({driver.assignedTrips} viajes hoy)</span>
                                </div>

                                <div className="border-t border-gray-100 pt-4 mt-2">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-1">
                                        <Car size={12} /> Vehículo Asignado
                                    </p>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-bold text-primary text-sm">{driver.vehicle.model}</span>
                                            <Badge variant={driver.vehicle.status === 'AVAILABLE' ? 'success' : driver.vehicle.status === 'MAINTENANCE' ? 'error' : 'info'}>
                                                {status.label}
                                            </Badge>
                                        </div>
                                        <div className="text-xs text-gray-500 space-y-1">
                                            <div className="flex justify-between">
                                                <span>Patente:</span>
                                                <span className="font-mono text-gray-700">{driver.vehicle.plate}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Año:</span>
                                                <span>{driver.vehicle.year}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="bg-gray-50 p-4 border-t border-gray-100">
                                <button 
                                    onClick={() => handleAssignClick(driver.id)}
                                    disabled={driver.vehicle.status !== 'AVAILABLE'}
                                    className="w-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-primary disabled:cursor-not-allowed font-bold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <FileText size={18} /> Asignar Solicitud
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Assignment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="bg-primary px-6 py-4 flex items-center justify-between shrink-0">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <FileText size={20} className="text-secondary" /> Asignar Solicitud
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white transition">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar Solicitud Pendiente</label>
                                <select 
                                    className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none text-sm"
                                    value={selectedRequestId}
                                    onChange={(e) => setSelectedRequestId(e.target.value)}
                                >
                                    <option value="">-- Seleccione una solicitud --</option>
                                    {requests.map(req => (
                                        <option key={req.id} value={req.id}>
                                            {req.id} - {req.origin.substring(0, 15)}... ➔ {req.destination.substring(0, 15)}...
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedRequest && (
                                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 space-y-3 animate-fadeIn">
                                    <div className="flex items-start gap-3">
                                        <User size={18} className="text-primary mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 font-bold uppercase">Cliente</p>
                                            <p className="text-sm font-medium text-gray-900">{selectedRequest.client}</p>
                                            <p className="text-xs text-gray-600">{selectedRequest.pax} pasajeros</p>
                                        </div>
                                    </div>
                                    <div className="border-t border-blue-100 my-2"></div>
                                    <div className="flex items-start gap-3">
                                        <MapPin size={18} className="text-green-600 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 font-bold uppercase">Origen</p>
                                            <p className="text-sm font-medium text-gray-900">{selectedRequest.origin}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin size={18} className="text-red-600 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 font-bold uppercase">Destino</p>
                                            <p className="text-sm font-medium text-gray-900">{selectedRequest.destination}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Clock size={18} className="text-orange-600 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 font-bold uppercase">Horario</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {new Date(selectedRequest.date).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                             {/* Empty State if no requests */}
                             {requests.length === 0 && (
                                 <div className="text-center py-8 text-gray-500">
                                     <CheckCircle2 size={48} className="mx-auto text-green-500 mb-2 opacity-50" />
                                     <p>No hay solicitudes pendientes por asignar.</p>
                                 </div>
                             )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3 justify-end shrink-0">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={confirmAssignment}
                                disabled={!selectedRequestId}
                                className="px-5 py-2 rounded-lg bg-secondary text-white font-bold hover:bg-orange-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <CheckCircle2 size={18} /> Confirmar Asignación
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DispatchPage;
