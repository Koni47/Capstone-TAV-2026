import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { getServiceRequests, getVehicles, createTrip, getUsers } from '../services/api';

export default function ServiceRequest() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [selectedRequestForAssign, setSelectedRequestForAssign] = useState<any>(null);

  const openDetailModal = (request: any) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedRequest(null);
  };

  const openAssignModal = async (request: any) => {
    try {
      setSelectedRequestForAssign(request);
      
      // Cargar choferes con sus vehículos asignados
      const usersData: any = await getUsers();
      console.log('Users data:', usersData);
      const allUsers = usersData.users || usersData || [];
      const driversWithRole = allUsers.filter((user: any) => user.role?.nombre === 'CHOFER' || user.role === 'CHOFER');
      console.log('Drivers:', driversWithRole);
      
      // Cargar vehículos para relacionarlos con choferes
      const vehiclesData: any = await getVehicles();
      console.log('Vehicles raw data:', vehiclesData);
      const allVehicles = Array.isArray(vehiclesData) ? vehiclesData : (vehiclesData.data || vehiclesData.vehicles || []);
      console.log('Vehicles array:', allVehicles);
      
      // Relacionar choferes con sus vehículos
      const driversWithVehicles = driversWithRole.map((driver: any) => {
        console.log('Looking for vehicle for driver:', driver.id, driver.name || driver.nombre);
        const assignedVehicle = Array.isArray(allVehicles) ? allVehicles.find((v: any) => {
          console.log('Checking vehicle:', v.patente, 'choferId:', v.choferId, 'chofer:', v.chofer);
          return v.choferId === driver.id || v.chofer?.id === driver.id || v.driverId === driver.id;
        }) : null;
        console.log('Assigned vehicle for', driver.name || driver.nombre, ':', assignedVehicle);
        return { ...driver, vehicle: assignedVehicle };
      });
      
      console.log('Drivers with vehicles:', driversWithVehicles);
      setDrivers(driversWithVehicles);
      
      setShowAssignModal(true);
    } catch (err: any) {
      console.error('Error loading drivers:', err);
      console.error('Error details:', err.response);
      alert('Error al cargar los choferes: ' + (err.message || 'Error desconocido'));
    }
  };

  const closeAssignModal = () => {
    setShowAssignModal(false);
    setSelectedRequestForAssign(null);
  };

  const handleAssignDriver = async (driverId: string, vehicleId: string) => {
    if (!selectedRequestForAssign) return;
    
    if (!vehicleId) {
      alert('El chofer seleccionado no tiene un vehículo asignado');
      return;
    }
    
    try {
      console.log('Creating trip with:', {
        serviceRequestId: selectedRequestForAssign.id,
        vehicleId: vehicleId,
        driverId: driverId,
        status: 'AGENDADO'
      });
      
      await createTrip({
        serviceRequestId: selectedRequestForAssign.id,
        vehicleId: vehicleId,
        driverId: driverId,
        status: 'AGENDADO'
      });
      
      console.log('Trip created successfully, reloading requests...');
      
      // Recargar datos inmediatamente y mostrar logs
      const data: any = await getServiceRequests();
      console.log('Reloaded requests after assignment:', data);
      const updatedRequests = data.requests || data || [];
      console.log('Updated requests array:', updatedRequests);
      console.log('Request we just assigned:', updatedRequests.find((r: any) => r.id === selectedRequestForAssign.id));
      setRequests(updatedRequests);
      
      alert('Chofer y vehículo asignados exitosamente');
      closeAssignModal();
      
    } catch (err: any) {
      console.error('Error assigning driver:', err);
      alert(err.response?.data?.message || 'Error al asignar el chofer');
    }
  };

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserRole(user.role);
      if (user.role === 'CHOFER') {
        navigate('/portal-choferes');
        return;
      }
    }

    const fetchRequests = async () => {
      try {
        setLoading(true);
        const data: any = await getServiceRequests();
        setRequests(data.requests || data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching service requests:', err);
        setError('Error al cargar solicitudes');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [navigate]);

  const totalRequests = requests.length;
  const pendingCount = requests.filter(r => r.status === 'PENDIENTE').length;
  const inRouteCount = requests.filter(r => r.status === 'EN_RUTA' || r.status === 'AGENDADO').length;
  const completedCount = requests.filter(r => r.status === 'COMPLETADO').length;

  return (
    <div className="bg-surface font-sans text-gray-800 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex-1 min-w-0">
            <nav className="flex text-sm text-gray-500 mb-1" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li><button onClick={() => navigate('/')} className="hover:text-primary transition">Inicio</button></li>
                <li><span className="text-gray-400">/</span></li>
                <li className="text-gray-800 font-medium">Solicitudes</li>
              </ol>
            </nav>
            <h2 className="text-2xl font-bold leading-7 text-primary sm:text-3xl sm:truncate flex items-center gap-2">
              <span className="material-icons">assignment</span> Gestión de Solicitudes
            </h2>
          </div>
          {userRole !== 'ADMIN' && (
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-secondary hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition shadow-md">
                <span className="material-icons mr-2 text-sm">add_circle</span>
                Nueva Solicitud
              </button>
            </div>
          )}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-8">
              <div className="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">Total Mes</dt>
                    <dd className="mt-1 text-3xl font-bold text-gray-900">{totalRequests}</dd>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                    <span className="material-icons">summarize</span>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">Pendientes</dt>
                    <dd className="mt-1 text-3xl font-bold text-orange-600">{pendingCount}</dd>
                  </div>
                  <div className="bg-orange-50 p-2 rounded-full text-orange-600">
                    <span className="material-icons">pending_actions</span>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">En Ruta</dt>
                    <dd className="mt-1 text-3xl font-bold text-blue-600">{inRouteCount}</dd>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                    <span className="material-icons">local_shipping</span>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">Completadas</dt>
                    <dd className="mt-1 text-3xl font-bold text-green-600">{completedCount}</dd>
                  </div>
                  <div className="bg-green-50 p-2 rounded-full text-green-600">
                    <span className="material-icons">task_alt</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            {requests.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <span className="material-icons text-gray-300 text-6xl mb-4">description</span>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No hay solicitudes registradas</h3>
                <p className="text-gray-500">Las solicitudes de servicio aparecerán aquí cuando se creen.</p>
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-xl border border-gray-100 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID / Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Ruta</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Chofer / Vehículo</th>
                      <th className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requests.map((request: any) => (
                      <tr key={request.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">#{request.id.slice(0, 8)}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(request.requestedAt).toLocaleDateString('es-CL')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">
                            {request.company?.name || request.client?.fullName || 'N/A'}
                          </div>
                          <div className="text-xs text-gray-500">Cliente</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <span className="material-icons text-xs text-green-500">trip_origin</span>
                            {request.origin}
                          </div>
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <span className="material-icons text-xs text-red-500">location_on</span>
                            {request.destination}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                            request.status === 'AGENDADO' ? 'bg-green-100 text-green-800' :
                            request.status === 'CANCELADO' ? 'bg-red-100 text-red-800' :
                            request.status === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          {request.trip?.driver ? (
                            <>
                              <div className="text-sm text-gray-900">{request.trip.driver.fullName || request.trip.driver.name}</div>
                              <div className="text-xs text-gray-500">{request.trip.vehicle?.patente || request.trip.vehicle?.plate || 'N/A'}</div>
                            </>
                          ) : request.status === 'PENDIENTE' ? (
                            <button
                              onClick={() => openAssignModal(request)}
                              className="px-3 py-1 bg-secondary text-white rounded-lg hover:bg-orange-700 text-xs"
                            >
                              Asignar
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400">Sin asignar</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openDetailModal(request)}
                            className="text-primary hover:text-blue-900"
                          >
                            Ver detalle
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>

      {/* Modal de Detalle */}
      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeDetailModal}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6" onClick={(e) => e.stopPropagation()}>
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button onClick={closeDetailModal} className="bg-white rounded-md text-gray-400 hover:text-gray-500">
                  <span className="material-icons">close</span>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <span className="material-icons text-primary">description</span>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                  <h3 className="text-lg leading-6 font-bold text-gray-900">
                    Detalle de Solicitud #{selectedRequest.id.slice(0, 8)}
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                      <span className="text-sm font-medium text-gray-500">Estado:</span>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        selectedRequest.status === 'AGENDADO' ? 'bg-green-100 text-green-800' :
                        selectedRequest.status === 'CANCELADO' ? 'bg-red-100 text-red-800' :
                        selectedRequest.status === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedRequest.status}
                      </span>
                    </div>

                    <div className="pb-3 border-b border-gray-200">
                      <span className="text-sm font-medium text-gray-500">Cliente:</span>
                      <p className="text-base font-semibold text-gray-900 mt-1">
                        {selectedRequest.company?.name || selectedRequest.client?.fullName || 'N/A'}
                      </p>
                      {selectedRequest.company?.email && (
                        <p className="text-sm text-gray-500">{selectedRequest.company.email}</p>
                      )}
                    </div>

                    <div className="pb-3 border-b border-gray-200">
                      <span className="text-sm font-medium text-gray-500">Ruta:</span>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">{selectedRequest.origin}</p>
                          <p className="text-xs text-gray-500">Origen</p>
                        </div>
                        <span className="material-icons text-gray-400">arrow_forward</span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">{selectedRequest.destination}</p>
                          <p className="text-xs text-gray-500">Destino</p>
                        </div>
                      </div>
                    </div>

                    <div className="pb-3 border-b border-gray-200">
                      <span className="text-sm font-medium text-gray-500">Fecha solicitada:</span>
                      <p className="text-base text-gray-900 mt-1">
                        {new Date(selectedRequest.requestedAt).toLocaleString('es-CL', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>

                    <div className="pb-3 border-b border-gray-200">
                      <span className="text-sm font-medium text-gray-500">Chofer asignado:</span>
                      {selectedRequest.trip?.driver ? (
                        <div className="mt-2 flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                            {selectedRequest.trip.driver.fullName?.charAt(0) || 'C'}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{selectedRequest.trip.driver.fullName}</p>
                            <p className="text-xs text-gray-500">{selectedRequest.trip.driver.email}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2 p-3 bg-yellow-50 rounded-lg">
                          <p className="text-sm text-yellow-800 flex items-center gap-2">
                            <span className="material-icons text-sm">info</span>
                            {selectedRequest.status === 'PENDIENTE' 
                              ? 'Pendiente de asignación'
                              : 'Sin chofer asignado'}
                          </p>
                        </div>
                      )}
                    </div>

                    {selectedRequest.trip?.vehicle && (
                      <div className="pb-3 border-b border-gray-200">
                        <span className="text-sm font-medium text-gray-500">Vehículo asignado:</span>
                        <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-semibold text-gray-900">
                            {selectedRequest.trip.vehicle.brand} {selectedRequest.trip.vehicle.model}
                          </p>
                          <p className="text-xs text-gray-500 font-mono">Patente: {selectedRequest.trip.vehicle.plate}</p>
                        </div>
                      </div>
                    )}

                    {selectedRequest.notes && (
                      <div className="pb-3">
                        <span className="text-sm font-medium text-gray-500">Observaciones:</span>
                        <p className="text-sm text-gray-700 mt-1 p-3 bg-gray-50 rounded-lg">
                          {selectedRequest.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={closeDetailModal}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-blue-900 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Asignación de Vehículo */}
      {showAssignModal && selectedRequestForAssign && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeAssignModal}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span className="material-icons text-primary">person</span>
                    Asignar Chofer a Solicitud
                  </h3>
                  <button onClick={closeAssignModal} className="text-gray-400 hover:text-gray-500">
                    <span className="material-icons">close</span>
                  </button>
                </div>
                
                <div className="mb-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-gray-500">#{selectedRequestForAssign.id.slice(0, 8)}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {selectedRequestForAssign.company?.name || selectedRequestForAssign.client?.fullName}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <span className="material-icons text-xs text-green-500">trip_origin</span>
                    {selectedRequestForAssign.origin}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <span className="material-icons text-xs text-red-500">location_on</span>
                    {selectedRequestForAssign.destination}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  Seleccione un chofer disponible:
                </p>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {drivers.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <span className="material-icons text-4xl mb-2">person_off</span>
                      <p>No hay choferes disponibles</p>
                    </div>
                  ) : (
                    drivers.map((driver: any) => (
                      <div key={driver.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="material-icons text-primary">person</span>
                              <span className="font-semibold text-gray-900">{driver.name || driver.nombre} {driver.lastName || driver.apellido}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              Email: {driver.email}
                            </div>
                            {driver.vehicle ? (
                              <div className="text-sm text-gray-900 mt-1 flex items-center gap-1">
                                <span className="material-icons text-xs">directions_car</span>
                                <span className="font-medium">Vehículo: {driver.vehicle.patente}</span>
                              </div>
                            ) : (
                              <div className="text-sm text-gray-400 mt-1">
                                Sin vehículo asignado
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              console.log('Driver selected:', driver);
                              console.log('Vehicle:', driver.vehicle);
                              console.log('Vehicle ID:', driver.vehicle?.id);
                              handleAssignDriver(driver.id, driver.vehicle?.id);
                            }}
                            className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-orange-700 text-sm"
                          >
                            Asignar
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
