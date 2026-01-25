import React, { useState } from 'react';
import Header from '../components/Header';
import { site, getHtmlMock } from '../services/mockApi';
import HtmlMockRenderer from '../components/HtmlMockRenderer'
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();
  const mock = getHtmlMock('contacto.html')
  if (mock) return <HtmlMockRenderer html={mock} navigate={navigate} />
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // TODO: Implement actual submission logic
  };

  return (
    <div className="bg-surface font-sans text-gray-800 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Contacto</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Información de Contacto</h2>
                <div className="space-y-4">
                    <p className="flex items-start gap-3">
                        <span className="material-icons text-primary">location_on</span>
                        <span className="text-gray-600 whitespace-pre-line">Av. Apoquindo 4800, Las Condes, Santiago</span>
                    </p>
                    <p className="flex items-center gap-3">
                        <span className="material-icons text-primary">phone</span>
                        <a href="tel:+56223456789" className="text-gray-600 hover:text-primary transition">+56 2 2345 6789</a>
                    </p>
                    <p className="flex items-center gap-3">
                        <span className="material-icons text-primary">email</span>
                        <a href="mailto:contacto@serviciosloa.cl" className="text-gray-600 hover:text-primary transition">contacto@serviciosloa.cl</a>
                    </p>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input 
                type="text" 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mensaje</label>
              <textarea 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700">Enviar</button>
          </form>
        </div>
        </div>
      </main>
    </div>
  );
}
