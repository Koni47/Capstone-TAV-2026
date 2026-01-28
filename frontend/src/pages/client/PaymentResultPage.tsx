import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { paymentService } from '../../services/payment.service';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Copy, CheckCircle, XCircle, AlertCircle, Calendar, CreditCard, DollarSign } from 'lucide-react';
import { CommitWebpayResponse } from '../../types/payment.types';

const PaymentResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'aborted'>('loading');
  const [transactionData, setTransactionData] = useState<CommitWebpayResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const token = searchParams.get('token_ws'); // Éxito o Fallo normal
    const abortedToken = searchParams.get('TBK_TOKEN'); // Abortado por usuario
    
    // Caso: Usuario abortó la transacción en el formulario de Webpay
    if (abortedToken) {
      setStatus('aborted');
      setErrorMessage('La transacción fue anulada por el usuario.');
      return;
    }

    // Caso: Flujo de retorno normal (puede ser aprobado o rechazado según respuesta del commit)
    if (token) {
      const confirmPayment = async () => {
        try {
          const data = await paymentService.commitTransaction(token);
          
          if (data.status === 'AUTHORIZED') { // O el estado que devuelva tu backend para éxito
            setTransactionData(data);
            setStatus('success');
          } else {
            setStatus('error');
            setErrorMessage(`El pago fue rechazado. Estado: ${data.status}`);
          }
        } catch (error) {
          console.error('Error al confirmar pago:', error);
          setStatus('error');
          setErrorMessage('Hubo un error al verificar la transacción con el banco.');
        }
      };

      confirmPayment();
    } else {
      // Si llegamos aquí sin tokens, algo anda mal
      setStatus('error');
      setErrorMessage('No se recibió información válida de la transacción.');
    }
  }, [searchParams]);

  const handleBackToTrips = () => {
    navigate('/client/trips'); // Ajusta según tus rutas
  };

  const handleRetry = () => {
    navigate(-1); // Volver atrás o redirigir a donde se inició el pago
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-900 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Verificando pago con el banco...</h2>
          <p className="text-gray-500">Por favor no cierres esta ventana.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Card className="max-w-md w-full bg-white shadow-xl overflow-hidden border-0">
        
        {/* ENCABEZADO */}
        <div className={`p-6 text-center ${
          status === 'success' ? 'bg-green-50' : 
          status === 'error' || status === 'aborted' ? 'bg-red-50' : 'bg-gray-50'
        }`}>
          {status === 'success' && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-green-700">¡Pago Exitoso!</h2>
              <p className="text-green-600">Tu viaje ha sido reservado correctamente.</p>
            </>
          )}
          {(status === 'error' || status === 'aborted') && (
            <>
              {status === 'aborted' ? 
                <AlertCircle className="h-16 w-16 text-orange-500 mx-auto mb-2" /> : 
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-2" />
              }
              <h2 className="text-2xl font-bold text-red-700">
                {status === 'aborted' ? 'Pago Anulado' : 'Pago Fallido'}
              </h2>
              <p className="text-red-600">{errorMessage}</p>
            </>
          )}
        </div>

        {/* DETALLES DEL VOUCHER (SOLO ÉXITO) */}
        {status === 'success' && transactionData && transactionData.details && (
          <div className="p-6 space-y-4">
            <div className="border-b pb-4">
              <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-2">Detalles de la Transacción</p>
              
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600 flex items-center gap-2"><DollarSign size={16}/> Monto:</span>
                <span className="font-bold text-lg text-gray-900">
                  ${transactionData.details.amount?.toLocaleString('es-CL')}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600 flex items-center gap-2"><Copy size={16}/> Orden de Compra:</span>
                <span className="font-mono text-gray-800">
                  {transactionData.details.buy_order}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600 flex items-center gap-2"><CreditCard size={16}/> Tarjeta:</span>
                <span className="text-gray-800">
                  **** **** **** {transactionData.details.card_detail?.card_number}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600 flex items-center gap-2"><Calendar size={16}/> Fecha:</span>
                <span className="text-gray-800">
                  {(() => {
                    const dateStr = transactionData.details.transaction_date;
                    if (!dateStr) return 'Fecha no disponible';
                    const date = new Date(dateStr);
                    return isNaN(date.getTime()) ? dateStr : `${date.toLocaleDateString('es-CL')} ${date.toLocaleTimeString('es-CL')}`;
                  })()}
                </span>
              </div>

               <div className="flex justify-between items-center py-1">
                <span className="text-gray-600 text-sm">Cód. Autorización:</span>
                <span className="text-gray-800 text-sm font-mono">
                  {transactionData.details.authorization_code}
                </span>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800">
              Te hemos enviado un comprobante a tu correo electrónico.
            </div>
            
            {/* DEBUG INFO: Comenta esto cuando ya funcione bien */}
            {/* <pre className="text-xs bg-gray-100 p-2 overflow-auto max-h-40">{JSON.stringify(transactionData, null, 2)}</pre> */}
          </div>
        )}

        {/* ACCIONES */}
        <div className="p-6 flex flex-col gap-3">
          {status === 'success' ? (
            <Button onClick={handleBackToTrips} className="w-full bg-blue-900 hover:bg-blue-800">
              Ir a Mis Viajes
            </Button>
          ) : (
            <>
              <Button onClick={handleRetry} className="w-full bg-blue-900 hover:bg-blue-800">
                Intentar Nuevamente
              </Button>
              <Button 
                onClick={handleBackToTrips} 
                variant="outline"
                className="w-full"
              >
                Volver al inicio
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PaymentResultPage;
