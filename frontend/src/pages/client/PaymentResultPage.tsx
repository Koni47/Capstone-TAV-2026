import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Download, ArrowRight, Loader2 } from 'lucide-react';

/**
 * PaymentResultPage
 * Esta página es donde Webpay (o la pasarela) redirige al usuario después del pago.
 * En un escenario real, aquí se captura el `token_ws` de la URL y se valida con el backend.
 */
const PaymentResultPage = () => {
  useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'failure'>('loading');

  // Simulamos la validación del token con el backend
  useEffect(() => {
    // En producción: const token = searchParams.get("token_ws");
    // await api.put('/transactions/commit', { token });

    const timer = setTimeout(() => {
      // Simulamos éxito por defecto. Cambiar lógica según necesidades.
      setStatus('success');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <h2 className="text-xl font-semibold text-gray-700">
          Validando transacción con el banco...
        </h2>
        <p className="text-gray-500">Por favor no cierres esta ventana.</p>
      </div>
    );
  }

  if (status === 'failure') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center border-t-4 border-red-500">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pago Rechazado</h2>
          <p className="text-gray-600 mb-6">
            La transacción ha sido anulada o rechazada por la institución financiera.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate('/client/payment')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Intentar de nuevo
            </button>
            <Link
              to="/client/dashboard"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Exitoso */}
        <div className="bg-green-600 p-8 text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">¡Pago Exitoso!</h1>
          <p className="opacity-90">Tu servicio ha sido programado correctamente.</p>
        </div>

        {/* Detalles del Comprobante */}
        <div className="p-8 space-y-6">
          <div className="border-b border-gray-100 pb-6">
            <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
              <span>Código de Orden</span>
              <span className="font-mono text-gray-900">#ORD-2026-8842</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
              <span>Fecha</span>
              <span className="text-gray-900">27 Ene 2026, 14:30</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Método de Pago</span>
              <span className="flex items-center gap-2 text-gray-900 font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-900"></span> WebPay Plus
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Detalle del Servicio
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-800">Traslado Ejecutivo</span>
                <span className="font-bold text-gray-900">$45.000</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Origen</span>
                <span>Aeropuerto CJC</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Destino</span>
                <span>Hotel Diego de Almagro</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-lg text-gray-900">Total Pagado</span>
              <span className="font-bold text-2xl text-secondary">$53.550</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition">
              <Download size={18} /> Descargar PDF
            </button>
            <Link
              to="/client/history"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-800 transition shadow-md"
            >
              Ver mis Viajes <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentResultPage;
