import { useState } from 'react';
import { recoverPasswordMockData } from '../mocks/data';
import { useNavigate } from 'react-router-dom';

export function RecoverPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Correo para recuperación:', email);
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-50 font-sans flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold text-primary mb-2">{recoverPasswordMockData.title}</h1>
        <p className="text-sm text-gray-500 mb-6">{recoverPasswordMockData.description}</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={recoverPasswordMockData.placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-secondary outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-secondary hover:bg-orange-700 text-white font-bold py-2 rounded shadow transition"
          >
            {recoverPasswordMockData.buttonText}
          </button>
        </form>

        <div className="mt-6 text-sm">
          <button
            onClick={handleHome}
            className="text-primary hover:underline font-bold"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecoverPassword;
