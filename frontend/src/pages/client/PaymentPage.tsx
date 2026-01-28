import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreditCard, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

/**
 * PaymentPage - Simulates the payment process (e.g. WebPay, PayPal)
 */
const PaymentPage = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod) return;

    setLoading(true);

    // Simulate Payment Processing
    setTimeout(() => {
      setLoading(false);
      // Redirigir a la página de retorno (simulando que venimos de Webpay con un token)
      navigate('/client/payment/commit?token_ws=TEST_TOKEN_12345&status=AUTHORIZED');
    }, 2000);
  };
/*
  if (paymentSuccess) {
      return ( ... ) // Removemos este bloque interno porque ahora redirigimos
  } 
*/
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/client/request" className="inline-flex items-center text-gray-500 hover:text-primary mb-6 transition">
           <ArrowLeft size={16} className="mr-1" /> Volver a Solicitud
        </Link>
        
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <CreditCard className="text-secondary" />
            Pago del servicio
          </h1>

          <form onSubmit={handlePayment} className="space-y-6">
            
            {/* Payment Methods */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">Selecciona un método de pago:</label>
              <div className="grid grid-cols-1 gap-3">
                
                {/* WebPay */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('webpay')}
                  className={`flex items-center gap-4 border rounded-lg px-4 py-3 transition text-left group
                    ${selectedMethod === 'webpay' ? 'border-primary ring-2 ring-primary bg-blue-50' : 'border-gray-300 hover:border-primary hover:bg-gray-50'}
                  `}
                >
                  <div className="w-12 h-8 bg-white border border-gray-200 rounded flex items-center justify-center overflow-hidden">
                     {/* Placeholder Logo */}
                     <div className="w-full h-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/8/8a/Webpay_logo.png')" }}></div>
                  </div>
                  <span className="font-medium text-gray-800">WebPay Plus</span>
                </button>

                {/* PayPal */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('paypal')}
                  className={`flex items-center gap-4 border rounded-lg px-4 py-3 transition text-left group
                    ${selectedMethod === 'paypal' ? 'border-primary ring-2 ring-primary bg-blue-50' : 'border-gray-300 hover:border-primary hover:bg-gray-50'}
                  `}
                >
                   <div className="w-12 h-8 bg-white border border-gray-200 rounded flex items-center justify-center">
                     <span className="font-bold text-blue-800 italic">PayPal</span>
                  </div>
                  <span className="font-medium text-gray-800">PayPal</span>
                </button>
  
              </div>
              {!selectedMethod && (
                  <p className="text-xs text-gray-400 mt-2">Seleccione una opción para continuar</p>
              )}
            </div>

            {/* Summary */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Resumen de Pago</h3>
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Servicio de Transporte</span>
                    <span className="font-medium">$45,000</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-600">IVA (19%)</span>
                    <span className="font-medium">$8,550</span>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total a Pagar</span>
                    <span className="text-xl font-bold text-secondary">$53,550</span>
                </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!selectedMethod || loading}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${!selectedMethod || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-blue-800'}
                transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
            >
              {loading ? (
                  <>
                     <Loader2 className="animate-spin" size={18} /> Procesando...
                  </>
              ) : (
                  <>Pagar Ahora</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
