import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getTrips } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Trips: React.FC = () => {
  const { user } = useAuth();
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const data: any = await getTrips();
        // Backend ya filtra según rol del usuario autenticado
        setTrips(data.trips || data || []);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching trips:', err);
        if (err.message?.includes('401')) {
          setError('Sesión expirada. Por favor inicia sesión nuevamente.');
        } else if (err.message?.includes('403')) {
          setError('No tienes permisos para ver los viajes.');
        } else {
          setError('Error al cargar los viajes');
        }
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchTrips();
    }
  }, [user]);

  const toggleModal = () => {
    setShowEvidenceModal(!showEvidenceModal);
  };

  // Filtrar viajes por estado
  const activeTrip = trips.find((t) => t.status === 'EN_RUTA');
  const upcomingTrips = trips.filter((t) => t.status === 'ASIGNADO' || t.status === 'PENDIENTE');
  const completedTrips = trips.filter((t) => t.status === 'FINALIZADO');

  return (
    <div className="bg-gray-100 font-sans text-gray-800 pb-24 md:pb-0 min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="hidden md:block text-2xl font-bold text-gray-800">Panel de Ruta</h2>

          <div className="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm w-full md:w-64">
            <button className="p-1 text-gray-400 hover:text-primary">
              <span className="material-icons">chevron_left</span>
            </button>
            <span className="font-bold text-sm text-gray-700">Hoy, 22 Ene</span>
            <button className="p-1 text-gray-400 hover:text-primary">
              <span className="material-icons">chevron_right</span>
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

        {!loading && !error && trips.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <span className="material-icons text-gray-300 text-6xl mb-4">local_shipping</span>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No hay viajes registrados</h3>
            <p className="text-gray-500 mb-6">Cuando se creen viajes, aparecerán aquí.</p>
            <button className="bg-secondary hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg transition">
              Crear primer viaje
            </button>
          </div>
        )}

        {!loading && !error && trips.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Active Trip Section */}
          <section className="lg:col-span-2">
            <h2 className="text-xs font-bold text-gray-500 uppercase mb-2 ml-1 md:mb-4">En Curso Ahora</h2>

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
                    <span className="material-icons text-2xl">groups</span>
                  </div>
                  <div>
                    <span className="font-bold text-xl md:text-2xl text-gray-900 block">
                      {activeTrip.title || 'Traslado'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {activeTrip.client?.name || 'Cliente'} &bull; {activeTrip.vehicle?.capacity || 0} Pax
                    </span>
                  </div>
                </div>

                <div className="relative pl-4 mb-8 border-l-2 border-gray-100 ml-2">
                  <div className="flex gap-4 mb-8 relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-gray-300 border-2 border-white shadow"></div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                        {activeTrip.startTime ? new Date(activeTrip.startTime).toLocaleTimeString('es-CL', {hour: '2-digit', minute: '2-digit'}) : new Date(activeTrip.scheduledDate).toLocaleTimeString('es-CL', {hour: '2-digit', minute: '2-digit'})} • Origen
                      </p>
                      <p className="font-bold text-gray-800 text-base md:text-lg">{activeTrip.origin}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-secondary border-2 border-white shadow ring-2 ring-orange-100"></div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                        {activeTrip.endTime ? new Date(activeTrip.endTime).toLocaleTimeString('es-CL', {hour: '2-digit', minute: '2-digit'}) : 'Estimado'} • Destino
                      </p>
                      <p className="font-bold text-gray-800 text-base md:text-lg">{activeTrip.destination}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                  <button className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-lg shadow-sm hover:bg-gray-50 flex justify-center items-center gap-2">
                    <span className="material-icons text-gray-500">map</span> Ver Mapa
                  </button>
                  <button onClick={toggleModal} className="flex-[2] bg-danger hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-md flex justify-center items-center gap-2 transition active:scale-95">
                    <span className="material-icons">stop_circle</span> FINALIZAR VIAJE
                  </button>
                </div>
              </div>
            </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <span className="material-icons text-gray-300 text-5xl mb-3">local_shipping</span>
                <p className="text-gray-500">No hay viajes en curso</p>
              </div>
            )}
          </section>

          {/* Upcoming Trips Section */}
          <section className="lg:col-span-1">
            <h2 className="text-xs font-bold text-gray-500 uppercase mb-2 ml-1 md:mb-4">Próximos Viajes</h2>

            <div className="space-y-4">
              {upcomingTrips.slice(0, 2).map((trip) => (
              <div key={trip.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-secondary transition group">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-xs text-gray-400 font-mono">#{trip.id}</div>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">Asignado</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-primary">
                      {trip.startTime ? new Date(trip.startTime).toLocaleTimeString('es-CL', {hour: '2-digit', minute: '2-digit'}) : new Date(trip.scheduledDate).toLocaleTimeString('es-CL', {hour: '2-digit', minute: '2-digit'})}
                    </span>
                    <span className="h-4 w-px bg-gray-300"></span>
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {trip.client?.name || 'Cliente'}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 mb-4 flex items-center gap-2 bg-gray-50 p-2 rounded">
                    <span className="material-icons text-xs text-gray-400">route</span>
                    <span className="truncate">{trip.origin} &rarr; {trip.destination}</span>
                  </div>

                  <Link to={`/trip/${trip.id}`} className="w-full bg-secondary hover:bg-orange-600 text-white font-bold py-2 rounded-lg shadow-sm flex justify-center items-center gap-2 text-sm transition group-hover:shadow-md">
                    <span className="material-icons text-sm">visibility</span> VER DETALLE
                  </Link>
                </div>
              </div>
              ))}

              {completedTrips.length > 0 && (
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden opacity-75 hover:opacity-100 transition">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Finalizado</span>
                    <span className="text-xs text-gray-400">
                      {new Date(completedTrips[0].endTime || completedTrips[0].startTime || completedTrips[0].scheduledDate).toLocaleDateString('es-CL')}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-gray-700">{completedTrips[0].title || 'Traslado'}</div>
                  <div className="text-xs text-gray-500">{completedTrips[0].origin} &rarr; {completedTrips[0].destination}</div>
                </div>
              </div>
              )}
            </div>
          </section>
        </div>
        )}
      </main>

      {/* Evidence Modal */}
      {showEvidenceModal && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity" onClick={toggleModal}></div>
          <div className="fixed inset-0 flex items-end md:items-center justify-center pointer-events-none">
            <div className="bg-white w-full md:w-auto md:max-w-lg md:mx-4 rounded-t-2xl md:rounded-2xl p-6 shadow-2xl transform transition-transform duration-300 ease-out pointer-events-auto">
              <div className="md:hidden w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>

              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900">Finalizar Viaje #TRIP-101</h3>
                <button onClick={toggleModal} className="hidden md:block text-gray-400 hover:text-gray-600">
                  <span className="material-icons">close</span>
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="¿Hubo algún retraso, desvío o novedad?"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Evidencia (Foto/Firma)</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <span className="material-icons text-gray-400 text-3xl">add_a_photo</span>
                      <p className="mb-1 text-sm text-gray-500 font-medium">Subir foto del pasajero/vale</p>
                      <p className="text-xs text-gray-400">JPG, PNG (Max 5MB)</p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100 mt-4">
                  <button type="button" onClick={toggleModal} className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition">
                    Cancelar
                  </button>
                  <button type="submit" className="flex-1 bg-primary hover:bg-blue-900 text-white font-bold py-3 rounded-lg shadow-lg transition transform active:scale-95">
                    Confirmar Fin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#002244] text-gray-300 border-t-4 border-secondary mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <span className="material-icons text-secondary text-3xl">local_shipping</span>
                <span className="font-bold text-xl tracking-wide">Servicios El Loa</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">
                Líderes en transporte corporativo y privado en la región de Antofagasta. Seguridad, puntualidad y tecnología al servicio de la minería.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="https://facebook.com" target="_blank" className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-secondary transition text-white">
                  <span className="material-icons text-sm">facebook</span>
                </a>
                <a href="https://elloa.cl" target="_blank" className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-secondary transition text-white">
                  <span className="material-icons text-sm">public</span>
                </a>
                <a href="https://instagram.com" target="_blank" className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-secondary transition text-white">
                  <span className="material-icons text-sm">photo_camera</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-blue-800 pb-2 inline-block">Navegación</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Inicio</Link></li>
                <li><Link to="/service-request" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Solicitudes</Link></li>
                <li><Link to="/companies" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Clientes</Link></li>
                <li><Link to="/portal-choferes" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Portal Choferes</Link></li>
                <li><Link to="/contacto" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Contáctanos</Link></li>
                <li><Link to="/trabaja-nosotros" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Trabaja con Nosotros</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-blue-800 pb-2 inline-block">Contacto Central</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="material-icons text-secondary text-sm mt-1">location_on</span>
                  <span>Av. Granaderos 2550, Of. 304<br />Calama, Región de Antofagasta</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-icons text-secondary text-sm">phone</span>
                  <span>+56 55 234 5678</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-icons text-secondary text-sm">email</span>
                  <span>operaciones@elloa.cl</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-icons text-secondary text-sm">access_time</span>
                  <span>24/7 Soporte en Ruta</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-blue-800 pb-2 inline-block">Descarga la App</h3>
              <p className="text-xs text-gray-400 mb-4">Gestiona tus viajes y monitorea la ruta en tiempo real.</p>

              <div className="space-y-3">
                <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-2 flex items-center gap-3 transition">
                  <span className="material-icons text-3xl">apple</span>
                  <div className="text-left">
                    <div className="text-[10px] uppercase">Disponible en</div>
                    <div className="font-bold text-sm text-white">App Store</div>
                  </div>
                </button>
                <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-2 flex items-center gap-3 transition">
                  <span className="material-icons text-3xl">android</span>
                  <div className="text-left">
                    <div className="text-[10px] uppercase">Disponible en</div>
                    <div className="font-bold text-sm text-white">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#001a33] py-6 border-t border-blue-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-gray-500 text-center md:text-left">
              &copy; 2026 Servicios de Transporte El Loa SpA. Todos los derechos reservados.
            </div>
            <div className="flex gap-6 text-xs text-gray-400 font-medium">
              <Link to="/terms" className="hover:text-white transition">Términos y Condiciones</Link>
              <Link to="/privacy" className="hover:text-white transition">Política de Privacidad</Link>
              <Link to="/complaints" className="hover:text-white transition">Portal de Denuncias</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Trips;