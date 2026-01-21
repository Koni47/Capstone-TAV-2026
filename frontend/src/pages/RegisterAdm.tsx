import React, { useState } from 'react';
import Header from '../components/Header';

export default function RegisterAdm() {
  return (
    <div className="bg-surface font-sans text-gray-800 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Registro Administrador</h1>
        <p>Formulario de registro para administradores.</p>
      </main>
    </div>
  );
}
