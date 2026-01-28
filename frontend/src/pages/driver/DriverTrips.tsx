import React, { useState } from 'react';
import { useMyTrips } from '../../hooks/useMyTrips';
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Map as MapIcon,
  StopCircle,
  Play,
  Route,
  Navigation,
  CheckCircle2,
  X,
  Camera,
} from 'lucide-react';

const DriverTrips = () => {
  // Keep the hook for real data, but we might need to fallback to mock data strictly for visual demo if data is empty
  const { trips, loading, updateTripStatus } = useMyTrips();
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);

  // Mock date for the UI
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
  const formattedDate = today.toLocaleDateString('es-ES', dateOptions);

  if (loading)
    return (
      <div className="p-10 flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  // if (error) return <div className="text-red-500 p-10">{error}</div>; // Optional: Handle error gracefully

  // Filter trips based on logic similar to mockup (Visual logic)
  // NOTE: In a real scenario we use the real data.
  // If the hook returns empty, the UI will be empty.
  const activeTrip = trips.find((t) => t.status === 'ON_WAY' || t.status === 'IN_PROGRESS');
  const upcomingTrips = trips.filter(
    (t) => (t.status === 'ASSIGNED' || t.status === 'SCHEDULED') && t.id !== activeTrip?.id,
  );
  // const pastTrips = trips.filter(t => t.status === "COMPLETED" || t.status === "CANCELLED");

  // Modal Handler
  const toggleModal = () => setIsEvidenceModalOpen(!isEvidenceModalOpen);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 font-sans text-gray-800">
      {/* Header / Date Navigator */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="hidden md:block text-2xl font-bold text-gray-800">Panel de Ruta</h2>

        <div className="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm w-full md:w-64 border border-gray-200">
          <button className="p-1 text-gray-400 hover:text-primary transition">
            <ChevronLeft size={20} />
          </button>
          <span className="font-bold text-sm text-gray-700 capitalize">Hoy, {formattedDate}</span>
          <button className="p-1 text-gray-400 hover:text-primary transition">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Left Column: Active Trip */}
        <section id="active-trip" className="lg:col-span-2">
          <h2 className="text-xs font-bold text-gray-500 uppercase mb-2 ml-1 md:mb-4">
            En Curso Ahora
          </h2>

          {activeTrip ? (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-green-500 relative transition hover:shadow-xl">
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                EN RUTA
              </div>

              <div className="p-6 md:p-8">
                <div className="text-xs text-gray-400 mb-1 font-mono">ID: #{activeTrip.id}</div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 rounded-lg text-primary">
                    <Users size={28} />
                  </div>
                  <div>
                    <span className="font-bold text-xl md:text-2xl text-gray-900 block">
                      {/* Using mock title if not available in data, or generic */}
                      Traslado Corporativo
                    </span>
                    <span className="text-sm text-gray-500">
                      {activeTrip.clientName || 'Cliente Corporativo'} &bull; 4 Pax
                    </span>
                  </div>
                </div>

                <div className="relative pl-4 mb-8 border-l-2 border-gray-100 ml-2">
                  <div className="flex gap-4 mb-8 relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-gray-300 border-2 border-white shadow"></div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                        {activeTrip.startTime ? activeTrip.startTime.substring(0, 5) : '08:30'} •
                        Origen
                      </p>
                      <p className="font-bold text-gray-800 text-base md:text-lg">
                        {activeTrip.origin}
                      </p>
                      <p className="text-sm text-gray-500">Punto de encuentro</p>
                    </div>
                  </div>

                  <div className="flex gap-4 relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-secondary border-2 border-white shadow ring-2 ring-orange-100"></div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                        Estimado --:-- • Destino
                      </p>
                      <p className="font-bold text-gray-800 text-base md:text-lg">
                        {activeTrip.destination}
                      </p>
                      <p className="text-sm text-gray-500">Zona de llegadas</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                  <button className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-lg shadow-sm hover:bg-gray-50 flex justify-center items-center gap-2 transition">
                    <MapIcon className="text-gray-500" size={20} /> Ver Mapa
                  </button>
                  <button
                    onClick={toggleModal}
                    className="flex-[2] bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-md flex justify-center items-center gap-2 transition active:scale-95"
                  >
                    <StopCircle size={20} /> FINALIZAR VIAJE
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border-dashed border-2 border-gray-200">
              <div className="inline-flex justify-center items-center w-16 h-16 bg-gray-50 rounded-full mb-4 text-gray-300">
                <Navigation size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-700">No hay viaje en curso</h3>
              <p className="text-gray-500">Selecciona un viaje programado para comenzar.</p>
            </div>
          )}
        </section>

        {/* Right Column: Upcoming Trips */}
        <section id="upcoming-trips" className="lg:col-span-1">
          <h2 className="text-xs font-bold text-gray-500 uppercase mb-2 ml-1 md:mb-4">
            Próximos Viajes
          </h2>

          <div className="space-y-4">
            {upcomingTrips.length > 0 ? (
              upcomingTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-secondary transition group"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-xs text-gray-400 font-mono">#{trip.id}</div>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                        Asignado
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-bold text-primary">
                        {trip.startTime ? trip.startTime.substring(0, 5) : '--:--'}
                      </span>
                      <span className="h-4 w-px bg-gray-300"></span>
                      <span className="text-sm font-medium text-gray-700 truncate">
                        {trip.clientName || 'Cliente'}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 mb-4 flex items-center gap-2 bg-gray-50 p-2 rounded">
                      <Route size={14} className="text-gray-400" />
                      <span className="truncate">
                        {trip.origin} &rarr; {trip.destination}
                      </span>
                    </div>

                    <button
                      className="w-full bg-secondary hover:bg-orange-600 text-white font-bold py-2 rounded-lg shadow-sm flex justify-center items-center gap-2 text-sm transition group-hover:shadow-md"
                      onClick={() => updateTripStatus(trip.id, 'ON_WAY')}
                    >
                      <Play size={16} /> INICIAR RUTA
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 italic">No tienes más viajes asignados hoy.</p>
            )}

            {/* Example Past Trip Layout (Static for now as per mockup) */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden opacity-75 hover:opacity-100 transition">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                    Finalizado
                  </span>
                  <span className="text-xs text-gray-400">Ayer</span>
                </div>
                <div className="text-sm font-bold text-gray-700">Traslado Ejecutivo</div>
                <div className="text-xs text-gray-500">Centro &rarr; Aeropuerto</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Evidence Modal */}
      {isEvidenceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity"
            onClick={toggleModal}
          ></div>

          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gray-50 border-b border-gray-100 p-4 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Finalizar Viaje</h3>
              <button onClick={toggleModal} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-lg mb-6 flex items-start gap-2">
                <div className="shrink-0 mt-0.5">
                  <CheckCircle2 size={16} />
                </div>
                <p>
                  Confirma que has llegado al destino y los pasajeros han descendido correctamente.
                </p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Adjuntar Evidencia (Opcional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer">
                    <Camera size={24} className="mx-auto text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500 font-medium">
                      Tomar foto o subir archivo
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Kilometraje Final
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="Ej: 45050"
                  />
                </div>

                <button
                  type="button"
                  className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-3 rounded-lg shadow-md transition mt-2"
                  onClick={() => {
                    if (activeTrip) {
                      updateTripStatus(activeTrip.id, 'COMPLETED');
                      toggleModal();
                    }
                  }}
                >
                  CONFIRMAR TERMINO
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverTrips;
