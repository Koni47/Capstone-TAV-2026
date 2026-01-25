import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getVehicles, updateVehicle } from "../services/api";
import Header from '../components/Header';

interface Vehicle {
  id: string;
  licensePlate: string;
  model: string;
  type?: string;
  year: number;
  status: string;
  capacity?: number;
  mileage?: number;
  currentDriver?: Driver | null;
}

interface Driver {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  status: string;
  role?: {
    nombre: string;
  };
}

const Vehicles = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState<any>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response: any = await getVehicles();
        setVehicles(response.vehicles || response);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Error al cargar vehículos');
        console.error('Error fetching vehicles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openDriverModal = (driver: Driver) => {
    setSelectedDriver(driver);
    setShowDriverModal(true);
  };

  const closeDriverModal = () => {
    setShowDriverModal(false);
    setSelectedDriver(null);
  };

  const openVehicleModal = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowVehicleModal(true);
  };

  const closeVehicleModal = () => {
    setShowVehicleModal(false);
    setSelectedVehicle(null);
  };

  const openEditModal = (vehicle: Vehicle) => {
    setEditFormData({
      licensePlate: vehicle.licensePlate,
      model: vehicle.model,
      type: vehicle.type || '',
      year: vehicle.year,
      capacity: vehicle.capacity || '',
      mileage: vehicle.mileage || '',
      status: vehicle.status,
    });
    setSelectedVehicle(vehicle);
    setShowEditModal(true);
    setShowVehicleModal(false);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditFormData(null);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Preparar datos para el backend
      const vehicleData = {
        plate: editFormData.licensePlate,
        model: editFormData.model,
        type: editFormData.type || undefined,
        year: parseInt(editFormData.year),
        capacity: editFormData.capacity ? parseInt(editFormData.capacity) : undefined,
        mileage: editFormData.mileage ? parseInt(editFormData.mileage) : undefined,
        status: editFormData.status,
      };

      // Actualizar en el backend
      await updateVehicle(selectedVehicle!.id, vehicleData);

      // Actualizar en el estado local
      setVehicles(prevVehicles => 
        prevVehicles.map(vehicle => 
          vehicle.id === selectedVehicle!.id 
            ? {
                ...vehicle,
                licensePlate: editFormData.licensePlate,
                model: editFormData.model,
                type: editFormData.type || vehicle.type,
                year: parseInt(editFormData.year),
                capacity: editFormData.capacity ? parseInt(editFormData.capacity) : vehicle.capacity,
                mileage: editFormData.mileage ? parseInt(editFormData.mileage) : vehicle.mileage,
                status: editFormData.status,
              }
            : vehicle
        )
      );

      // Cerrar modal
      closeEditModal();
      
      // Mostrar mensaje de éxito (opcional)
      console.log('Vehículo actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar vehículo:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
      alert('Error al actualizar el vehículo. Por favor, intenta nuevamente.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando vehículos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <span className="material-icons text-red-500 text-5xl">error</span>
            <p className="mt-4 text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-primary flex items-center gap-1">
            <span className="material-icons text-sm">arrow_back</span>
            Volver
          </button>
        </div>

        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-primary">Gestión de Vehículos</h2>
            <p className="text-sm text-gray-500 mt-1">Administra la flota, mantenciones y documentación.</p>
          </div>
          <button
            onClick={() => navigate('/vehicleadd')}
            className="mt-4 md:mt-0 px-4 py-2 bg-secondary text-white rounded-md hover:bg-orange-700 flex items-center gap-2"
          >
            <span className="material-icons text-sm">add</span>
            Agregar Vehículo
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
              <input
                type="text"
                placeholder="Patente o modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Todos</option>
                <option value="DISPONIBLE">Disponible</option>
                <option value="EN_SERVICIO">En Servicio</option>
                <option value="MANTENCION">Mantención</option>
                <option value="FUERA_SERVICIO">Fuera de Servicio</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{vehicle.licensePlate}</h3>
                    <p className="text-sm text-gray-500">{vehicle.model}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    vehicle.status === 'DISPONIBLE' ? 'bg-green-100 text-green-800' :
                    vehicle.status === 'EN_SERVICIO' ? 'bg-blue-100 text-blue-800' :
                    vehicle.status === 'MANTENCION' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {vehicle.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-sm">calendar_today</span>
                    <span>Año: {vehicle.year}</span>
                  </div>
                  {vehicle.capacity && (
                    <div className="flex items-center gap-2">
                      <span className="material-icons text-sm">people</span>
                      <span>Capacidad: {vehicle.capacity} pasajeros</span>
                    </div>
                  )}
                  {vehicle.type && (
                    <div className="flex items-center gap-2">
                      <span className="material-icons text-sm">local_shipping</span>
                      <span>{vehicle.type}</span>
                    </div>
                  )}
                  {vehicle.currentDriver && (
                    <div className="flex items-center gap-2 text-primary cursor-pointer hover:text-blue-800 font-medium"
                         onClick={() => openDriverModal(vehicle.currentDriver!)}>
                      <span className="material-icons text-sm">person</span>
                      <span>Chofer: {vehicle.currentDriver.fullName}</span>
                      <span className="material-icons text-xs">info</span>
                    </div>
                  )}
                  {!vehicle.currentDriver && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <span className="material-icons text-sm">person_off</span>
                      <span>Sin chofer asignado</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openVehicleModal(vehicle)}
                    className="flex-1 px-3 py-2 bg-primary text-white rounded-md hover:bg-blue-800 text-sm"
                  >
                    Ver Detalle
                  </button>
                  <button
                    onClick={() => navigate(`/vehicle/${vehicle.id}/edit`)}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                  >
                    <span className="material-icons text-sm">edit</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <span className="material-icons text-gray-400 text-5xl">directions_car</span>
            <p className="mt-4 text-gray-500">No se encontraron vehículos</p>
          </div>
        )}
      </main>

      {/* Modal de Detalle del Vehículo */}
      {showVehicleModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
             onClick={closeVehicleModal}>
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
               onClick={(e) => e.stopPropagation()}>
            {/* Header del Modal */}
            <div className="bg-gradient-to-r from-primary to-blue-700 px-6 py-4 text-white sticky top-0 z-10">
              <button
                onClick={closeVehicleModal}
                className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition"
              >
                <span className="material-icons">close</span>
              </button>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <span className="material-icons text-3xl">directions_car</span>
                {selectedVehicle.licensePlate}
              </h3>
              <p className="text-blue-100 text-sm mt-1">{selectedVehicle.model}</p>
            </div>

            {/* Cuerpo del Modal */}
            <div className="p-6">
              {/* Estado del Vehículo */}
              <div className="mb-6 flex justify-center">
                <span className={`px-4 py-2 text-sm font-bold rounded-full ${
                  selectedVehicle.status === 'DISPONIBLE' ? 'bg-green-100 text-green-800' :
                  selectedVehicle.status === 'EN_SERVICIO' ? 'bg-blue-100 text-blue-800' :
                  selectedVehicle.status === 'MANTENCION' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedVehicle.status}
                </span>
              </div>

              {/* Información General */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="material-icons text-primary">info</span>
                  Información General
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="material-icons text-primary mt-0.5">confirmation_number</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">Patente</p>
                      <p className="text-sm text-gray-900 font-bold">{selectedVehicle.licensePlate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="material-icons text-primary mt-0.5">directions_car</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">Modelo</p>
                      <p className="text-sm text-gray-900">{selectedVehicle.model}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="material-icons text-primary mt-0.5">calendar_today</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">Año</p>
                      <p className="text-sm text-gray-900">{selectedVehicle.year}</p>
                    </div>
                  </div>

                  {selectedVehicle.type && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="material-icons text-primary mt-0.5">category</span>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium">Tipo</p>
                        <p className="text-sm text-gray-900">{selectedVehicle.type}</p>
                      </div>
                    </div>
                  )}

                  {selectedVehicle.capacity && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="material-icons text-primary mt-0.5">people</span>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium">Capacidad</p>
                        <p className="text-sm text-gray-900">{selectedVehicle.capacity} pasajeros</p>
                      </div>
                    </div>
                  )}

                  {selectedVehicle.mileage && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="material-icons text-primary mt-0.5">speed</span>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium">Kilometraje</p>
                        <p className="text-sm text-gray-900">{selectedVehicle.mileage.toLocaleString()} km</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Chofer Asignado */}
              {selectedVehicle.currentDriver && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="material-icons text-primary">person</span>
                    Chofer Asignado
                  </h4>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-2 border-blue-200">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        <span>{selectedVehicle.currentDriver.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-bold text-gray-900">{selectedVehicle.currentDriver.fullName}</p>
                        <p className="text-sm text-gray-600">{selectedVehicle.currentDriver.email}</p>
                        {selectedVehicle.currentDriver.phone && (
                          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <span className="material-icons text-xs">phone</span>
                            {selectedVehicle.currentDriver.phone}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          closeVehicleModal();
                          openDriverModal(selectedVehicle.currentDriver!);
                        }}
                        className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-blue-800 transition text-sm flex items-center gap-1"
                      >
                        <span className="material-icons text-sm">visibility</span>
                        Ver más
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {!selectedVehicle.currentDriver && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="material-icons text-primary">person</span>
                    Chofer Asignado
                  </h4>
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <span className="material-icons text-gray-400 text-5xl mb-2">person_off</span>
                    <p className="text-gray-500">Sin chofer asignado actualmente</p>
                  </div>
                </div>
              )}

              {/* Botones de Acción */}
              <div className="flex gap-3">
                <button
                  onClick={() => openEditModal(selectedVehicle)}
                  className="flex-1 bg-secondary text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition flex items-center justify-center gap-2 font-medium"
                >
                  <span className="material-icons">edit</span>
                  Editar Vehículo
                </button>
                <button
                  onClick={closeVehicleModal}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalle del Chofer */}
      {showDriverModal && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
             onClick={closeDriverModal}>
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
               onClick={(e) => e.stopPropagation()}>
            {/* Header del Modal */}
            <div className="bg-gradient-to-r from-primary to-blue-700 px-6 py-4 text-white relative">
              <button
                onClick={closeDriverModal}
                className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition"
              >
                <span className="material-icons">close</span>
              </button>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="material-icons">badge</span>
                Información del Conductor
              </h3>
            </div>

            {/* Cuerpo del Modal - Card del Chofer */}
            <div className="p-6">
              {/* Avatar y Nombre */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-3">
                  <span>{selectedDriver.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900">{selectedDriver.fullName}</h4>
                <span className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedDriver.status === 'ACTIVO' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {selectedDriver.status}
                </span>
              </div>

              {/* Información de Contacto */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="material-icons text-primary mt-0.5">email</span>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Email</p>
                    <p className="text-sm text-gray-900 break-all">{selectedDriver.email}</p>
                  </div>
                </div>

                {selectedDriver.phone && (
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="material-icons text-primary mt-0.5">phone</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">Teléfono</p>
                      <p className="text-sm text-gray-900">{selectedDriver.phone}</p>
                    </div>
                  </div>
                )}

                {selectedDriver.role && (
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="material-icons text-primary mt-0.5">work</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">Rol</p>
                      <p className="text-sm text-gray-900">{selectedDriver.role.nombre}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="material-icons text-primary mt-0.5">fingerprint</span>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">ID Usuario</p>
                    <p className="text-sm text-gray-900 font-mono text-xs">{selectedDriver.id}</p>
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => navigate(`/user/${selectedDriver.id}`)}
                  className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition flex items-center justify-center gap-2"
                >
                  <span className="material-icons text-sm">visibility</span>
                  Ver Perfil Completo
                </button>
                <button
                  onClick={closeDriverModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de Edición del Vehículo */}
      {showEditModal && selectedVehicle && editFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
             onClick={closeEditModal}>
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
               onClick={(e) => e.stopPropagation()}>
            {/* Header del Modal */}
            <div className="bg-gradient-to-r from-secondary to-orange-700 px-6 py-4 text-white sticky top-0 z-10">
              <button
                onClick={closeEditModal}
                className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition"
              >
                <span className="material-icons">close</span>
              </button>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <span className="material-icons text-3xl">edit</span>
                Editar Vehículo
              </h3>
              <p className="text-orange-100 text-sm mt-1">{selectedVehicle.licensePlate}</p>
            </div>

            {/* Formulario de Edición */}
            <form onSubmit={handleSaveEdit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Patente */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patente <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="licensePlate"
                    value={editFormData.licensePlate}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                {/* Modelo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Modelo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={editFormData.model}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                {/* Año */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Año <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={editFormData.year}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                {/* Tipo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={editFormData.type}
                    onChange={handleEditInputChange}
                    placeholder="Van, Sedan, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Capacidad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacidad (pasajeros)
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={editFormData.capacity}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Kilometraje */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kilometraje
                  </label>
                  <input
                    type="number"
                    name="mileage"
                    value={editFormData.mileage}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Estado */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="DISPONIBLE">Disponible</option>
                    <option value="EN_SERVICIO">En Servicio</option>
                    <option value="MANTENCION">Mantención</option>
                    <option value="FUERA_SERVICIO">Fuera de Servicio</option>
                  </select>
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-800 transition flex items-center justify-center gap-2 font-medium"
                >
                  <span className="material-icons">save</span>
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehicles;
