import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { getProfile } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getProfile();
        setProfile(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Error al cargar perfil');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        <Header />
        <main className="max-w-4xl mx-auto p-6">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        <Header />
        <main className="max-w-4xl mx-auto p-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error || 'No se pudo cargar el perfil'}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
          <span className="material-icons text-3xl">account_circle</span>
          Mi Perfil
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b">
              <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold">
                {profile.nombre?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profile.nombre}</h2>
                <p className="text-gray-500">{profile.email}</p>
                <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                  {profile.rol?.nombre || 'Usuario'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase">Nombre Completo</label>
              <input className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" 
                defaultValue={profile.nombre} readOnly />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase">Email</label>
              <input className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" 
                defaultValue={profile.email} readOnly />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase">RUT</label>
              <input className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" 
                defaultValue={profile.rut || 'N/A'} readOnly />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase">Teléfono</label>
              <input className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg" 
                defaultValue={profile.telefono || 'N/A'} readOnly />
            </div>
            {profile.empresa && (
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-gray-600 uppercase">Empresa</label>
              <input className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" 
                defaultValue={profile.empresa.nombre_comercial} readOnly />
            </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t flex justify-between items-center">
            <button 
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-800 font-bold flex items-center gap-2"
            >
              <span className="material-icons">arrow_back</span>
              Volver
            </button>
            <button className="bg-secondary text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition flex items-center gap-2">
              <span className="material-icons">edit</span>
              Editar Perfil
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}