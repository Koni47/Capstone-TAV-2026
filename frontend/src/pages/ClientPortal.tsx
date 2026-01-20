import { clientPortalMockData } from '../mocks/data';
import { useNavigate } from 'react-router-dom';

export function ClientPortal() {
  const navigate = useNavigate();

  const handleNewTrip = () => {
    navigate('/service-request');
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-800 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="material-icons text-primary text-2xl">local_shipping</span>
              <span className="font-bold text-lg text-primary">
                EL LOA <span className="text-gray-400 font-normal">| Portal Empresas</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-600">{clientPortalMockData.company.name}</span>
              <div className="h-8 w-8 bg-primary rounded-full text-white flex items-center justify-center text-xs font-bold">
                {clientPortalMockData.company.initials}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-primary">Resumen de Cuenta</h1>
          <button
            onClick={handleNewTrip}
            className="bg-secondary hover:bg-orange-700 text-white font-bold py-2 px-4 rounded shadow flex items-center gap-2 transition"
          >
            <span className="material-icons text-sm">add</span> Solicitar Nuevo Viaje
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-primary">
            <p className="text-sm text-gray-500">Viajes este Mes</p>
            <p className="text-3xl font-bold text-gray-800">{clientPortalMockData.stats.tripsThisMonth}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
            <p className="text-sm text-gray-500">En Ruta Ahora</p>
            <p className="text-3xl font-bold text-gray-800">{clientPortalMockData.stats.tripsInRoute}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-secondary">
            <p className="text-sm text-gray-500">Gasto Acumulado (Est.)</p>
            <p className="text-3xl font-bold text-gray-800">{clientPortalMockData.stats.estimatedSpending}</p>
          </div>
        </div>

        {/* Recent Trips Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 font-bold text-gray-700">
            Historial Reciente
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ruta</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pasajero</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientPortalMockData.recentTrips.map((trip: any) => (
                <tr key={trip.id}>
                  <td className="px-6 py-4 text-sm font-bold text-primary">{trip.id}</td>
                  <td className="px-6 py-4 text-sm">{trip.route}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{trip.date}</td>
                  <td className="px-6 py-4 text-sm">{trip.passenger}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-bold ${
                        trip.statusColor === 'green'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default ClientPortal;
