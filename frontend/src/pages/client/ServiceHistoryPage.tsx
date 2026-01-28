import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Clock, ArrowRight, Download, Search, Filter } from "lucide-react";

/**
 * ServiceHistoryPage
 * Historial de servicios (trips) para el cliente.
 * Basado en trips.html pero adaptado a la vista de cliente.
 */
const ServiceHistoryPage = () => {
    // Mock Data
    const trips = [
        { id: "TR-8842", date: "27 Ene 2026", time: "14:30", origin: "Aeropuerto CJC", destination: "Hotel Diego de Almagro", status: "PENDING", price: "$53.550", driver: "Pendiente" },
        { id: "TR-8801", date: "15 Ene 2026", time: "09:00", origin: "Centro Calama", destination: "Mina Chuquicamata", status: "COMPLETED", price: "$35.000", driver: "Juan Pérez" },
        { id: "TR-8750", date: "10 Dic 2025", time: "18:45", origin: "Mall Plaza", destination: "Aeropuerto CJC", status: "COMPLETED", price: "$22.000", driver: "Pedro Díaz" },
        { id: "TR-8720", date: "05 Dic 2025", time: "21:00", origin: "Hotel Geotel", destination: "Restaurante Adobe", status: "CANCELLED", price: "$0", driver: "-" },
    ];

    const getStatusBadge = (status: string) => {
        switch(status) {
            case "COMPLETED": return <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">COMPLETADO</span>;
            case "PENDING": return <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold">PROGRAMADO</span>;
            case "CANCELLED": return <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">CANCELADO</span>;
            default: return <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold">{status}</span>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                   <h1 className="text-3xl font-bold text-gray-900">Historial de Servicios</h1>
                   <p className="text-gray-500">Revisa el estado y detalle de tus traslados.</p>
                </div>
                <Link to="/client/request" className="bg-secondary text-white px-5 py-2.5 rounded-lg font-bold shadow-md hover:bg-orange-600 transition flex items-center gap-2">
                    Nuevo Servicio <ArrowRight size={18} />
                </Link>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    <input type="text" placeholder="Buscar por destino o ID..." className="pl-10 w-full border border-gray-300 rounded-lg py-2 focus:ring-primary focus:border-primary" />
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 text-gray-700 font-medium">
                        <Filter size={18} /> Filtrar
                    </button>
                    <select className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 cursor-pointer focus:ring-primary focus:border-primary">
                        <option>Todos los estados</option>
                        <option>Completados</option>
                        <option>Pendientes</option>
                    </select>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">ID Servicio</th>
                                <th className="px-6 py-4">Fecha / Hora</th>
                                <th className="px-6 py-4">Ruta</th>
                                <th className="px-6 py-4">Conductor</th>
                                <th className="px-6 py-4">Pago</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {trips.map((trip) => (
                                <tr key={trip.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-bold text-primary">{trip.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900 flex items-center gap-1"><Calendar size={12} /> {trip.date}</span>
                                            <span className="text-gray-500 flex items-center gap-1"><Clock size={12} /> {trip.time}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="flex items-center gap-1 text-xs text-gray-500"><MapPin size={10} className="text-green-600" /> {trip.origin}</span>
                                            <span className="flex items-center gap-1 text-xs text-gray-500"><MapPin size={10} className="text-red-500" /> {trip.destination}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{trip.driver}</td>
                                    <td className="px-6 py-4 font-bold">{trip.price}</td>
                                    <td className="px-6 py-4">{getStatusBadge(trip.status)}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-gray-400 hover:text-primary transition p-2" title="Descargar Boleta">
                                            <Download size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {/* Pagination (Visual) */}
                 <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                    <span>Mostrando 4 de 12 registros</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>Anterior</button>
                        <button className="px-3 py-1 border rounded hover:bg-gray-50">Siguiente</button>
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default ServiceHistoryPage;
