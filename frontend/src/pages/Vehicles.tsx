import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vehiclesMockData } from "../services/mockApi";
import Header from '../components/Header';

const Vehicles = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [formData, setFormData] = useState({
    plate: "",
    year: "",
    model: "",
    type: "Van Pasajeros (Sprinter/H1)",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowModal(false);
    setFormData({
      plate: "",
      year: "",
      model: "",
      type: "Van Pasajeros (Sprinter/H1)",
    });
  };

  const filteredVehicles = vehiclesMockData.vehicles.filter((vehicle: any) => {
    const matchesSearch =
      vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-primary flex items-center gap-1 transition-colors">
            <span className="material-icons text-sm">arrow_back</span>
            Volver
          </button>
        </div>
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-primary sm:text-3xl sm:truncate">
              Gestión de Vehículos
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Administra la flota, mantenciones y documentación.
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              onClick={() => setShowModal(true)}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-orange-700 focus:outline-none transition"
            >
              <span className="material-icons text-sm mr-2">add</span>
              Agregar Vehículo
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-8">
          {vehiclesMockData.stats.map((stat: any, idx: number) => (
            <div
              key={idx}
              className={`bg-white overflow-hidden shadow rounded-lg border-l-4 border-${stat.borderColor}`}
            >
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-3xl font-bold text-gray-900">
                  {stat.value}
                </dd>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-icons text-gray-400">search</span>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por patente, modelo..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md border"
            >
              <option value="">Estado: Todos</option>
              <option value="Disponible">Disponible</option>
              <option value="En Ruta">En Ruta</option>
              <option value="En Taller">En Mantención</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <span className="material-icons text-sm mr-2">filter_list</span>
              Filtrar
            </button>
          </div>
        </div>

        {/* Vehicles Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patente / Año
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prox. Mantención
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVehicles.map((vehicle: any, idx: number) => (
                <tr
                  key={idx}
                  className={`hover:bg-gray-50 transition ${
                    vehicle.status === "En Taller" ? "bg-red-50 hover:bg-red-100" : ""
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="material-icons text-gray-500">
                          {vehicle.icon}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-gray-900">
                          {vehicle.model}
                        </div>
                        <div className="text-xs text-gray-500">
                          {vehicle.type}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded inline-block border border-gray-300">
                      {vehicle.plate}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Año {vehicle.year}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                        vehicle.statusColor === "green"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : vehicle.statusColor === "blue"
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-yellow-100 text-yellow-800 border-yellow-200"
                      }`}
                    >
                      {vehicle.status}
                    </span>
                    {vehicle.driver && (
                      <div className="text-[10px] text-gray-500 mt-1">
                        Chofer: {vehicle.driver}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {vehicle.maintenanceDate}
                    </div>
                    <div
                      className={`text-xs ${
                        vehicle.maintenanceColor === "green"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {vehicle.maintenanceColor === "red" && (
                        <span className="flex items-center gap-1">
                          <span className="material-icons text-[10px]">
                            warning
                          </span>
                          {vehicle.maintenanceStatus}
                        </span>
                      )}
                      {vehicle.maintenanceColor === "green" &&
                        vehicle.maintenanceStatus}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => navigate("/vehicle-detail")}
                      className={`mr-3 ${
                        vehicle.status === "En Taller"
                          ? "text-secondary hover:text-orange-900 font-bold"
                          : "text-primary hover:text-blue-900"
                      }`}
                    >
                      {vehicle.status === "En Taller" ? "Finalizar" : "Historial"}
                    </button>
                    <button
                      onClick={() => navigate("/vehicle-edit")}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <span className="material-icons text-sm">edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowModal(false)}
            ></div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            {/* Modal content */}
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Registrar Nuevo Vehículo
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Patente
                    </label>
                    <input
                      type="text"
                      name="plate"
                      placeholder="ABCD-12"
                      value={formData.plate}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Año
                    </label>
                    <input
                      type="number"
                      name="year"
                      placeholder="2024"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Marca y Modelo
                  </label>
                  <input
                    type="text"
                    name="model"
                    placeholder="Ej: Toyota Hilux 4x4"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tipo
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  >
                    <option>Van Pasajeros (Sprinter/H1)</option>
                    <option>Camioneta (Pickup)</option>
                    <option>SUV / Auto</option>
                    <option>Bus</option>
                  </select>
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-blue-800 focus:outline-none sm:col-start-2 sm:text-sm"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehicles;
