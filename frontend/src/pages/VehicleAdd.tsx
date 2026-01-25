import React, { useState, FormEvent } from 'react'
import { useNavigate } from "react-router-dom";
import { createVehicle } from '../services/api';
import Header from '../components/Header';

export default function VehicleAdd() {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [vehicleInfo, setVehicleInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Validar patente
    const patente = formData.get('patente') as string;
    const patentePattern = /^[A-Z]{2,4}-[0-9]{1,3}$|^[A-Z]{3,4}[0-9]{3}$/;
    if (!patentePattern.test(patente.toUpperCase())) {
      alert('Formato de patente inválido. Use formato ABCD-12 o ABC-123');
      setLoading(false);
      return;
    }

    try {
      const vehicleData = {
        plate: (formData.get('patente') as string).toUpperCase(),
        brand: formData.get('marca') as string,
        model: formData.get('modelo') as string,
        type: formData.get('tipo') as string,
        capacity: parseInt(formData.get('capacidad') as string) || 0,
        color: formData.get('color') as string || undefined,
        mileage: parseInt(formData.get('kilometraje') as string) || 0,
        year: parseInt(formData.get('anio') as string),
        status: 'DISPONIBLE'
      };

      const response = await createVehicle(vehicleData);
      
      setVehicleInfo(`${vehicleData.brand} ${vehicleData.model} - Patente: ${vehicleData.plate}`);
      setShowSuccessModal(true);
      form.reset();
    } catch (error: any) {
      console.error('Error al registrar vehículo:', error);
      alert(error.response?.data?.message || 'Error al registrar el vehículo');
    } finally {
      setLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/vehicles');
  };

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li><button onClick={() => navigate('/vehicles')} className="hover:text-primary transition cursor-pointer">Flota</button></li>
            <li><span className="text-gray-400">/</span></li>
            <li className="text-gray-800 font-medium">Agregar Vehículo</li>
          </ol>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-bold leading-7 text-primary flex items-center gap-3">
            <span className="material-icons text-4xl">add_circle</span>
            Agregar Nuevo Vehículo
          </h1>
          <p className="mt-2 text-lg text-gray-600">Complete la información del nuevo vehículo para agregarlo a la flota.</p>
        </div>

        <div className="bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span className="material-icons text-primary">directions_car</span>
              Información del Vehículo
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patente *</label>
                <input
                  type="text"
                  name="patente"
                  placeholder="ABCD-12"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm uppercase font-mono"
                  required
                  maxLength={8}
                />
                <p className="mt-1 text-xs text-gray-500">Formato: ABCD-12 o ABC-123</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Año *</label>
                <input
                  type="number"
                  name="anio"
                  placeholder="2024"
                  min="1990"
                  max="2026"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marca *</label>
                <select
                  name="marca"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
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
                  placeholder="Ej: Sprinter 515 CDI"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Vehículo *</label>
                <select
                  name="tipo"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Capacidad (Pasajeros)</label>
                <input
                  type="number"
                  name="capacidad"
                  placeholder="19"
                  min="1"
                  max="50"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <input
                  type="text"
                  name="color"
                  placeholder="Blanco"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kilometraje Actual</label>
                <input
                  type="number"
                  name="kilometraje"
                  placeholder="0"
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                />
                <p className="mt-1 text-xs text-gray-500">En kilómetros</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Combustible</label>
                <select
                  name="combustible"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                >
                  <option value="">Seleccionar</option>
                  <option value="Diésel">Diésel</option>
                  <option value="Gasolina">Gasolina</option>
                  <option value="Eléctrico">Eléctrico</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 disabled:opacity-50"
              >
                <span className="material-icons mr-2">save</span>
                {loading ? 'Registrando...' : 'Registrar Vehículo'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/vehicles')}
                className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150"
              >
                <span className="material-icons mr-2">arrow_back</span>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeSuccessModal}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6" onClick={(e) => e.stopPropagation()}>
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <span className="material-icons text-green-600 text-2xl">check_circle</span>
                </div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4" id="modal-title">¡Vehículo Registrado!</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    El vehículo ha sido registrado correctamente en el sistema.
                  </p>
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">{vehicleInfo}</p>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    onClick={closeSuccessModal}
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}