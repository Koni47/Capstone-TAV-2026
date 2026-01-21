import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Página no encontrada</p>
      <Link to="/" className="mt-8 bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
        Volver al Inicio
      </Link>
    </div>
  );
}
