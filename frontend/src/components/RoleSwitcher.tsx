import React, { useState, useEffect } from 'react';

const RoleSwitcher: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<string>('');

  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'cliente';
    setCurrentRole(role);
  }, []);

  const changeRole = (newRole: string) => {
    localStorage.setItem('userRole', newRole);
    setCurrentRole(newRole);
    window.location.reload(); // Recargar para aplicar cambios
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-50">
      <h3 className="text-sm font-bold mb-2">Cambiar Rol (Testing)</h3>
      <p className="text-xs text-gray-600 mb-2">Rol actual: <strong>{currentRole}</strong></p>
      <div className="flex gap-2">
        <button
          onClick={() => changeRole('admin')}
          className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
        >
          Admin
        </button>
        <button
          onClick={() => changeRole('chofer')}
          className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
        >
          Chofer
        </button>
        <button
          onClick={() => changeRole('cliente')}
          className="px-3 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600"
        >
          Cliente
        </button>
      </div>
    </div>
  );
};

export default RoleSwitcher;