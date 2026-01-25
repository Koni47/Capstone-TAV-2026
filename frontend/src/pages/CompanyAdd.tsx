import React, { useState, FormEvent } from 'react'
import { useNavigate } from "react-router-dom";
import { createCompany } from '../services/api';
import Header from '../components/Header';

export default function CompanyAdd() {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [companyInfo, setCompanyInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Validar RUT
    const rut = formData.get('rut') as string;
    const rutPattern = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$/;
    if (!rutPattern.test(rut)) {
      alert('Formato de RUT inválido. Use formato 12.345.678-9');
      setLoading(false);
      return;
    }

    // Validar email
    const email = formData.get('contactEmail') as string;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Formato de email inválido');
      setLoading(false);
      return;
    }

    try {
      const companyData = {
        name: formData.get('name') as string,
        rut: rut,
        address: formData.get('address') as string,
        contactName: formData.get('contactName') as string,
        contactEmail: email,
        phone: formData.get('phone') as string || undefined,
        costCenter: formData.get('costCenter') as string || undefined,
        contractEnd: formData.get('contractEnd') as string || undefined
      };

      console.log('Sending company data:', companyData);
      const response = await createCompany(companyData);
      console.log('Company creation response:', response);
      
      setCompanyInfo(`${companyData.name} - RUT: ${companyData.rut}`);
      setShowSuccessModal(true);
      form.reset();
    } catch (error: any) {
      console.error('Error al registrar empresa:', error);
      console.error('Error response:', error.response);
      alert(error.response?.data?.message || error.message || 'Error al registrar la empresa');
    } finally {
      setLoading(false);
    }
  };

  const closeModalAndRedirect = () => {
    setShowSuccessModal(false);
    navigate('/companies');
  };

  return (
    <div className="bg-surface font-sans text-gray-800 min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li><button onClick={() => navigate('/')} className="hover:text-primary transition">Inicio</button></li>
            <li><span className="text-gray-400">/</span></li>
            <li><button onClick={() => navigate('/companies')} className="hover:text-primary transition">Empresas</button></li>
            <li><span className="text-gray-400">/</span></li>
            <li className="text-gray-800 font-medium">Agregar Empresa</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
            <span className="material-icons">business</span>
            Agregar Nueva Empresa
          </h1>
          <p className="text-gray-600 mt-2">Complete los campos para registrar una nueva empresa cliente</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre/Razón Social */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Razón Social *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Minera ABC S.A."
                />
              </div>

              {/* RUT */}
              <div>
                <label htmlFor="rut" className="block text-sm font-medium text-gray-700 mb-2">
                  RUT *
                </label>
                <input
                  type="text"
                  id="rut"
                  name="rut"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="12.345.678-9"
                />
              </div>

              {/* Centro de Costo */}
              <div>
                <label htmlFor="costCenter" className="block text-sm font-medium text-gray-700 mb-2">
                  Centro de Costo
                </label>
                <input
                  type="text"
                  id="costCenter"
                  name="costCenter"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="CC-001"
                />
              </div>

              {/* Dirección */}
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Av. Granaderos 2550, Calama"
                />
              </div>

              {/* Nombre Contacto */}
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Contacto *
                </label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Juan Pérez"
                />
              </div>

              {/* Email Contacto */}
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Contacto *
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="contacto@mineraabc.cl"
                />
              </div>

              {/* Teléfono */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="+56 9 1234 5678"
                />
              </div>

              {/* Fin de Contrato */}
              <div>
                <label htmlFor="contractEnd" className="block text-sm font-medium text-gray-700 mb-2">
                  Fin de Contrato
                </label>
                <input
                  type="date"
                  id="contractEnd"
                  name="contractEnd"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/companies')}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Registrando...
                  </>
                ) : (
                  <>
                    <span className="material-icons text-sm">save</span>
                    Registrar Empresa
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <span className="material-icons text-green-600">check_circle</span>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-bold text-gray-900">
                    Empresa Registrada Exitosamente
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      La empresa <span className="font-semibold">{companyInfo}</span> ha sido registrada correctamente en el sistema.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={closeModalAndRedirect}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-blue-900 focus:outline-none sm:text-sm"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
