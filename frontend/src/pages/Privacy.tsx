import { privacyMockData } from '../mocks/data';
import { useNavigate } from 'react-router-dom';

export function Privacy() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="bg-surface font-sans text-gray-800 min-h-screen">
      {/* Navigation */}
      <nav className="bg-primary text-white shadow-lg w-full sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="flex-shrink-0 text-white flex items-center gap-2 font-bold text-xl">
                EL LOA
              </a>
            </div>
          </div>
        </div>
      </nav>

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

export default Privacy;
