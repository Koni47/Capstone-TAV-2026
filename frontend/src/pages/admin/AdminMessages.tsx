import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Search, Trash2, Star, Mail, Phone, Filter, Eye } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const AdminMessages = () => {
  // Mock Data
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'Carlos Fuentes',
      email: 'carlos.f@gmail.com',
      phone: '+56 9 1234 5678',
      reason: 'reclamo',
      comment: 'El chofer llegó 15 minutos tarde al punto de recogida.',
      rating: 2,
      date: new Date(2026, 0, 26, 14, 30),
      status: 'PENDING',
    },
    {
      id: 2,
      name: 'Ana Morales',
      email: 'ana.morales@empresa.cl',
      phone: '+56 9 8765 4321',
      reason: 'felicitacion',
      comment: 'Excelente servicio, el vehículo estaba impecable y el conductor muy amable.',
      rating: 5,
      date: new Date(2026, 0, 25, 9, 15),
      status: 'READ',
    },
    {
      id: 3,
      name: 'Pedro Soto',
      email: 'pedro.soto@hotmail.com',
      phone: '+56 9 5555 1111',
      reason: 'comentario',
      comment: '¿Tienen convenios para transporte mensual de personal?',
      rating: 0,
      date: new Date(2026, 0, 24, 18, 45),
      status: 'READ',
    },
  ]);

  const handleDelete = (id: number) => {
    if (confirm('¿Está seguro de eliminar este mensaje?')) {
      setMessages(messages.filter((m) => m.id !== id));
    }
  };

  const getReasonBadge = (reason: string) => {
    switch (reason) {
      case 'reclamo':
        return (
          <Badge variant="error" className="uppercase">
            Reclamo
          </Badge>
        );
      case 'felicitacion':
        return (
          <Badge variant="success" className="uppercase">
            Felicitación
          </Badge>
        );
      case 'comentario':
        return (
          <Badge variant="info" className="uppercase">
            Consulta
          </Badge>
        );
      default:
        return (
          <Badge variant="default" className="uppercase">
            {reason}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex text-sm text-gray-500 mb-1">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/admin/dashboard" className="hover:text-primary transition">
                  Inicio
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li className="text-secondary font-medium">Buzón de Mensajes</li>
            </ol>
          </nav>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="text-primary bg-blue-100 p-1 rounded-lg" size={32} />
            Mensajes Recibidos
          </h2>
          <p className="text-gray-500 mt-1">Gestión de contactos desde el formulario web.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 shadow-sm transition">
            <Filter size={18} /> Filtrar
          </button>
        </div>
      </div>

      {/* Stats Cards Row (Optional) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Sin Leer</p>
            <p className="text-2xl font-bold text-primary">
              {messages.filter((m) => m.status === 'PENDING').length}
            </p>
          </div>
          <div className="p-2 bg-blue-50 rounded-lg text-primary">
            <Mail size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Reclamos</p>
            <p className="text-2xl font-bold text-red-600">
              {messages.filter((m) => m.reason === 'reclamo').length}
            </p>
          </div>
          <div className="p-2 bg-red-50 rounded-lg text-red-600">
            <Star size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Total</p>
            <p className="text-2xl font-bold text-gray-700">{messages.length}</p>
          </div>
          <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
            <MessageSquare size={24} />
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por nombre, email..."
              className="pl-10 w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Remitente
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Motivo
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Mensaje
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No hay mensajes recibidos.
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className={`hover:bg-gray-50 transition cursor-pointer ${msg.status === 'PENDING' ? 'bg-blue-50/30' : ''}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">
                          {format(msg.date, 'dd MMM', { locale: es })}
                        </span>
                        <span className="text-xs">{format(msg.date, 'HH:mm')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{msg.name}</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Mail size={10} /> {msg.email}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Phone size={10} /> {msg.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getReasonBadge(msg.reason)}</td>
                    <td className="px-6 py-4">
                      <p
                        className="text-sm text-gray-600 line-clamp-2 max-w-xs"
                        title={msg.comment}
                      >
                        {msg.comment}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {msg.rating > 0 && (
                        <div className="flex items-center justify-center gap-1 text-[#FF6600]">
                          <span className="font-bold text-sm">{msg.rating}</span>{' '}
                          <Star size={14} className="fill-[#FF6600]" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-1.5 hover:bg-blue-100 text-blue-600 rounded-md transition"
                          title="Ver detalle"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="p-1.5 hover:bg-red-100 text-red-600 rounded-md transition"
                          title="Eliminar"
                          onClick={() => handleDelete(msg.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
