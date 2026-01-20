import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tripsMockData } from "../mocks/data";

const Trips = () => {
  const navigate = useNavigate();
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    file: null,
  });
  const [activeNav, setActiveNav] = useState("trips");

  const handleDescriptionChange = (e: any) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleFileChange = (e: any) => {
    setFormData({ ...formData, file: e.target.files?.[0] || null });
  };

  const handleSubmitFinalize = (e: any) => {
    e.preventDefault();
    setShowFinalizeModal(false);
    setFormData({ description: "", file: null });
  };

  const handleNavigation = (page: string) => {
    setActiveNav(page);
    if (page === "home") navigate("/");
    else if (page === "trips") navigate("/trips");
    else if (page === "profile") navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {tripsMockData.driver.initials}
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {tripsMockData.driver.name}
                </h1>
                <p className="text-sm text-gray-600">
                  Placa: {tripsMockData.driver.vehicle}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <span className="material-icons text-gray-600">menu</span>
            </button>
          </div>
          <p className="text-sm text-gray-600">{tripsMockData.currentDate}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Active Trip Section */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 uppercase mb-3">
            Viaje Activo
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Trip Header */}
            <div className="bg-blue-50 border-b border-gray-200 px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {tripsMockData.activeTrip.id}
                  </p>
                  <p className="text-sm text-gray-600">
                    {tripsMockData.activeTrip.title}
                  </p>
                </div>
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                  {tripsMockData.activeTrip.status}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {tripsMockData.activeTrip.client} • {tripsMockData.activeTrip.passengers} pasajeros
              </p>
            </div>

            {/* Route Timeline */}
            <div className="px-4 py-4 flex gap-4">
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="w-0.5 h-24 bg-gray-300 my-1"></div>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>

              {/* Locations */}
              <div className="flex-1">
                {/* Start */}
                <div className="mb-8">
                  <p className="text-sm font-semibold text-gray-900">
                    {tripsMockData.activeTrip.startLocation}
                  </p>
                  <p className="text-xs text-gray-600">
                    {tripsMockData.activeTrip.startDesc}
                  </p>
                  <p className="text-xs font-semibold text-gray-900 mt-1">
                    {tripsMockData.activeTrip.startTime}
                  </p>
                </div>

                {/* End */}
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {tripsMockData.activeTrip.endLocation}
                  </p>
                  <p className="text-xs text-gray-600">
                    {tripsMockData.activeTrip.endDesc}
                  </p>
                  <p className="text-xs font-semibold text-gray-900 mt-1">
                    {tripsMockData.activeTrip.endTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-200 px-4 py-3 flex gap-2">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700">
                Ver Mapa
              </button>
              <button
                onClick={() => setShowFinalizeModal(true)}
                className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700"
              >
                FINALIZAR VIAJE
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Trips Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 uppercase mb-3">
            Próximos Viajes
          </h2>
          <div className="space-y-3">
            {tripsMockData.upcomingTrips.map((trip: any, idx: number) => (
              <div
                key={idx}
                className="bg-white rounded-lg border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-900">
                    {trip.id}
                  </p>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                      trip.statusColor === "yellow"
                        ? "bg-yellow-100 text-yellow-800"
                        : trip.statusColor === "gray"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {trip.status}
                  </span>
                </div>
                {trip.title && (
                  <p className="text-xs text-gray-600 mb-2">{trip.title}</p>
                )}
                {trip.time && (
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    {trip.time} · {trip.client}
                  </p>
                )}
                {trip.client && !trip.title && (
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    {trip.client}
                  </p>
                )}
                <p className="text-xs text-gray-600">{trip.route}</p>
                {trip.date && (
                  <p className="text-xs text-gray-500 mt-2">{trip.date}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Finalize Trip Modal */}
      {showFinalizeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Finalizar Viaje
            </h3>

            <form onSubmit={handleSubmitFinalize}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  placeholder="Describe el estado del viaje, incidentes, etc."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Evidencia (Foto/Video)
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowFinalizeModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700"
                >
                  Finalizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-4 flex justify-around">
          <button
            onClick={() => handleNavigation("home")}
            className={`flex flex-col items-center justify-center w-16 h-16 ${
              activeNav === "home" ? "text-blue-600" : "text-gray-600"
            } hover:bg-gray-50`}
          >
            <span className="material-icons text-2xl">home</span>
            <span className="text-xs mt-1">Inicio</span>
          </button>
          <button
            onClick={() => handleNavigation("trips")}
            className={`flex flex-col items-center justify-center w-16 h-16 ${
              activeNav === "trips" ? "text-blue-600" : "text-gray-600"
            } hover:bg-gray-50`}
          >
            <span className="material-icons text-2xl">directions_car</span>
            <span className="text-xs mt-1">Viajes</span>
          </button>
          <button
            onClick={() => handleNavigation("profile")}
            className={`flex flex-col items-center justify-center w-16 h-16 ${
              activeNav === "profile" ? "text-blue-600" : "text-gray-600"
            } hover:bg-gray-50`}
          >
            <span className="material-icons text-2xl">person</span>
            <span className="text-xs mt-1">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trips;
