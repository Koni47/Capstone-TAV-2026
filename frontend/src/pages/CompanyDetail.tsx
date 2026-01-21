import { companyDetailMockData } from '../mocks/data';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function CompanyDetail() {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/company-edit');
  };

  const handleBack = () => {
    navigate('/companies');
  };

  return (
    <div className="bg-surface font-sans text-gray-800 min-h-screen">
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-6">
        <div className="mb-4">
          <button onClick={handleBack} className="text-gray-500 hover:text-primary flex items-center gap-1 transition-colors">
            <span className="material-icons text-sm">arrow_back</span>
            Volver a Clientes
          </button>
        </div>
        <h1 className="text-3xl font-bold text-primary mb-6">{companyDetailMockData.company.name}</h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                <span className="material-icons text-primary">info</span> Información General
              </h2>
              <div className="space-y-3">
                <p><strong>RUT:</strong> {companyDetailMockData.company.rut}</p>
                <p><strong>Email Principal:</strong> {companyDetailMockData.company.contact.email}</p>
                <p><strong>Representante:</strong> {companyDetailMockData.company.contact.name}</p>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                <span className="material-icons text-secondary">description</span> Detalles Adicionales
              </h2>
              <p className="text-gray-600 italic">"{companyDetailMockData.company.description}"</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex gap-4">
            <button
              onClick={handleEdit}
              className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none transition group"
            >
              <span className="material-icons text-sm mr-2 transition-transform group-hover:scale-110">edit</span>
              Editar Empresa
            </button>
            <button
              onClick={handleBack}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition flex items-center gap-2"
            >
              Volver
            </button>
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
