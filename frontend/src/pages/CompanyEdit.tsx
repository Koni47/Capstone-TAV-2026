import { useState } from 'react';
import { companyEditMockData } from '../mocks/data';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export function CompanyEdit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    razónSocial: companyEditMockData.company.razónSocial,
    rut: companyEditMockData.company.rut,
    contacto: companyEditMockData.company.contacto,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Empresa actualizada:', formData);
    navigate('/company-detail');
  };

  const handleCancel = () => {
    navigate('/company-detail');
  };

  return (
    <div className="bg-surface font-sans text-gray-800 min-h-screen">
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Editar Empresa</h1>

        <form className="bg-white rounded-lg shadow p-6 grid gap-4" onSubmit={handleSave}>
          <label className="block">
            <span className="text-sm text-slate-600">Razón Social</span>
            <input
              type="text"
              name="razónSocial"
              value={formData.razónSocial}
              onChange={handleChange}
              className="form-input mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">RUT</span>
            <input
              type="text"
              name="rut"
              value={formData.rut}
              onChange={handleChange}
              className="form-input mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">Contacto</span>
            <input
              type="email"
              name="contacto"
              value={formData.contacto}
              onChange={handleChange}
              className="form-input mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </label>

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-900 focus:outline-none transition"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
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

export default CompanyEdit;
