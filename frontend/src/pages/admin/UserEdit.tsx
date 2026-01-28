import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  User,
  Fingerprint,
  Mail,
  Phone,
  MapPin,
  Shield,
  Save,
  Trash2,
  ChevronRight,
  Edit,
} from 'lucide-react';

/**
 * UserEdit (Add/Edit User)
 * Implementation of user-edit.html
 */
const UserEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(false);

  // Initial state
  const [formData, setFormData] = useState({
    fullName: '',
    rut: '',
    email: '',
    phone: '',
    address: '',
    role: 'CLIENT',
    active: true,
  });

  useEffect(() => {
    if (isEditMode) {
      // Mock fetching data
      // In a real app, fetch from API using ID
      setFormData({
        fullName: 'Juan Pérez',
        rut: '12.345.678-9',
        email: 'juan.perez@example.com',
        phone: '+56 9 8765 4321',
        address: 'Av. Angamos 123',
        role: 'CLIENT',
        active: true,
      });
    }
  }, [isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(isEditMode ? 'Usuario actualizado exitosamente' : 'Usuario creado exitosamente');
      navigate('/admin/users');
    }, 1500);
  };

  const handleDelete = () => {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      alert('Usuario eliminado');
      navigate('/admin/users');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[calc(100vh-200px)]">
      {/* Breadcrumb & Header */}
      <div className="mb-8">
        <nav className="flex text-sm text-gray-500 mb-3" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/admin/dashboard" className="hover:text-primary transition">
                Inicio
              </Link>
            </li>
            <li>
              <ChevronRight size={14} className="text-gray-400" />
            </li>
            <li>
              <Link to="/admin/users" className="hover:text-primary transition">
                Usuarios
              </Link>
            </li>
            <li>
              <ChevronRight size={14} className="text-gray-400" />
            </li>
            {isEditMode && (
              <>
                <li>
                  <span className="hover:text-primary transition text-gray-500">
                    {formData.fullName}
                  </span>
                </li>
                <li>
                  <ChevronRight size={14} className="text-gray-400" />
                </li>
              </>
            )}
            <li className="text-secondary font-medium">
              {isEditMode ? 'Editar Perfil' : 'Nuevo Usuario'}
            </li>
          </ol>
        </nav>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              {isEditMode ? 'Editar Usuario' : 'Crear Usuario'}
            </h1>
            <p className="text-gray-500 mt-1">
              Actualice la información personal y permisos del sistema.
            </p>
          </div>
          {isEditMode && (
            <div className="hidden sm:block">
              <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-bold border border-blue-100 flex items-center gap-1">
                <Edit size={12} /> Modo Edición
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Edit Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative"
      >
        {/* Progress/Status Indicator (Decorative) */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-orange-400"></div>

        <div className="p-8 space-y-8">
          {/* Section 1: Identification */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
              <User className="text-primary" size={20} /> Identificación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Nombre Completo <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User
                      size={18}
                      className="text-gray-400 group-focus-within:text-secondary transition"
                    />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-xl border-gray-300 border bg-gray-50/50 p-2.5 focus:ring-2 focus:ring-secondary/20 focus:border-secondary focus:bg-white outline-none transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  RUT / DNI <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Fingerprint
                      size={18}
                      className="text-gray-400 group-focus-within:text-secondary transition"
                    />
                  </div>
                  <input
                    type="text"
                    name="rut"
                    value={formData.rut}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-xl border-gray-300 border bg-gray-50/50 p-2.5 focus:ring-2 focus:ring-secondary/20 focus:border-secondary focus:bg-white outline-none transition"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Access */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
              <Mail className="text-primary" size={20} /> Contacto y Acceso
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Correo Electrónico <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail
                      size={18}
                      className="text-gray-400 group-focus-within:text-secondary transition"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-xl border-gray-300 border bg-gray-50/50 p-2.5 focus:ring-2 focus:ring-secondary/20 focus:border-secondary focus:bg-white outline-none transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone
                      size={18}
                      className="text-gray-400 group-focus-within:text-secondary transition"
                    />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-xl border-gray-300 border bg-gray-50/50 p-2.5 focus:ring-2 focus:ring-secondary/20 focus:border-secondary focus:bg-white outline-none transition"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Dirección (Opcional)
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin
                      size={18}
                      className="text-gray-400 group-focus-within:text-secondary transition"
                    />
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-xl border-gray-300 border bg-gray-50/50 p-2.5 focus:ring-2 focus:ring-secondary/20 focus:border-secondary focus:bg-white outline-none transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: App Permissions */}
          <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
              <Shield className="text-primary" size={20} /> Rol y Permisos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Rol Asignado
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Shield size={18} className="text-gray-500" />
                  </div>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-xl border-gray-300 border bg-white p-2.5 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition appearance-none cursor-pointer"
                  >
                    <option value="CLIENT">Cliente Corporativo</option>
                    <option value="DRIVER">Chofer</option>
                    <option value="ADMIN">Administrador</option>
                    <option value="SUPPORT">Soporte</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronRight className="rotate-90 text-gray-400" size={16} />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-1">
                  <span className="font-bold">Info:</span> El Cliente Corporativo puede solicitar
                  viajes a crédito y ver reportes mensuales.
                </p>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-3 p-3 w-full bg-white rounded-xl border border-gray-200 cursor-pointer hover:border-blue-300 transition shadow-sm">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5 text-secondary rounded focus:ring-secondary border-gray-300"
                  />
                  <div>
                    <span className="block text-sm font-bold text-gray-800">Cuenta Activa</span>
                    <span className="block text-xs text-gray-500">
                      El usuario puede iniciar sesión.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer Actions */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
          {isEditMode ? (
            <button
              type="button"
              onClick={handleDelete}
              className="text-gray-500 font-medium hover:text-red-600 text-sm flex items-center gap-1 transition"
            >
              <Trash2 size={18} /> Eliminar Usuario
            </button>
          ) : (
            <div></div>
          )}

          <div className="flex w-full sm:w-auto gap-3">
            <Link
              to="/admin/users"
              className="flex-1 sm:flex-none text-center px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-white hover:border-gray-400 transition font-bold shadow-sm"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 sm:flex-none justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-800 text-white hover:shadow-lg hover:to-blue-900 transition font-bold shadow-md flex items-center gap-2 transform active:scale-95 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Save size={18} />
              )}
              Guardar Cambios
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
