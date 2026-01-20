import { useState } from 'react';
import { profileMockData } from '../mocks/data';

export function Profile() {
  const [formData, setFormData] = useState({
    fullName: profileMockData.user.fullName,
    email: profileMockData.user.email,
    phone: profileMockData.user.phone,
    newPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
  };

  return (
    <div className="bg-gray-50 font-sans flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-primary rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold mb-4 border-4 border-white shadow-md">
            {profileMockData.user.initials}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{profileMockData.user.fullName}</h1>
          <p className="text-sm text-gray-500">{profileMockData.user.role}</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="mt-1 w-full border border-gray-200 bg-gray-50 rounded px-3 py-2 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <hr className="my-4" />

          <div>
            <label className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-blue-900 text-white font-bold py-2 rounded shadow transition mt-4"
          >
            Guardar Cambios
          </button>
          <a href="/" className="block text-center text-sm text-gray-500 mt-4 hover:text-gray-700">
            Volver al Inicio
          </a>
        </form>
      </div>
    </div>
  );
}

export default Profile;
