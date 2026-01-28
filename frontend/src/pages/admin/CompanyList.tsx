import React, { useState } from 'react';
import {
  LayoutDashboard,
  Search,
  Filter,
  MoreVertical,
  Plus,
  Building,
  Briefcase,
  CheckCircle,
  XCircle,
  Edit2,
  Trash,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock Data for Companies
const MOCK_COMPANIES = [
  {
    id: 1,
    name: 'Minera Escondida',
    rut: '76.123.456-7',
    industry: 'Minería',
    contactName: 'Juan Pérez',
    email: 'contacto@escondida.cl',
    status: 'active',
    contracts: 3,
    employees: 150,
  },
  {
    id: 2,
    name: 'Codelco Norte',
    rut: '77.987.654-2',
    industry: 'Minería',
    contactName: 'Ana Rojas',
    email: 'proveedores@codelco.cl',
    status: 'active',
    contracts: 5,
    employees: 320,
  },
  {
    id: 3,
    name: 'Constructora Andes',
    rut: '78.432.109-8',
    industry: 'Construcción',
    contactName: 'Luis Soto',
    email: 'lsoto@andes.cl',
    status: 'inactive',
    contracts: 0,
    employees: 45,
  },
  {
    id: 4,
    name: 'Transportes Del Norte',
    rut: '76.555.444-K',
    industry: 'Logística',
    contactName: 'Pedro Diaz',
    email: 'pdiaz@tdn.cl',
    status: 'active',
    contracts: 1,
    employees: 22,
  },
];

const CompanyList = () => {
  const [companies] = useState(MOCK_COMPANIES);

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
          <CheckCircle size={12} /> Activo
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
        <XCircle size={12} /> Inactivo
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Breadcrumb */}
      <div>
        <nav className="flex text-sm text-gray-500 mb-2">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/admin/dashboard" className="hover:text-primary transition">
                Inicio
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li className="font-medium text-gray-900">Gestión de Clientes</li>
          </ol>
        </nav>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <Building className="text-secondary" /> Clientes Corporativos
            </h1>
            <p className="text-gray-500 mt-1">
              Gestión de empresas mineras, contratos y centros de costo.
            </p>
          </div>

          <Link
            to="/admin/companies/new"
            className="bg-secondary hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-2 font-bold"
          >
            <Plus size={20} /> Nueva Empresa
          </Link>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                Empresas Activas
              </div>
              <div className="text-3xl font-bold text-gray-900 mt-1">8</div>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Building size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                Contratos Vigentes
              </div>
              <div className="text-3xl font-bold text-gray-900 mt-1">12</div>
            </div>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <Briefcase size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                Solicitudes Mes
              </div>
              <div className="text-3xl font-bold text-gray-900 mt-1">1,240</div>
            </div>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <LayoutDashboard size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                Facturación Pend.
              </div>
              <div className="text-3xl font-bold text-gray-900 mt-1">$45M</div>
            </div>
            <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
              <span className="font-bold text-lg">$</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre, rut o contacto..."
            className="pl-10 w-full border border-gray-300 rounded-lg py-2 focus:ring-primary focus:border-primary outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 text-gray-700 font-medium transition">
            <Filter size={18} /> Filtros
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200 font-semibold">
              <tr>
                <th className="px-6 py-4">Empresa</th>
                <th className="px-6 py-4">Contacto Principal</th>
                <th className="px-6 py-4">Industria</th>
                <th className="px-6 py-4 text-center">Contratos</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50 transition group">
                  <td className="px-6 py-4">
                    <Link
                      to={`/admin/companies/${company.id}`}
                      className="font-bold text-gray-900 hover:text-primary transition"
                    >
                      {company.name}
                    </Link>
                    <div className="text-xs text-gray-500">{company.rut}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900 font-medium">{company.contactName}</div>
                    <div className="text-xs text-gray-500">{company.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                      {company.industry}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-gray-700">
                    {company.contracts}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(company.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-gray-400">
                      <Link
                        to={`/admin/companies/${company.id}/edit`}
                        className="p-2 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button
                        className="p-2 hover:text-red-600 hover:bg-red-50 rounded-full transition"
                        title="Eliminar"
                      >
                        <Trash size={16} />
                      </button>
                      <button className="p-2 hover:text-gray-800 hover:bg-gray-100 rounded-full transition">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination (Static for now) */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Mostrando <span className="font-bold">1-4</span> de{' '}
            <span className="font-bold">12</span> resultados
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm disabled:opacity-50"
              disabled
            >
              Anterior
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
