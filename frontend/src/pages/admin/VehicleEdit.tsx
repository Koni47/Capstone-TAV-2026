import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  PlusCircle,
  Car,
  Calendar,
  Hash,
  Truck,
  Users,
  Gauge,
  Activity,
  FileText,
  Save,
  X,
  Trash2,
} from 'lucide-react';

/**
 * VehicleEdit (Add/Edit Vehicle)
 * Implementation of both vehicle-add.html and vehicle-edit.html
 * Handles routing for /admin/vehicles/new and /admin/vehicles/:id
 */
const VehicleEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(false);

  // Initial state matching the "Add" layout but populated if Edit
  const [formData, setFormData] = useState({
    patente: '',
    anio: '',
    marca: '',
    modelo: '',
    tipo: '',
    capacidad: '',
    estado: 'AVAILABLE',
    kilometraje: '',
    vencimiento_rt: '',
    vencimiento_soap: '',
  });

  useEffect(() => {
    if (isEditMode) {
      // Mock fetching data for edit
      // In a real app, fetch from API using ID
      setFormData({
        patente: 'LHYT-88',
        anio: '2023',
        marca: 'Mercedes-Benz',
        modelo: 'Sprinter 515 CDI',
        tipo: 'Van Pasajeros',
        capacidad: '19',
        estado: 'IN_USE',
        kilometraje: '45000',
        vencimiento_rt: '2026-03-15',
        vencimiento_soap: '2026-03-31',
      });
    }
  }, [isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(isEditMode ? 'Vehículo actualizado exitosamente' : 'Vehículo guardado exitosamente');
      navigate('/admin/vehicles');
    }, 1500);
  };

  const handleDelete = () => {
    if (confirm('¿Estás seguro de que deseas dar de baja este vehículo?')) {
      alert('Vehículo dado de baja');
      navigate('/admin/vehicles');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-gray-800">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/admin/dashboard" className="hover:text-primary transition">
              Inicio
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li>
            <Link to="/admin/vehicles" className="hover:text-primary transition">
              Flota
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          {isEditMode ? (
            <>
              <li>
                <span className="text-gray-400">{formData.patente || id}</span>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li className="text-gray-800 font-medium">Editar Vehículo</li>
            </>
          ) : (
            <li className="text-gray-800 font-medium">Agregar Vehículo</li>
          )}
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold leading-7 text-primary flex items-center gap-3">
          {isEditMode ? <Car size={36} /> : <PlusCircle size={36} />}
          {isEditMode ? 'Editar Vehículo' : 'Agregar Nuevo Vehículo'}
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          {isEditMode
            ? 'Actualice la información técnica y estado operativo de la unidad.'
            : 'Complete la información del nuevo vehículo para agregarlo a la flota.'}
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Car className="text-primary" size={24} />
            {isEditMode ? 'Ficha de la Unidad' : 'Información del Vehículo'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información Básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Patente *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Hash size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="patente"
                  value={formData.patente}
                  onChange={handleChange}
                  placeholder="ABCD-12"
                  className={`block w-full pl-10 border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm uppercase font-mono ${isEditMode ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  required
                  maxLength={8}
                  readOnly={isEditMode}
                />
              </div>
              {!isEditMode && (
                <p className="mt-1 text-xs text-gray-500">Formato: ABCD-12 o ABC-123</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Año *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="anio"
                  value={formData.anio}
                  onChange={handleChange}
                  placeholder="2024"
                  min="1990"
                  max="2026"
                  className="block w-full pl-10 border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* Marca y Modelo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Marca *</label>
              <select
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm bg-white"
                required
              >
                <option value="">Seleccionar marca</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Toyota">Toyota</option>
                <option value="Hyundai">Hyundai</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Ford">Ford</option>
                <option value="Nissan">Nissan</option>
                <option value="Mitsubishi">Mitsubishi</option>
                <option value="Iveco">Iveco</option>
                <option value="Scania">Scania</option>
                <option value="Otra">Otra</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Modelo *</label>
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                placeholder="Ej: Sprinter 515 CDI"
                className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                required
              />
            </div>
          </div>

          {/* Tipo y Capacidad */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Vehículo *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Truck size={18} className="text-gray-400" />
                </div>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="block w-full pl-10 border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm bg-white"
                  required
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="Van Pasajeros">Van Pasajeros (Sprinter/H1)</option>
                  <option value="Camioneta">Camioneta (Pickup)</option>
                  <option value="SUV">SUV / Auto</option>
                  <option value="Bus">Bus</option>
                  <option value="Camión">Camión</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacidad (Pasajeros) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users size={18} className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="capacidad"
                  value={formData.capacidad}
                  onChange={handleChange}
                  placeholder="Ej: 19"
                  min="1"
                  className="block w-full pl-10 border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* Estado y Kilometraje */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado Operativo *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Activity size={18} className="text-gray-400" />
                </div>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="block w-full pl-10 border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm bg-white"
                  required
                >
                  <option value="AVAILABLE">Disponible</option>
                  <option value="IN_USE">En Uso / En Servicio</option>
                  <option value="MAINTENANCE">En Mantenimiento</option>
                  <option value="OUT_OF_SERVICE">Fuera de Servicio</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kilometraje Actual *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Gauge size={18} className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="kilometraje"
                  value={formData.kilometraje}
                  onChange={handleChange}
                  placeholder="Ej: 45000"
                  min="0"
                  className="block w-full pl-10 border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText size={20} className="text-gray-500" />
              Vencimiento de Documentación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Revisión Técnica
                </label>
                <input
                  type="date"
                  name="vencimiento_rt"
                  value={formData.vencimiento_rt}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Seguro SOAP</label>
                <input
                  type="date"
                  name="vencimiento_soap"
                  value={formData.vencimiento_soap}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <div>
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="text-red-600 font-medium hover:text-red-800 text-sm flex items-center gap-2"
                >
                  <Trash2 size={16} /> Dar de Baja
                </button>
              )}
            </div>
            <div className="flex gap-4">
              <Link
                to="/admin/vehicles"
                className="bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 font-bold py-3 px-6 rounded-xl shadow-sm transition flex items-center gap-2"
              >
                <X size={18} /> Cancelar
              </Link>
              <button
                type="submit"
                disabled={loading}
                className={`bg-primary hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <Save size={18} />
                )}
                {isEditMode ? 'Guardar Cambios' : 'Guardar Vehículo'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleEdit;
