import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, ArrowRight, Search, Filter, AlertCircle, Loader2 } from 'lucide-react';
import { tripService } from '../../services/trip.service';
import { Trip, TripStatus } from '../../types/trip.types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

/**
 * ServiceHistoryPage
 * Historial de servicios (trips) para el cliente.
 */
const ServiceHistoryPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const data = await tripService.getMyTrips();
      // Ordenar por fecha de creación descendente (más recientes primero)
      const sorted = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setTrips(sorted);
    } catch (err) {
      console.error('Error fetching trips:', err);
      setError('No se pudieron cargar los viajes. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeVariant = (status: TripStatus) => {
    switch (status) {
      case TripStatus.COMPLETED:
        return 'success';
      case TripStatus.CANCELLED:
        return 'error';
      case TripStatus.IN_PROGRESS:
      case TripStatus.ON_WAY:
        return 'warning';
      default:
        return 'info';
    }
  };

  const getStatusLabel = (status: TripStatus) => {
    switch (status) {
      case TripStatus.REQUESTED: return 'Solicitado';
      case TripStatus.ASSIGNED: return 'Conductor Asignado';
      case TripStatus.ON_WAY: return 'En Camino';
      case TripStatus.IN_PROGRESS: return 'En Viaje';
      case TripStatus.COMPLETED: return 'Completado';
      case TripStatus.CANCELLED: return 'Cancelado';
      default: return status;
    }
  };

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = 
      trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || trip.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mis Viajes</h1>
          <p className="text-gray-500">Historial de solicitudes y traslados realizados.</p>
        </div>
        <Link to="/client/request">
          <Button variant="primary" className="bg-secondary hover:bg-orange-600">
            Nuevo Viaje
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="bg-white p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por destino, origen o ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">Todos los estados</option>
              <option value="COMPLETED">Completados</option>
              <option value="PENDING">Pendientes</option>
              <option value="CANCELLED">Cancelados</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-primary" size={40} />
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-red-50 rounded-lg border border-red-100">
          <AlertCircle className="mx-auto text-red-500 mb-2" size={32} />
          <p className="text-red-700">{error}</p>
          <Button variant="outline" onClick={fetchTrips} className="mt-4">Reintentar</Button>
        </div>
      ) : filteredTrips.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-dashed border-gray-300">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-medium text-gray-800">No tienes viajes registrados</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            {searchTerm || statusFilter !== 'ALL' 
              ? 'No se encontraron resultados con los filtros actuales.'
              : '¿Necesitas un traslado? Solicita tu primer viaje ahora.'}
          </p>
          {(searchTerm || statusFilter !== 'ALL') ? (
            <Button variant="outline" onClick={() => { setSearchTerm(''); setStatusFilter('ALL'); }}>
              Limpiar Filtros
            </Button>
          ) : (
            <Link to="/client/request">
              <Button variant="primary">Solicitar Servicio</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTrips.map((trip) => (
            <div 
              key={trip.id} 
              className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                   trip.status === TripStatus.COMPLETED ? 'bg-green-100 text-green-600' : 
                   trip.status === TripStatus.CANCELLED ? 'bg-red-100 text-red-600' :
                   'bg-blue-100 text-blue-600'
                }`}>
                   <MapPin size={24} />
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-800 text-lg">
                      {trip.destination}
                    </span>
                    <Badge variant={getStatusBadgeVariant(trip.status)}>
                      {getStatusLabel(trip.status)}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      De: {trip.origin}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(trip.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {new Date(trip.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right pl-4 border-l border-gray-100 md:w-auto w-full justify-between md:justify-end">
                <div>
                   <p className="text-sm text-gray-400 font-medium uppercase">Tarifa</p>
                   <p className="text-xl font-bold text-gray-900">
                     ${trip.fare ? trip.fare.toLocaleString('es-CL') : '0'}
                   </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceHistoryPage;
