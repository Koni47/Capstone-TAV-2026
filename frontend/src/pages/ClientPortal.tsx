import { site, getHtmlMock } from '../services/mockApi';
import HtmlMockRenderer from '../components/HtmlMockRenderer'
import { useNavigate } from 'react-router-dom';

export default function ClientPortal() {
  const navigate = useNavigate();
  const mock = getHtmlMock('client-portal.html')
  if (mock) return <HtmlMockRenderer html={mock} navigate={navigate} />

  const handleNewTrip = () => {
    navigate('/service-request');
  };

  const redirectToDashboard = () => {
    // Simular redirección según rol, por ahora a dashboard-client
    navigate('/dashboard-client');
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-800 min-h-screen">
      {/* Navigation */}
      <nav className="bg-primary text-white shadow-lg w-full sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="flex-shrink-0 text-white flex items-center gap-2 font-bold text-xl cursor-pointer">
                <span className="material-icons text-secondary">local_shipping</span> EL LOA
              </a>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a onClick={redirectToDashboard} className="text-gray-300 hover:bg-primary-light hover:text-white px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer">Dashboard</a>
                  <a href="/service-request" className="text-gray-300 hover:bg-primary-light hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Solicitudes</a>
                  
                  <a href="/users" className="bg-primary-dark text-white px-3 py-2 rounded-md text-sm font-medium border-b-4 border-secondary h-16 flex items-center pt-1">
                    Usuarios
                  </a>
                  
                  <a href="/companies" className="text-gray-300 hover:bg-primary-light hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Clientes</a>
                  <a href="/vehicles" className="text-gray-300 hover:bg-primary-light hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Flota</a>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-primary p-1 rounded-full text-gray-400 hover:text-white transition">
                <span className="material-icons">notifications</span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-primary-light">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold leading-none user-name text-white">{site.clientPortalMockData.company.name}</p>
                  <p className="text-xs text-secondary user-role">Admin</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-white text-xs font-bold ring-2 ring-primary-dark user-initials">{site.clientPortalMockData.company.initials}</div>
                <a href="/logout" className="ml-2 text-sm font-semibold hover:text-secondary transition-colors">Salir</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate(-1)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
            Volver Atrás
          </button>
          <h1 className="text-2xl font-bold text-primary">Resumen de Cuenta</h1>
          <button
            onClick={handleNewTrip}
            className="bg-secondary hover:bg-orange-700 text-white font-bold py-2 px-4 rounded shadow flex items-center gap-2 transition"
          >
            <span className="material-icons text-sm">add</span> Solicitar Nuevo Viaje
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-primary">
            <p className="text-sm text-gray-500">Viajes este Mes</p>
            <p className="text-3xl font-bold text-gray-800">{site.clientPortalMockData.stats.tripsThisMonth}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
            <p className="text-sm text-gray-500">En Ruta Ahora</p>
            <p className="text-3xl font-bold text-gray-800">{site.clientPortalMockData.stats.tripsInRoute}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-secondary">
            <p className="text-sm text-gray-500">Gasto Acumulado (Est.)</p>
            <p className="text-3xl font-bold text-gray-800">{site.clientPortalMockData.stats.estimatedSpending}</p>
          </div>
        </div>

        {/* Recent Trips Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 font-bold text-gray-700">
            Historial Reciente
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ruta</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pasajero</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {site.clientPortalMockData.recentTrips.map((trip: any) => (
                <tr key={trip.id}>
                  <td className="px-6 py-4 text-sm font-bold text-primary">{trip.id}</td>
                  <td className="px-6 py-4 text-sm">{trip.route}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{trip.date}</td>
                  <td className="px-6 py-4 text-sm">{trip.passenger}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-bold ${
                        trip.statusColor === 'green'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

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
                <li><a href="/" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Inicio</a></li>
                <li><a href="/service-request" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Solicitudes</a></li>
                <li><a href="/companies" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Clientes</a></li>
                <li><a href="/portal-choferes" className="hover:text-secondary transition flex items-center gap-2"><span className="material-icons text-xs">chevron_right</span> Portal Choferes</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-blue-800 pb-2 inline-block">Contacto Central</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="material-icons text-secondary text-sm mt-1">location_on</span>
                  <span>{site.contact.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-icons text-secondary text-sm">phone</span>
                  <span>{site.contact.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-icons text-secondary text-sm">email</span>
                  <span>{site.contact.email}</span>
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
              <a href="/terms" className="hover:text-white transition">Términos y Condiciones</a>
              <a href="/privacy" className="hover:text-white transition">Política de Privacidad</a>
              <a href="/complaints" className="hover:text-white transition">Portal de Denuncias</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
