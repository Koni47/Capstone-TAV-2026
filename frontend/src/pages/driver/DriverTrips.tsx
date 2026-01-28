// import { useEffect, useState } from "react";
import { useMyTrips } from "../../hooks/useMyTrips";
import { Card, CardHeader, CardContent, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { MapPin, User, Calendar, Clock, Navigation, CheckCircle2, PlayCircle, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const DriverTrips = () => {
  const { trips, loading, error, updateTripStatus } = useMyTrips();

  if (loading) return <div className="p-10 flex justify-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div></div>;
  if (error) return <div className="text-red-500 p-10 text-center bg-red-50 rounded-lg mx-6 border border-red-200">{error}</div>;

  const activeTrip = trips.find(t => t.status === "ON_WAY" || t.status === "IN_PROGRESS");
  const assignedTrips = trips.filter(t => t.status === "ASSIGNED");
  const pastTrips = trips.filter(t => t.status === "COMPLETED" || t.status === "CANCELLED");

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4 md:p-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
                <Briefcase size={32} className="text-secondary" />
                Gestión de Viajes
            </h1>
            <p className="text-gray-600 mt-1">Administra tus rutas y asignaciones</p>
        </div>
      </div>

      {/* Active Trip Section - Highlighted */}
      {activeTrip && (
        <Card className="border-l-4 border-l-green-500 shadow-xl ring-1 ring-black/5 animate-pulse-slow bg-gradient-to-r from-white to-green-50/30">
          <CardHeader className="border-b border-gray-100 pb-4">
             <div className="flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-100 rounded-full animate-pulse">
                        <Navigation size={24} className="text-green-600" />
                    </div>
                    <div>
                        <CardTitle className="text-xl text-primary">Viaje en Curso</CardTitle>
                        <p className="text-sm text-green-700 font-medium">#{activeTrip.id}</p>
                    </div>
                 </div>
                 <Badge variant="success" className="px-4 py-1 text-base">{activeTrip.status.replace("_", " ")}</Badge>
             </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Route Info */}
                <div className="space-y-6 relative">
                    <div className="absolute left-3 top-3 bottom-10 w-0.5 bg-gray-200 border-l border-dashed border-gray-300"></div>
                    
                    <div className="relative pl-10">
                        <div className="absolute left-0 top-1 p-1 bg-green-100 rounded-full border border-white shadow-sm ring-4 ring-white z-10">
                            <MapPin size={16} className="text-green-600"/>
                        </div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Punto de Partida</p>
                        <p className="text-lg font-semibold text-gray-900 leading-tight">{activeTrip.origin}</p>
                    </div>

                    <div className="relative pl-10">
                        <div className="absolute left-0 top-1 p-1 bg-red-100 rounded-full border border-white shadow-sm ring-4 ring-white z-10">
                            <MapPin size={16} className="text-red-600"/>
                        </div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Destino</p>
                        <p className="text-lg font-semibold text-gray-900 leading-tight">{activeTrip.destination}</p>
                    </div>
                </div>

                {/* Client & Actions */}
                <div className="bg-white/50 rounded-xl p-4 border border-gray-100 space-y-4">
                     <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                            {activeTrip.clientName ? activeTrip.clientName.substring(0,2).toUpperCase() : "CL"}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">{activeTrip.clientName || "Cliente"}</p>
                            <p className="text-xs text-gray-500">Pasajero Principal</p>
                        </div>
                     </div>
                     <div className="flex gap-3">
                         <button className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-blue-900 transition font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
                             <Navigation size={18} /> Ver Mapa GPS
                         </button>
                         <button 
                            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
                            onClick={() => updateTripStatus(activeTrip.id, "finish")}
                        >
                             <CheckCircle2 size={18} /> Finalizar Viaje
                         </button>
                     </div>
                </div>
             </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs / Section Headers */}
      <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
              <button className="border-secondary text-primary whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2">
                  <span className="material-icons text-base">assignment</span> Mis Solicitudes Asignadas
                  <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs ml-2">{assignedTrips.length}</span>
              </button>
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2">
                  <span className="material-icons text-base">history</span> Historial
              </button>
          </nav>
      </div>

      {/* Table: Assigned Trips */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ruta / Origen - Destino</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Cliente</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha / Hora</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                        <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Acción</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {assignedTrips.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="bg-gray-100 p-3 rounded-full">
                                        <CheckCircle2 size={24} className="text-gray-400"/>
                                    </div>
                                    <p>No tienes viajes asignados pendientes.</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        assignedTrips.map((trip) => (
                            <tr key={trip.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                    #{trip.id.substring(0,6)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1 max-w-xs">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> {trip.origin}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> {trip.destination}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                            <User size={12}/>
                                        </div>
                                        <span className="text-sm text-gray-700">{trip.clientName}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                           <Calendar size={12} className="text-gray-400"/>
                                           {format(new Date(trip.date), "dd MMM yyyy", { locale: es })}
                                        </div>
                                        <div className="flex items-center gap-1">
                                           <Clock size={12} className="text-gray-400"/>
                                           {format(new Date(trip.date), "HH:mm", { locale: es })}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge variant="default" className="bg-blue-100 text-blue-800 border-blue-200">
                                        ASIGNADO
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        onClick={() => updateTripStatus(trip.id, "start")}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-white hover:bg-blue-900 rounded-md transition text-xs font-semibold shadow-sm"
                                        disabled={!!activeTrip}
                                        title={activeTrip ? "Ya tienes un viaje en curso" : "Comenzar viaje"}
                                    >
                                        <PlayCircle size={14} /> Comenzar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
          </div>
      </div>
      
      {pastTrips.length > 0 && (
         <div className="pt-8">
             <h3 className="text-lg font-bold text-gray-800 mb-4 opacity-75">Historial Reciente</h3>
             {/* Simple list for history - keep it clean */}
             <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 opacity-75 grayscale hover:grayscale-0 transition duration-500">
                {/* ... (Existing simpler list for history logic could go here, or just reuse table) */}
                 <p className="text-sm text-gray-500 text-center">Mostrando últimos {pastTrips.length} viajes completados.</p>
             </div>
         </div>
      )}

    </div>
  );
};

export default DriverTrips;
