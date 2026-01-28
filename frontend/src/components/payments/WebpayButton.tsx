import React, { useRef, useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { paymentService } from '../../services/payment.service';

interface WebpayButtonProps {
  tripId: string;
  className?: string;
}

const WebpayButton: React.FC<WebpayButtonProps> = ({ tripId, className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [paymentData, setPaymentData] = useState<{ token: string; url: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handlePaymentInit = async () => {
    try {
      setIsLoading(true);
      const data = await paymentService.initTransaction(tripId);
      setPaymentData(data);
      setShouldSubmit(true);
    } catch (error) {
      console.error('Error al iniciar pago:', error);
      setIsLoading(false);
      // Aquí podrías agregar una notificación de error (toast)
      alert("No se pudo iniciar el pago. Por favor intente nuevamente.");
    }
  };

  // Efecto para hacer submit automático una vez que tenemos los datos y el form renderizado
  useEffect(() => {
    if (shouldSubmit && paymentData && formRef.current) {
      formRef.current.submit();
    }
  }, [shouldSubmit, paymentData]);

  return (
    <div className={className}>
      <Button 
        onClick={handlePaymentInit} 
        isLoading={isLoading}
        variant="primary"
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3"
      >
        {isLoading ? 'Conectando con Banco...' : 'Pagar con Webpay'}
      </Button>

      {/* Formulario oculto para redirección POST a Transbank */}
      {paymentData && (
        <form 
          ref={formRef} 
          action={paymentData.url} 
          method="POST" 
          style={{ display: 'none' }}
        >
          <input type="hidden" name="token_ws" value={paymentData.token} />
        </form>
      )}
    </div>
  );
};

export default WebpayButton;
