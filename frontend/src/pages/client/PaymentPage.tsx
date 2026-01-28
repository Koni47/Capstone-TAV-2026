import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';
import { CreditCard, Loader2 } from 'lucide-react';

/**
 * PaymentPage - Simulates the payment process (e.g. WebPay, PayPal)
 */
const PaymentPage = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let hasError = false;
    if (!selectedMethod) {
      setError('Debes seleccionar un método de pago.');
      hasError = true;
    }
    if (!acceptedTerms) {
      // Just for local validation logic, showing error only if method selected to match mockup behavior roughly
      // or just set a general error
      if (!hasError) setError('Debes aceptar los términos para continuar.');
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    // Simulate Payment Processing
    setTimeout(() => {
      setLoading(false);
      // Redirigir a la página de retorno (simulando que venimos de Webpay con un token)
      navigate('/client/payment/commit?token_ws=TEST_TOKEN_12345&status=AUTHORIZED');
    }, 2000);
  };

  return (
    <div className="font-sans flex flex-col min-h-screen bg-gray-50">
      <PublicNavbar />

      <main className="flex-grow max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <span className="material-icons text-secondary">payments</span>
            <CreditCard className="text-secondary" />
            Pago del servicio
          </h1>

          <form onSubmit={handlePayment} className="space-y-6">
            {/* Payment Methods */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Selecciona un método de pago:
              </label>
              <div className="flex flex-col gap-3">
                {/* PayPal */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMethod('paypal');
                    setError(null);
                  }}
                  className={`flex items-center gap-2 border rounded px-4 py-3 transition text-left
                    ${selectedMethod === 'paypal' ? 'border-primary ring-2 ring-primary bg-blue-50' : 'border-gray-300 hover:border-primary'}
                  `}
                >
                  <img
                    src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
                    alt="PayPal"
                    className="w-6 h-6 object-contain"
                  />
                  <span className="font-medium text-gray-700">PayPal</span>
                </button>

                {/* WebPay */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMethod('webpay');
                    setError(null);
                  }}
                  className={`flex items-center gap-2 border rounded px-4 py-3 transition text-left
                    ${selectedMethod === 'webpay' ? 'border-primary ring-2 ring-primary bg-blue-50' : 'border-gray-300 hover:border-primary'}
                  `}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Webpay_logo.png"
                    alt="WebPay"
                    className="w-6 h-6 object-contain"
                  />
                  <span className="font-medium text-gray-700">WebPay</span>
                </button>

                {/* Mercado Pago */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMethod('mercadopago');
                    setError(null);
                  }}
                  className={`flex items-center gap-2 border rounded px-4 py-3 transition text-left
                    ${selectedMethod === 'mercadopago' ? 'border-primary ring-2 ring-primary bg-blue-50' : 'border-gray-300 hover:border-primary'}
                  `}
                >
                  <img
                    src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.4.1/mercadopago/logo__large_plus.png"
                    alt="Mercado Pago"
                    className="w-6 h-6 object-contain"
                  />
                  <span className="font-medium text-gray-700">Mercado Pago</span>
                </button>
              </div>
              {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
            </div>

            {/* Terms and conditions */}
            <div className="flex items-center gap-2">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 border-gray-300 rounded text-secondary focus:ring-secondary cursor-pointer"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <label htmlFor="terms" className="text-xs text-gray-700 select-none cursor-pointer">
                Estoy de acuerdo con los{' '}
                <Link
                  to="/terms"
                  target="_blank"
                  className="text-secondary underline hover:text-primary transition"
                >
                  términos del servicio
                </Link>{' '}
                y acepto la solicitud y forma de pago.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-secondary hover:bg-orange-700 text-white font-bold py-3 px-4 rounded shadow-md transition text-lg flex items-center justify-center gap-2
                ${loading ? 'opacity-75 cursor-not-allowed' : ''}
              `}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Procesando...
                </>
              ) : (
                <>
                  <CreditCard size={20} /> Pagar
                </>
              )}
            </button>
          </form>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
};

export default PaymentPage;
