import { useState } from 'react';
import { companiesMockData, site } from '../mocks/data';
import Header from '../components/Header';

export function Companies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos los estados');
  const [currentPage, setCurrentPage] = useState(1);

  const getAvatarColors = (bgColor: string) => {
    const colors: Record<string, string> = {
      indigo: 'bg-indigo-100 text-indigo-600',
      orange: 'bg-orange-100 text-orange-600',
      gray: 'bg-gray-200 text-gray-600',
    };
    return colors[bgColor] || colors.indigo;
  };

  const getStatusStyles = (status: string) => {
    const styles: Record<string, string> = {
      green: 'bg-green-100 text-green-800 border-green-200',
      red: 'bg-red-100 text-red-800 border-red-200',
    };
    return styles[status] || styles.green;
  };

  return (
    <div className="bg-surface font-sans text-gray-800 min-h-screen">
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-primary sm:text-3xl sm:truncate">
              Clientes Corporativos
            </h2>
            <p className="mt-1 text-sm text-gray-500">Gestión de empresas mineras y centros de costo.</p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-orange-700 focus:outline-none transition">
              <span className="material-icons text-sm mr-2">add</span> Nueva Empresa
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-secondary">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Empresas Activas</dt>
              <dd className="mt-1 text-3xl font-bold text-gray-900">{companiesMockData.stats.totalCompanies}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-blue-400">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Contratos por Vencer</dt>
              <dd className="mt-1 text-3xl font-bold text-gray-900">{companiesMockData.stats.expiringContracts}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-green-400">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Viajes Facturados (Mes)</dt>
              <dd className="mt-1 text-3xl font-bold text-gray-900">{companiesMockData.stats.billedTripsMonth}</dd>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-icons text-gray-400">search</span>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Buscar por RUT o Razón Social..."
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md border"
            >
              <option>Todos los estados</option>
              <option>Activos</option>
              <option>Inactivos</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
              <span className="material-icons text-sm mr-2">file_download</span> Exportar
            </button>
          </div>
        </div>

        {/* Companies Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa / RUT
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Centro de Costo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Contacto
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companiesMockData.companies.map((company: any) => (
                <tr key={company.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center font-bold ${getAvatarColors(company.avatarBgColor)}`}>
                        {company.initials}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-gray-900">{company.name}</div>
                        <div className="text-sm text-gray-500">{company.rut}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{company.costCenter}</div>
                    <div className="text-xs text-gray-500">{company.costCenterDesc}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="text-sm text-gray-900">{company.contact.name}</div>
                    <div className="text-xs text-gray-500">{company.contact.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusStyles(company.statusColor)}`}>
                      {company.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="/company-detail" className="text-primary hover:text-blue-900 mr-3">
                      Editar
                    </a>
                    <a href="/company-detail" className="text-gray-400 hover:text-gray-600">
                      <span className="material-icons text-sm">more_vert</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{companiesMockData.pagination.showingFrom}</span> a{' '}
                  <span className="font-medium">{companiesMockData.pagination.showingTo}</span> de{' '}
                  <span className="font-medium">{companiesMockData.pagination.totalResults}</span> resultados
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="material-icons text-sm">chevron_left</span>
                  </button>
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? 'border-gray-300 bg-blue-50 text-primary'
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="material-icons text-sm">chevron_right</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#002244] text-gray-300 border-t-4 border-secondary mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <span className="material-icons text-secondary text-3xl">local_shipping</span>
                <span className="font-bold text-xl tracking-wide">Servicios El Loa</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">
                Líderes en transporte corporativo y privado en la región de Antofagasta. Seguridad, puntualidad y tecnología al servicio de la minería.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-secondary transition text-white">
                  <span className="material-icons text-sm">facebook</span>
                </a>
                <a href="https://elloa.cl" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-secondary transition text-white">
                  <span className="material-icons text-sm">public</span>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-secondary transition text-white">
                  <span className="material-icons text-sm">photo_camera</span>
                </a>
              </div>
            </div>

            {/* Navigation */}
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

            {/* Contact */}
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

            {/* App Downloads */}
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

        {/* Copyright */}
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

export default Companies;
