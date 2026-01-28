import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Building, User, Phone, Mail, Save, ArrowLeft, MapPin, Briefcase } from 'lucide-react';

const CompanyEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    rut: '',
    industry: 'Minería',
    contactName: '',
    phone: '',
    email: '',
    address: '',
    status: 'active',
  });

  // Mock Data Loading (Replace with API call)
  useEffect(() => {
    if (!isNew) {
      // Simulate fetching data
      setFormData({
        name: 'Minera Escondida Ltda.',
        rut: '76.123.456-K',
        industry: 'Minería',
        contactName: 'Roberto Díaz',
        phone: '+56 55 212 3456',
        email: 'rdiaz@escondida.cl',
        address: 'Av. La Minería 123',
        status: 'active',
      });
    }
  }, [id, isNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting:', formData);
    // Add API logic here
    navigate('/admin/companies');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
      {/* Decorative Side Panel (Hidden on Mobile) */}
      <div className="hidden lg:block lg:w-5/12 relative bg-primary">
        <img
          src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
          alt="Corporate Office"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
        />
        <div className="absolute bottom-0 left-0 p-12 text-white z-10">
          <blockquote className="border-l-4 border-secondary pl-4 mb-4">
            <p className="text-xl font-medium italic">
              &quot;Gestión eficiente para relaciones duraderas.&quot;
            </p>
          </blockquote>
          <h2 className="text-3xl font-bold">Servicios Corporativos</h2>
          <p className="text-blue-200 mt-2">Administración centralizada de clientes y convenios.</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 bg-gray-50 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-6 md:p-12">
          {/* Breadcrumb */}
          <nav className="flex text-sm text-gray-500 mb-6">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/admin/dashboard" className="hover:text-primary transition">
                  Inicio
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <Link to="/admin/companies" className="hover:text-primary transition">
                  Clientes
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li className="text-gray-900 font-medium">
                {isNew ? 'Nueva Empresa' : 'Editar Empresa'}
              </li>
            </ol>
          </nav>

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isNew ? 'Registrar Empresa' : 'Editar Empresa'}
              </h1>
              <p className="text-gray-600">
                Actualice la información comercial y puntos de contacto.
              </p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 font-medium"
            >
              <ArrowLeft size={18} /> Volver
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-8 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 animate-fadeIn"
          >
            {/* Section: Datos Empresa */}
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-2">
                <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                  <Building className="text-secondary" size={20} /> Información Corporativa
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Razón Social
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: Minera Escondida Ltda."
                    className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">RUT</label>
                  <input
                    type="text"
                    name="rut"
                    value={formData.rut}
                    onChange={handleChange}
                    placeholder="XX.XXX.XXX-X"
                    className={`w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition ${!isNew ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
                    readOnly={!isNew}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rubro</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full pl-10 rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition bg-white"
                    >
                      <option value="Minería">Minería</option>
                      <option value="Transporte">Transporte</option>
                      <option value="Construcción">Construcción</option>
                      <option value="Servicios">Servicios</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Contacto */}
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-2">
                <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                  <User className="text-secondary" size={20} /> Contacto Principal
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre Contacto
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="Nombre completo"
                      className="pl-10 w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+56 9 1234 5678"
                      className="pl-10 w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Corporativo
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contacto@empresa.cl"
                      className="pl-10 w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Ubicación y Estado */}
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-2">
                <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                  <MapPin className="text-secondary" size={20} /> Ubicación
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección Principal
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Calle, Número, Ciudad"
                    className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition bg-white"
                  >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                    <option value="suspended">Suspendido</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 mt-6">
              <Link
                to="/admin/companies"
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                className="bg-primary hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-2 font-bold"
              >
                <Save size={18} />
                {isNew ? 'Crear Empresa' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyEdit;
