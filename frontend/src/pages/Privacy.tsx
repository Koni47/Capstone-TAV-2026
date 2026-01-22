import { privacyMockData } from '../services/mockApi';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

export default function Privacy() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="bg-surface font-sans text-gray-800 min-h-screen">
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">{privacyMockData.pageTitle}</h1>

        <div className="bg-white rounded-lg shadow p-6 text-sm text-gray-700">
          <p>{privacyMockData.content}</p>
        </div>

        <div className="mt-6">
          <button
            onClick={handleBack}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-900 focus:outline-none transition"
          >
            Volver
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-slate-600">
          © 2026 Servicios de Transporte El Loa
        </div>
      </footer>
    </div>
  );
}
