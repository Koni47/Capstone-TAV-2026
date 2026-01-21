import { useState } from 'react';
import { companiesPage2MockData, site } from '../mocks/data';
import Header from '../components/Header';

export function CompaniesPage2() {
  const [currentPage, setCurrentPage] = useState(2);

  const getAvatarColors = (bgColor: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      red: 'bg-red-100 text-red-600',
      purple: 'bg-purple-100 text-purple-600',
      green: 'bg-green-100 text-green-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      orange: 'bg-orange-100 text-orange-600',
      gray: 'bg-gray-200 text-gray-600',
    };
    return colors[bgColor] || colors.blue;
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
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Clientes — Página {companiesPage2MockData.pagination.currentPage}</h1>

        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <p className="text-sm text-gray-600">{companiesPage2MockData.message}</p>
          <div className="mt-4">
            <a href="/companies" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-900 focus:outline-none transition">
              Volver a página 1
            </a>
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
              {companiesPage2MockData.companies.map((company) => (
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
                  Mostrando <span className="font-medium">{companiesPage2MockData.pagination.showingFrom}</span> a{' '}
                  <span className="font-medium">{companiesPage2MockData.pagination.showingTo}</span> de{' '}
                  <span className="font-medium">{companiesPage2MockData.pagination.totalResults}</span> resultados
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
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-slate-600">
          © 2026 Servicios de Transporte El Loa
        </div>
      </footer>
    </div>
  );
}

export default CompaniesPage2;
