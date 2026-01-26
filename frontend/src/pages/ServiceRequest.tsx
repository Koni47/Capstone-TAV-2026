import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { getServiceRequests, getVehicles, createTrip, getUsers, createServiceRequest, updateServiceRequest } from '../services/api';

export default function ServiceRequest() {
  const navigate = useNavigate();
  const location = useLocation();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [isEditingRequest, setIsEditingRequest] = useState(false);
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    companyId: '',
    origin: '',
    destination: '',
    requestedAt: '',
    notes: ''
  });
  const [companies, setCompanies] = useState<any[]>([]);
  const [creatingRequest, setCreatingRequest] = useState(false);
  const [editedRequest, setEditedRequest] = useState<any>(null);
  const [allVehicles, setAllVehicles] = useState<any[]>([]);

  const openDetailModal = async (request: any) => {
    setSelectedRequest(request);
    setEditedRequest(request);
    setIsEditingRequest(false);
    
    // Cargar vehículos y choferes para el modal de edición
    try {
      const vehiclesData: any = await getVehicles();
      const vehicles = Array.isArray(vehiclesData) ? vehiclesData : (vehiclesData.data || vehiclesData.vehicles || []);
      setAllVehicles(vehicles);
      
      const usersData: any = await getUsers();
      const allUsers = usersData.users || usersData || [];
      const driversWithRole = allUsers.filter((user: any) => user.role?.nombre === 'CHOFER' || user.role === 'CHOFER');
      setDrivers(driversWithRole);
    } catch (err) {
      console.error('Error loading data for edit:', err);
    }
    
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedRequest(null);
    setEditedRequest(null);
    setIsEditingRequest(false);
  };

  const handleEditToggle = () => {
    setIsEditingRequest(!isEditingRequest);
    if (!isEditingRequest) {
      setEditedRequest({...selectedRequest});
    }
  };

  const handleEditChange = (field: string, value: any) => {
    setEditedRequest((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEdit = async () => {
    try {
      // Preparar solo los campos que se pueden actualizar por clientes
      const updateData: any = {};
      
      // Campos editables por clientes: origen, destino, fecha y notas
      if (editedRequest.origin !== selectedRequest.origin) updateData.origin = editedRequest.origin;
      if (editedRequest.destination !== selectedRequest.destination) updateData.destination = editedRequest.destination;
      if (editedRequest.requestedAt !== selectedRequest.requestedAt) {
        updateData.requestedDate = new Date(editedRequest.requestedAt).toISOString();
      }
      if (editedRequest.notes !== selectedRequest.notes) updateData.notes = editedRequest.notes;
      
      // Verificar si hay cambios
      if (Object.keys(updateData).length === 0) {
        alert('No hay cambios para guardar');
        setIsEditingRequest(false);
        return;
      }

      console.log('Enviando datos de actualización:', updateData);
      console.log('ID de solicitud:', editedRequest.id);
      console.log('Token de auth:', localStorage.getItem('accessToken') ? 'Presente' : 'Ausente');
      
      // Llamar a la API para actualizar la solicitud
      const response = await updateServiceRequest(editedRequest.id, updateData);
      console.log('Respuesta de actualización:', response);
      
      // Actualizar localmente
      setRequests(requests.map(r => r.id === editedRequest.id ? { ...r, ...updateData } : r));
      setSelectedRequest({ ...selectedRequest, ...updateData });
      setIsEditingRequest(false);
      alert('Solicitud actualizada correctamente');
      
      // Recargar datos
      const data: any = await getServiceRequests();
      setRequests(data.requests || data || []);
    } catch (err: any) {
      console.error('Error updating request:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      alert(`Error al actualizar la solicitud: ${err.response?.data?.message || err.message}`);
    }
  };

  const openNewRequestModal = async () => {
    try {
      // Cargar usuarios con rol EMPRESA o que tengan company asociada
      const usersData: any = await getUsers();
      const allUsers = usersData.users || usersData || [];
      
      // Buscar usuarios que sean EMPRESA o que tengan una company asociada
      const companiesList = allUsers.filter((user: any) => {
        const isEmpresaRole = user.role?.nombre === 'EMPRESA' || user.role === 'EMPRESA';
        const hasCompany = !!user.company;
        return isEmpresaRole || hasCompany;
      });
      
      console.log('Empresas encontradas:', companiesList.length);
      setCompanies(companiesList);
      setShowNewRequestModal(true);
    } catch (err) {
      console.error('Error loading companies:', err);
      alert('Error al cargar empresas');
    }
  };

  const closeNewRequestModal = () => {
    setShowNewRequestModal(false);
    setNewRequest({
      companyId: '',
      origin: '',
      destination: '',
      requestedAt: '',
      notes: ''
    });
  };

  const handleNewRequestChange = (field: string, value: any) => {
    setNewRequest(prev => ({ ...prev, [field]: value }));
  };

  const assignDriverAutomatically = async (serviceRequestId: string) => {
    try {
      console.log('Iniciando asignación automática para solicitud:', serviceRequestId);
      
      // Obtener choferes disponibles
      const usersData: any = await getUsers();
      const allUsers = usersData.users || usersData || [];
      const driversWithRole = allUsers.filter((user: any) => user.role?.nombre === 'CHOFER' || user.role === 'CHOFER');
      
      console.log('Choferes encontrados:', driversWithRole.length);
      
      // Obtener vehículos
      const vehiclesData: any = await getVehicles();
      const allVehicles = Array.isArray(vehiclesData) ? vehiclesData : (vehiclesData.data || vehiclesData.vehicles || []);
      
      console.log('Vehículos encontrados:', allVehicles.length);
      
      // Buscar un chofer con vehículo disponible (sin trip activo)
      let assignedDriver = null;
      let assignedVehicle = null;
      
      // Primero intentar encontrar vehículo con currentDriver
      for (const driver of driversWithRole) {
        const vehicle = allVehicles.find((v: any) => {
          // Buscar vehículo asignado a este chofer
          const hasDriver = v.currentDriver?.id === driver.id;
          console.log(`Vehículo ${v.licensePlate}: currentDriver=${v.currentDriver?.id}, buscando=${driver.id}, match=${hasDriver}`);
          return hasDriver;
        });
        
        if (vehicle) {
          assignedDriver = driver;
          assignedVehicle = vehicle;
          console.log('Chofer y vehículo encontrados:', driver.fullName || driver.name, vehicle.licensePlate);
          break;
        }
      }
      
      // Si no encuentra con currentDriver, asignar el primer chofer y primer vehículo disponible
      if (!assignedDriver && driversWithRole.length > 0 && allVehicles.length > 0) {
        assignedDriver = driversWithRole[0];
        assignedVehicle = allVehicles[0];
        console.log('Asignando primer chofer y vehículo disponible:', assignedDriver.fullName || assignedDriver.name, assignedVehicle.licensePlate);
      }
      
      if (assignedDriver && assignedVehicle) {
        console.log('Creando trip con:', {
          serviceRequestId,
          vehicleId: assignedVehicle.id,
          driverId: assignedDriver.id,
          driverName: assignedDriver.fullName || assignedDriver.name,
          vehiclePlate: assignedVehicle.licensePlate
        });
        
        // Crear el trip automáticamente
        const tripResponse = await createTrip({
          serviceRequestId: serviceRequestId,
          vehicleId: assignedVehicle.id,
          driverId: assignedDriver.id,
          status: 'ASIGNADO'
        });
        
        console.log('Trip creado exitosamente:', tripResponse);
        return true;
      } else {
        console.warn('No hay choferes con vehículo disponible');
        return false;
      }
    } catch (err) {
      console.error('Error en asignación automática:', err);
      return false;
    }
  };

  const handleCreateRequest = async () => {
    // Validar campos
    if (!newRequest.companyId || !newRequest.origin || !newRequest.destination || !newRequest.requestedAt) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }
    
    setCreatingRequest(true);
    try {
      // Preparar datos para enviar
      const requestData = {
        companyId: newRequest.companyId,
        origin: newRequest.origin,
        destination: newRequest.destination,
        requestedDate: new Date(newRequest.requestedAt).toISOString(),
        passengers: 1,
        notes: newRequest.notes || undefined
      };
      
      console.log('Enviando solicitud:', requestData);
      
      // Crear la solicitud
      const response: any = await createServiceRequest(requestData);
      
      console.log('Solicitud creada:', response);
      
      // Asignar chofer automáticamente
      const requestId = response.id || response.data?.id;
      if (requestId) {
        console.log('Intentando asignar chofer automáticamente a solicitud:', requestId);
        const assigned = await assignDriverAutomatically(requestId);
        
        // Esperar un momento para que el backend procese
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Recargar datos para obtener la solicitud con el trip asignado
        const data: any = await getServiceRequests();
        const updatedRequests = data.requests || data || [];
        setRequests(updatedRequests);
        
        // Buscar la solicitud recién creada para verificar
        const createdRequest = updatedRequests.find((r: any) => r.id === requestId);
        console.log('Solicitud actualizada:', createdRequest);
        
        if (assigned && createdRequest?.trip?.driver) {
          alert(`Solicitud creada y asignada a ${createdRequest.trip.driver.fullName || createdRequest.trip.driver.name}`);
        } else if (assigned) {
          alert('Solicitud creada y chofer asignado automáticamente');
        } else {
          alert('Solicitud creada. No hay choferes disponibles en este momento');
        }
      } else {
        // Recargar datos de todas formas
        const data: any = await getServiceRequests();
        setRequests(data.requests || data || []);
      }
      
      closeNewRequestModal();
    } catch (err: any) {
      console.error('Error creating request:', err);
      console.error('Error response:', err.response);
      console.error('Error data:', err.response?.data);
      console.error('Error message array:', err.response?.data?.message);
      
      let errorMessage = 'Error desconocido';
      if (err.response?.data?.message) {
        if (Array.isArray(err.response.data.message)) {
          errorMessage = err.response.data.message.join(', ');
          console.error('Mensajes de validación:', err.response.data.message);
        } else {
          errorMessage = err.response.data.message;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      alert('Error al crear la solicitud:\n' + errorMessage);
    } finally {
      setCreatingRequest(false);
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
        console.log('Cargando solicitudes de servicio...');
        const data: any = await getServiceRequests();
        console.log('Solicitudes recibidas:', data);
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
  }, [navigate, location.key]); // Agregar location.key para recargar cuando navegamos de vuelta

  // Recargar datos cuando la página recibe foco (vuelves desde otra página)
  useEffect(() => {
    const handleFocus = async () => {
      try {
        console.log('Página recibió foco, recargando solicitudes...');
        const data: any = await getServiceRequests();
        setRequests(data.requests || data || []);
      } catch (err) {
        console.error('Error refreshing requests on focus:', err);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

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
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button 
              onClick={() => navigate('/service-request-create')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-secondary hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition shadow-md">
              <span className="material-icons mr-2 text-sm">add_circle</span>
              Nueva Solicitud
            </button>
          </div>
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
                          {request.status === 'CANCELADO' ? (
                            <span className="text-sm text-gray-400">-</span>
                          ) : request.trip?.driver ? (
                            <>
                              <div className="text-sm text-gray-900 font-medium">{request.trip.driver.fullName || request.trip.driver.name}</div>
                              <div className="text-xs text-gray-500 flex items-center gap-1">
                                <span className="material-icons" style={{fontSize: '12px'}}>directions_car</span>
                                {request.trip.vehicle?.licensePlate || request.trip.vehicle?.plate || 'N/A'}
                              </div>
                            </>
                          ) : (
                            <span className="text-xs text-gray-400">Asignación automática</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openDetailModal(request)}
                            className="text-primary hover:text-blue-900 flex items-center gap-1 ml-auto"
                          >
                            <span className="material-icons text-sm">edit</span>
                            Editar
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

      {/* Modal de Nueva Solicitud */}
      {showNewRequestModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeNewRequestModal}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6" onClick={(e) => e.stopPropagation()}>
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button onClick={closeNewRequestModal} className="bg-white rounded-md text-gray-400 hover:text-gray-500">
                  <span className="material-icons">close</span>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                  <span className="material-icons text-secondary">add_circle</span>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                  <h3 className="text-lg leading-6 font-bold text-gray-900">
                    Nueva Solicitud de Servicio
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Complete los datos para crear una nueva solicitud. Se asignará automáticamente un chofer disponible.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Empresa / Cliente *
                      </label>
                      <select
                        value={newRequest.companyId}
                        onChange={(e) => handleNewRequestChange('companyId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      >
                        <option value="">Seleccione una empresa o cliente</option>
                        {companies.map((company: any) => (
                          <option key={company.id} value={company.id}>
                            {company.company?.name || company.fullName || company.email}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Origen *
                      </label>
                      <input
                        type="text"
                        value={newRequest.origin}
                        onChange={(e) => handleNewRequestChange('origin', e.target.value)}
                        placeholder="Dirección de origen"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Destino *
                      </label>
                      <input
                        type="text"
                        value={newRequest.destination}
                        onChange={(e) => handleNewRequestChange('destination', e.target.value)}
                        placeholder="Dirección de destino"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha y Hora del Servicio *
                      </label>
                      <input
                        type="datetime-local"
                        value={newRequest.requestedAt}
                        onChange={(e) => handleNewRequestChange('requestedAt', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Observaciones
                      </label>
                      <textarea
                        value={newRequest.notes}
                        onChange={(e) => handleNewRequestChange('notes', e.target.value)}
                        placeholder="Notas adicionales (opcional)"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-start">
                        <span className="material-icons text-blue-600 text-sm mr-2">info</span>
                        <p className="text-sm text-blue-800">
                          Al crear la solicitud, se asignará automáticamente un chofer con vehículo disponible.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
                <button
                  type="button"
                  onClick={handleCreateRequest}
                  disabled={creatingRequest}
                  className="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-secondary text-base font-medium text-white hover:bg-orange-700 focus:outline-none sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creatingRequest ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creando...
                    </>
                  ) : (
                    'Crear Solicitud'
                  )}
                </button>
                <button
                  type="button"
                  onClick={closeNewRequestModal}
                  disabled={creatingRequest}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  <span className="material-icons text-primary">{isEditingRequest ? 'edit' : 'description'}</span>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                  <h3 className="text-lg leading-6 font-bold text-gray-900">
                    {isEditingRequest ? 'Editar' : 'Detalle de'} Solicitud #{selectedRequest.id.slice(0, 8)}
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="pb-3 border-b border-gray-200">
                      <span className="text-sm font-medium text-gray-500">Estado:</span>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        selectedRequest.status === 'AGENDADO' ? 'bg-green-100 text-green-800' :
                        selectedRequest.status === 'CANCELADO' ? 'bg-red-100 text-red-800' :
                        selectedRequest.status === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
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
                          {isEditingRequest ? (
                            <input
                              type="text"
                              value={editedRequest.origin}
                              onChange={(e) => handleEditChange('origin', e.target.value)}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="Origen"
                            />
                          ) : (
                            <>
                              <p className="text-sm font-semibold text-gray-900">{selectedRequest.origin}</p>
                              <p className="text-xs text-gray-500">Origen</p>
                            </>
                          )}
                        </div>
                        <span className="material-icons text-gray-400">arrow_forward</span>
                        <div className="flex-1">
                          {isEditingRequest ? (
                            <input
                              type="text"
                              value={editedRequest.destination}
                              onChange={(e) => handleEditChange('destination', e.target.value)}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="Destino"
                            />
                          ) : (
                            <>
                              <p className="text-sm font-semibold text-gray-900">{selectedRequest.destination}</p>
                              <p className="text-xs text-gray-500">Destino</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pb-3 border-b border-gray-200">
                      <span className="text-sm font-medium text-gray-500">Fecha solicitada:</span>
                      {isEditingRequest ? (
                        <input
                          type="datetime-local"
                          value={editedRequest.requestedAt ? new Date(editedRequest.requestedAt).toISOString().slice(0, 16) : ''}
                          onChange={(e) => handleEditChange('requestedAt', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent mt-1"
                        />
                      ) : (
                        <p className="text-base text-gray-900 mt-1">
                          {new Date(selectedRequest.requestedAt).toLocaleString('es-CL', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      )}
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

                    <div className="pb-3 border-b border-gray-200">
                      <span className="text-sm font-medium text-gray-500">Vehículo asignado:</span>
                      {selectedRequest.trip?.vehicle ? (
                        <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-semibold text-gray-900">
                            {selectedRequest.trip.vehicle.brand} {selectedRequest.trip.vehicle.model}
                          </p>
                          <p className="text-xs text-gray-500 font-mono">Patente: {selectedRequest.trip.vehicle.plate || selectedRequest.trip.vehicle.licensePlate}</p>
                        </div>
                      ) : (
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Sin vehículo asignado</p>
                        </div>
                      )}
                    </div>

                    {selectedRequest.notes && (
                      <div className="pb-3 border-b border-gray-200">
                        <span className="text-sm font-medium text-gray-500">Observaciones:</span>
                        {isEditingRequest ? (
                          <textarea
                            value={editedRequest.notes || ''}
                            onChange={(e) => handleEditChange('notes', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent mt-1"
                            placeholder="Observaciones adicionales"
                          />
                        ) : (
                          <p className="text-sm text-gray-700 mt-1 p-3 bg-gray-50 rounded-lg">
                            {selectedRequest.notes}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
                {isEditingRequest ? (
                  <>
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:w-auto sm:text-sm"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      type="button"
                      onClick={handleEditToggle}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleEditToggle}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-secondary text-base font-medium text-white hover:bg-orange-700 focus:outline-none sm:w-auto sm:text-sm"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={closeDetailModal}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                    >
                      Cerrar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
