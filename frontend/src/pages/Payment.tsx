import { useState } from 'react';
import { paymentMockData, site } from '../mocks/data';

export function Payment() {
  const [showAssignPanel, setShowAssignPanel] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState('');
  const [formData, setFormData] = useState({
    clientType: 'empresa',
    origin: '',
    destination: '',
    date: '',
    time: '',
    notes: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nueva solicitud:', formData);
  };

  const toggleAssignPanel = (requestId: string) => {
    setSelectedRequestId(requestId);
    setShowAssignPanel(!showAssignPanel);
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Asignando:', selectedRequestId);
    setShowAssignPanel(false);
  };

  return (
    <div className="bg-surface font-sans text-gray-800 min-h-screen">
      {/* Navigation */}
      <nav className="bg-primary text-white shadow-lg w-full sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="flex-shrink-0 text-white flex items-center gap-2 font-bold text-xl cursor-pointer">
                <span className="material-icons text-secondary">local_shipping</span> EL LOA
              </a>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="/dashboard-admin" className="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                    Dashboard Admin
                  </a>
                  <a href="/dashboard-client" className="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                    Dashboard Cliente
                  </a>
                  <a href="/dashboard-driver" className="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                    Dashboard Chofer
                  </a>
                  <a href="/dashboard-admin" className="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                    Dashboard Admin
                  </a>
                  <a href="/dashboard-client" className="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                    Dashboard Cliente
                  </a>
                  <a href="/dashboard-driver" className="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                    Dashboard Chofer
                  </a>
                  <a href="/service-request" className="bg-blue-900 text-white px-3 py-2 rounded-md text-sm font-medium border-b-4 border-secondary h-16 flex items-center pt-1">
                    Solicitudes
                  </a>
                  <a href="/companies" className="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                    Clientes
                  </a>
                  <a href="/vehicles" className="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                    Flota
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-primary p-1 rounded-full text-gray-400 hover:text-white transition">
                <span className="material-icons">notifications</span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-blue-800">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold leading-none">{paymentMockData.user.name}</p>
                  <p className="text-xs text-blue-300">{paymentMockData.user.role}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-white text-xs font-bold ring-2 ring-blue-900">
                  ZK
                </div>
                <a href="/" className="text-gray-400 hover:text-white ml-2">
                  <span className="material-icons text-sm">logout</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 sticky top-24">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                  <span className="material-icons text-secondary">add_circle</span> Nueva Solicitud
                </h2>
              </div>

              <form className="p-6 space-y-4" onSubmit={handleCreateRequest}>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tipo de Cliente</label>
                  <select
                    name="clientType"
                    value={formData.clientType}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="empresa">Empresa / Convenio</option>
                    <option value="persona">Persona Natural</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Origen</label>
                  <div className="relative">
                    <span className="material-icons absolute left-3 top-2 text-gray-400 text-sm">trip_origin</span>
                    <input
                      type="text"
                      name="origin"
                      value={formData.origin}
                      onChange={handleFormChange}
                      placeholder="Dirección de retiro"
                      className="w-full pl-9 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Destino</label>
                  <div className="relative">
                    <span className="material-icons absolute left-3 top-2 text-gray-400 text-sm">location_on</span>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleFormChange}
                      placeholder="Dirección de destino"
                      className="w-full pl-9 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Fecha</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Hora</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Notas / Pasajeros</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleFormChange}
                    rows={3}
                    placeholder="Nombres de pax, centro de costo, etc."
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-secondary hover:bg-orange-700 text-white font-bold py-2 px-4 rounded shadow-md transition flex justify-center items-center gap-2"
                >
                  <span className="material-icons text-sm">save</span> Crear Solicitud
                </button>
              </form>
            </div>
          </div>

          {/* Requests List */}
          <div className="w-full lg:w-2/3 space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">Listado de Solicitudes</h2>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {paymentMockData.stats.pending} Pendientes
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {paymentMockData.stats.inRoute} En Ruta
                </span>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID / Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ruta
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                  {paymentMockData.requests.map((request) => (
                    <tr key={request.id} className={`hover:bg-blue-50 transition border-l-4 border-${request.borderColor}-400`}>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{request.id}</div>
                        <div className="text-xs text-gray-500">{request.client}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <span className="material-icons text-[10px] text-green-600">circle</span> {request.origin}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <span className="material-icons text-[10px] text-red-600">location_on</span> {request.destination}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{request.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            request.statusColor === 'yellow'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {request.status === 'Pendiente' ? (
                          <button
                            onClick={() => toggleAssignPanel(request.id)}
                            className="text-secondary hover:text-orange-900 font-bold bg-orange-50 px-3 py-1 rounded border border-orange-200"
                          >
                            ASIGNAR
                          </button>
                        ) : (
                          <>
                            <button className="text-primary hover:text-blue-900 mr-2">Ver</button>
                            <button className="text-gray-400 hover:text-red-600">
                              <span className="material-icons text-sm">cancel</span>
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Assign Panel */}
            {showAssignPanel && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-inner">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-primary">
                    Asignando Recurso: <span className="text-gray-600">{selectedRequestId}</span>
                  </h3>
                  <button
                    onClick={() => setShowAssignPanel(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="material-icons">close</span>
                  </button>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end" onSubmit={handleAssignSubmit}>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Chofer Disponible</label>
                    <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white">
                      <option value="">Seleccionar...</option>
                      {paymentMockData.drivers.map((driver) => (
                        <option key={driver.id} value={driver.id}>
                          {driver.name} ({driver.status})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Vehículo</label>
                    <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white">
                      <option value="">Seleccionar...</option>
                      {paymentMockData.vehicles.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.name} ({vehicle.plate})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="bg-success hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow transition flex justify-center items-center gap-2"
                  >
                    <span className="material-icons text-sm">check_circle</span> Confirmar Asignación
                  </button>
                </form>
              </div>
            )}
          </div>
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
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-secondary transition text-white"
                >
                  <span className="material-icons text-sm">facebook</span>
                </a>
                <a
                  href="https://elloa.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-secondary transition text-white"
                >
                  <span className="material-icons text-sm">public</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-secondary transition text-white"
                >
                  <span className="material-icons text-sm">photo_camera</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-blue-800 pb-2 inline-block">
                Navegación
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/" className="hover:text-secondary transition flex items-center gap-2">
                    <span className="material-icons text-xs">chevron_right</span> Inicio
                  </a>
                </li>
                <li>
                  <a href="/service-request" className="hover:text-secondary transition flex items-center gap-2">
                    <span className="material-icons text-xs">chevron_right</span> Solicitudes
                  </a>
                </li>
                <li>
                  <a href="/companies" className="hover:text-secondary transition flex items-center gap-2">
                    <span className="material-icons text-xs">chevron_right</span> Clientes
                  </a>
                </li>
                <li>
                  <a href="/client-portal" className="hover:text-secondary transition flex items-center gap-2">
                    <span className="material-icons text-xs">chevron_right</span> Portal Choferes
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-blue-800 pb-2 inline-block">
                Contacto Central
              </h3>
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
              <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-blue-800 pb-2 inline-block">
                Descarga la App
              </h3>
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
              <a href="/terms" className="hover:text-white transition">
                Términos y Condiciones
              </a>
              <a href="/privacy" className="hover:text-white transition">
                Política de Privacidad
              </a>
              <a href="/complaints" className="hover:text-white transition">
                Portal de Denuncias
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Payment;
