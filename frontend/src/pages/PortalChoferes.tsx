import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Driver {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  calificacion: number;
  vehiculo: {
    id: string;
    patente: string;
    modelo: string;
    año: number;
    estado: string;
  };
  solicitudesAsignadas: number;
}

interface Request {
  id: string;
  origen: string;
  destino: string;
  fecha: string;
  pax: number;
  estado: string;
}

interface Assignment {
  id: string;
  origen: string;
  destino: string;
  cliente: string;
  fecha: string;
  estado: string;
}

const PortalChoferes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mis-solicitudes' | 'choferes'>('mis-solicitudes');
  const [showModal, setShowModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<string>('');

  // Simulated data
  const choferesData: Driver[] = [
    {
      id: '1',
      nombre: 'Juan Pérez García',
      email: 'juan.perez@elloa.cl',
      telefono: '+56 9 8765 4321',
      calificacion: 4.8,
      vehiculo: {
        id: 'v1',
        patente: 'LHYT-88',
        modelo: 'Toyota Hiace',
        año: 2023,
        estado: 'DISPONIBLE'
      },
      solicitudesAsignadas: 2
    },
    {
      id: '2',
      nombre: 'Carlos Rodríguez López',
      email: 'carlos.rodriguez@elloa.cl',
      telefono: '+56 9 9876 5432',
      calificacion: 4.6,
      vehiculo: {
        id: 'v2',
        patente: 'LHYT-89',
        modelo: 'Mercedes Sprinter',
        año: 2022,
        estado: 'EN_RUTA'
      },
      solicitudesAsignadas: 3
    },
    {
      id: '3',
      nombre: 'Miguel Fernández Silva',
      email: 'miguel.fernandez@elloa.cl',
      telefono: '+56 9 7654 3210',
      calificacion: 4.9,
      vehiculo: {
        id: 'v3',
        patente: 'LHYT-90',
        modelo: 'Ford Transit',
        año: 2024,
        estado: 'DISPONIBLE'
      },
      solicitudesAsignadas: 1
    },
    {
      id: '4',
      nombre: 'Roberto González Martínez',
      email: 'roberto.gonzalez@elloa.cl',
      telefono: '+56 9 6543 2109',
      calificacion: 4.5,
      vehiculo: {
        id: 'v4',
        patente: 'LHYT-91',
        modelo: 'Toyota Coaster',
        año: 2021,
        estado: 'DISPONIBLE'
      },
      solicitudesAsignadas: 4
    }
  ];

  const solicitudesData: Request[] = [
    {
      id: 'req-001',
      origen: 'Aeropuerto Santiago',
      destino: 'Faena Minera La Moneda',
      fecha: '2025-01-22T09:00:00Z',
      pax: 4,
      estado: 'PENDIENTE'
    },
    {
      id: 'req-002',
      origen: 'Centro Comercial Las Condes',
      destino: 'Hotel W Santiago',
      fecha: '2025-01-22T14:30:00Z',
      pax: 2,
      estado: 'PENDIENTE'
    },
    {
      id: 'req-003',
      origen: 'Terminal de Buses',
      destino: 'Residencia Corporativa',
      fecha: '2025-01-22T16:00:00Z',
      pax: 6,
      estado: 'PENDIENTE'
    }
  ];

  const misAsignaciones: Assignment[] = [
    {
      id: 'req-101',
      origen: 'Aeropuerto',
      destino: 'Faena',
      cliente: 'Minera Gaby',
      fecha: '20/01/2025 08:30',
      estado: 'EN_RUTA'
    },
    {
      id: 'req-102',
      origen: 'Hotel',
      destino: 'Centro Comercial',
      cliente: 'Corporativo X',
      fecha: '20/01/2025 14:00',
      estado: 'COMPLETADO'
    }
  ];

  const switchTab = (tabName: 'mis-solicitudes' | 'choferes') => {
    setActiveTab(tabName);
  };

  const openAssignModal = (driverId: string) => {
    setSelectedDriver(driverId);
    setShowModal(true);
    setSelectedRequest('');
  };

  const closeAssignModal = () => {
    setShowModal(false);
    setSelectedDriver(null);
    setSelectedRequest('');
  };

  const confirmAssignment = () => {
    if (!selectedRequest) {
      alert('Por favor selecciona una solicitud');
      return;
    }
    alert(`✅ Solicitud asignada exitosamente\nChofer ID: ${selectedDriver}\nSolicitud: ${selectedRequest}`);
    closeAssignModal();
  };

interface AssignmentStatus {
  bg: string;
  text: string;
}

interface VehicleStatus {
  color: string;
  bg: string;
}

  const getStatusColors = (estado: string, type: 'assignment' | 'vehicle' = 'assignment'): AssignmentStatus | VehicleStatus => {
    if (type === 'assignment') {
      const colors: Record<string, AssignmentStatus> = {
        'EN_RUTA': { bg: 'bg-green-100', text: 'text-green-800' },
        'COMPLETADO': { bg: 'bg-blue-100', text: 'text-blue-800' }
      };
      return colors[estado] || { bg: 'bg-gray-100', text: 'text-gray-800' };
    } else {
      const colors: Record<string, VehicleStatus> = {
        'DISPONIBLE': { color: 'text-green-600', bg: 'bg-green-50' },
        'EN_RUTA': { color: 'text-blue-600', bg: 'bg-blue-50' },
        'MANTENCION': { color: 'text-yellow-600', bg: 'bg-yellow-50' }
      };
      return colors[estado] || { color: 'text-gray-600', bg: 'bg-gray-50' };
    }
  };

  const selectedRequestDetails = solicitudesData.find(req => req.id === selectedRequest);

  return (
    <div className="bg-surface font-sans text-gray-800 min-h-screen">
      {/* Navbar */}
      <nav className="bg-primary text-white shadow-lg w-full sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 text-white flex items-center gap-2 font-bold text-xl cursor-pointer">
                <span className="material-icons text-secondary">local_shipping</span> EL LOA
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = '/AdminDashboard'; }} className="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Dashboard</a>
                  <Link to="/service-request" className="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Solicitudes</Link>
                  <Link to="/users" className="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Usuarios</Link>
                  <Link to="/companies" className="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Clientes</Link>
                  <Link to="/vehicles" className="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Flota</Link>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-primary p-1 rounded-full text-gray-400 hover:text-white transition">
                <span className="material-icons">notifications</span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-blue-800">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold leading-none">Usuario</p>
                  <p className="text-xs text-blue-300">Chofer</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-white text-xs font-bold ring-2 ring-blue-900">US</div>
                <Link to="/logout" className="ml-2 text-sm font-semibold hover:text-gray-300">Salir</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
            <span className="material-icons text-4xl text-secondary">people</span> Portal de Choferes
          </h1>
          <p className="text-gray-600 mt-2">Gestiona tus datos y asignaciones de viajes</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-300">
          <button
            onClick={() => switchTab('mis-solicitudes')}
            className={`px-4 py-3 font-semibold border-b-4 transition ${
              activeTab === 'mis-solicitudes'
                ? 'border-secondary text-primary'
                : 'border-transparent text-gray-600 hover:text-primary'
            }`}
          >
            <span className="material-icons inline mr-2">assignment</span> Mis Solicitudes
          </button>
          <button
            onClick={() => switchTab('choferes')}
            className={`px-4 py-3 font-semibold border-b-4 transition ${
              activeTab === 'choferes'
                ? 'border-secondary text-primary'
                : 'border-transparent text-gray-600 hover:text-primary'
            }`}
          >
            <span className="material-icons inline mr-2">people_alt</span> Choferes Disponibles
          </button>
        </div>

        {/* TAB 1: MIS SOLICITUDES */}
        {activeTab === 'mis-solicitudes' && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <span className="material-icons">assignment_turned_in</span> Mis Solicitudes Asignadas
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Solicitud</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ruta</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha/Hora</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {misAsignaciones.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        No tienes solicitudes asignadas
                      </td>
                    </tr>
                  ) : (
                    misAsignaciones.map((asignacion) => {
                      const status = getStatusColors(asignacion.estado, 'assignment') as AssignmentStatus;
                      return (
                        <tr key={asignacion.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-primary">#{asignacion.id}</td>
                          <td className="px-6 py-4 text-sm">
                            <div><span className="material-icons text-[14px] text-green-600 inline">circle</span> {asignacion.origen}</div>
                            <div><span className="material-icons text-[14px] text-red-600 inline">location_on</span> {asignacion.destino}</div>
                          </td>
                          <td className="px-6 py-4 text-sm">{asignacion.cliente}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{asignacion.fecha}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${status.bg} ${status.text}`}>
                              {asignacion.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <button className="text-blue-600 hover:text-blue-900 font-semibold">Ver Detalles</button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CHOFERES DISPONIBLES */}
        {activeTab === 'choferes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {choferesData.map((chofer) => {
              const status = getStatusColors(chofer.vehiculo.estado, 'vehicle') as VehicleStatus;
              return (
                <div key={chofer.id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition">
                  {/* Header con datos del chofer */}
                  <div className="bg-primary text-white p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold">
                          {chofer.nombre.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{chofer.nombre}</h3>
                          <p className="text-blue-200 text-sm">{chofer.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body con datos del vehículo */}
                  <div className="p-4 space-y-3">
                    {/* Teléfono */}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="material-icons text-secondary text-lg">phone</span>
                      <span>{chofer.telefono}</span>
                    </div>

                    {/* Calificación */}
                    <div className="flex items-center gap-2">
                      <span className="material-icons text-yellow-500">star</span>
                      <span className="font-semibold">{chofer.calificacion}</span>
                      <span className="text-gray-500 text-sm">({chofer.solicitudesAsignadas} viajes completados)</span>
                    </div>

                    {/* Vehículo */}
                    <div className="border-t pt-3">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-2">Vehículo Asignado</p>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-primary">{chofer.vehiculo.modelo}</span>
                          <span className={`material-icons ${status.color}`}>directions_car</span>
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                          <p><strong>Patente:</strong> {chofer.vehiculo.patente}</p>
                          <p><strong>Año:</strong> {chofer.vehiculo.año}</p>
                          <p className="pt-2">
                            <span className={`px-2 py-1 ${status.bg} ${status.color} rounded-full text-xs font-semibold`}>
                              {chofer.vehiculo.estado}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer con botón */}
                  <div className="border-t p-4 bg-gray-50">
                    <button
                      onClick={() => openAssignModal(chofer.id)}
                      className="w-full bg-secondary hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition flex items-center justify-center gap-2"
                    >
                      <span className="material-icons text-sm">assignment</span> Asignar Solicitud
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modal de Asignación */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4">
            <div className="bg-primary text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="material-icons">task</span> Asignar Solicitud
              </h3>
              <button onClick={closeAssignModal} className="text-white hover:bg-blue-800 rounded-full p-2">
                <span className="material-icons">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Solicitud</label>
                <select
                  value={selectedRequest}
                  onChange={(e) => setSelectedRequest(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="">-- Seleccionar Solicitud --</option>
                  {solicitudesData.map((req) => (
                    <option key={req.id} value={req.id}>
                      {req.id} - {req.origen} → {req.destino}
                    </option>
                  ))}
                </select>
              </div>

              {selectedRequestDetails && (
                <div className="bg-gray-50 p-4 rounded">
                  <div className="space-y-2 text-sm">
                    <p><strong>Origen:</strong> {selectedRequestDetails.origen}</p>
                    <p><strong>Destino:</strong> {selectedRequestDetails.destino}</p>
                    <p><strong>Fecha/Hora:</strong> {new Date(selectedRequestDetails.fecha).toLocaleDateString('es-CL')} {new Date(selectedRequestDetails.fecha).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}</p>
                    <p><strong>Pasajeros:</strong> {selectedRequestDetails.pax}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button onClick={closeAssignModal} className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded font-semibold transition">
                  Cancelar
                </button>
                <button onClick={confirmAssignment} className="flex-1 px-4 py-2 bg-secondary hover:bg-orange-700 text-white rounded font-semibold transition flex items-center justify-center gap-2">
                  <span className="material-icons text-sm">check</span> Aceptar
                </button>
              </div>
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

export default PortalChoferes;