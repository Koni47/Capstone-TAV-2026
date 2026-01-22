import { useState } from 'react';
import { companyEditMockData } from '../services/mockApi';
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
    <div className="bg-gray-50 font-sans text-gray-800 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto p-6 lg:p-10 w-full">
        {/* Navigation & Header */}
        <div className="mb-8">
          <button 
            onClick={handleCancel} 
            className="text-gray-500 hover:text-primary flex items-center gap-1 transition-colors mb-4 group"
          >
            <span className="material-icons text-sm transition-transform group-hover:-translate-x-1">arrow_back</span> 
            Cancelar y Volver
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
              <span className="material-icons text-3xl">business</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">Editar Empresa</h1>
              <p className="text-slate-500 font-medium">Actualice la ficha comercial del cliente</p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Field: Razón Social */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block ml-1 uppercase tracking-wider">
                    Razón Social
                  </label>
                  <div className="relative">
                    <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">corporate_fare</span>
                    <input
                      type="text"
                      name="razónSocial"
                      value={formData.razónSocial}
                      onChange={handleChange}
                      placeholder="Nombre de la empresa"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Field: RUT */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block ml-1 uppercase tracking-wider">
                    RUT Empresa
                  </label>
                  <div className="relative">
                    <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">assignment_ind</span>
                    <input
                      type="text"
                      name="rut"
                      value={formData.rut}
                      onChange={handleChange}
                      placeholder="12.345.678-9"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Field: Contacto (Full width) */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 block ml-1 uppercase tracking-wider">
                    Nombre de Contacto / Email
                  </label>
                  <div className="relative">
                    <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">contact_mail</span>
                    <input
                      type="text"
                      name="contacto"
                      value={formData.contacto}
                      onChange={handleChange}
                      placeholder="Ej: Juan Soto - jsoto@empresa.cl"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 border-t border-gray-100 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 text-slate-600 font-bold hover:bg-gray-100 rounded-xl transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-secondary text-white rounded-xl font-bold shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  <span className="material-icons">save</span>
                  Confirmar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-10 border-t border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-400">
          © 2026 Transportes El Loa | Gestión de Clientes Corporativos
        </div>
      </footer>
    </div>
  );
}

export default CompanyEdit;
