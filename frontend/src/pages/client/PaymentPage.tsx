import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';
import WebpayButton from '../../components/payments/WebpayButton';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, Lock, MapPin, Calendar, Car } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { tripService } from '../../services/trip.service';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); // Necesitamos el usuario para crear un viaje de prueba
  
  // Estado local para manejar el viaje si no viene del router
  const [tripState, setTripState] = React.useState<{tripId: string, details: any} | null>( 
    location.state ? { tripId: location.state.tripId, details: location.state.tripDetails } : null
  );

  // Si entramos directo (sin state), intentamos crear un viaje "draft" para que el botón funcione
  // Solo si el usuario está logueado.
  useEffect(() => {
    if (!tripState && user) {
      const createDraftTrip = async () => {
        try {
          const newTrip = await tripService.createTrip({
             origin: 'Test Origin (Auto-generated)',
             destination: 'Test Destination',
             clientId: user.id,
             fare: 15000
          });
          setTripState({
            tripId: newTrip.id,
            details: {
              amount: 15000,
              origin: newTrip.origin,
              destination: newTrip.destination,
              date: new Date().toLocaleDateString(),
              vehicle: 'Demo Vehicle'
            }
          });
        } catch (e) {
          console.error("Error creating draft trip for testing", e);
        }
      };
      createDraftTrip();
    }
  }, [tripState, user]);

  // Si no hay viaje y no estamos logueados, mostramos un estado vacío o loading
  if (!tripState) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <PublicNavbar />
        <div className="text-center py-20">
             <ShieldCheck className="mx-auto h-12 w-12 text-gray-400 mb-4" />
             <h2 className="text-xl font-bold text-gray-700">No hay viaje seleccionado</h2>
             <p className="text-gray-500 mb-6">Para pagar, primero debes cotizar un servicio.</p>
             <Button onClick={() => navigate('/client/request')}>Ir a Cotizar</Button>
        </div>
        <PublicFooter />
      </div>
    );
  }

  const { tripId, details: tripDetails } = tripState;

  return (
    <div className="font-sans flex flex-col min-h-screen bg-gray-50">
      <PublicNavbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Columna Izquierda: Resumen del Viaje */}
          <div className="w-full md:w-1/2 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">Resumen del Servicio</h1>
            
            <Card className="bg-white border-0 shadow-lg">
               <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-blue-600 mt-1" size={20} />
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Origen</p>
                      <p className="text-gray-800 font-medium">{tripDetails.origin}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="text-green-600 mt-1" size={20} />
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Destino</p>
                      <p className="text-gray-800 font-medium">{tripDetails.destination}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                       <Calendar size={16} className="text-gray-400"/>
                       <span className="text-sm text-gray-600">{tripDetails.date}</span>
                    </div>
                     <div className="flex items-center gap-2">
                       <Car size={16} className="text-gray-400"/>
                       <span className="text-sm text-gray-600">{tripDetails.vehicle}</span>
                    </div>
                  </div>
               </div>
            </Card>

            <div className="flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-lg text-sm">
                <ShieldCheck size={18} />
                <span>Pago 100% Seguro y Encriptado</span>
            </div>
          </div>

          {/* Columna Derecha: Pago */}
          <div className="w-full md:w-1/2">
             <h2 className="text-2xl font-bold text-gray-800 mb-4">Realizar Pago</h2>
             
             <Card className="bg-white border-0 shadow-lg p-6">
                <div className="mb-6 pb-6 border-b border-gray-100">
                   <div className="flex justify-between items-end mb-1">
                      <span className="text-gray-600">Total a pagar</span>
                      <span className="text-3xl font-bold text-blue-900">
                        ${tripDetails.amount.toLocaleString('es-CL')}
                      </span>
                   </div>
                   <p className="text-xs text-right text-gray-400">IVA Incluido</p>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-semibold text-gray-700">Seleccione medio de pago</label>
                        
                        <div className="border rounded-lg p-4 flex items-center justify-between border-blue-500 bg-blue-50 ring-1 ring-blue-500">
                            <div className="flex items-center gap-3">
                                {/* Webpay Logo Placeholder */}
                                <div className="font-bold text-gray-800 text-lg flex items-center gap-2">
                                    <span className="text-orange-600">Web</span>pay Plus
                                </div>
                            </div>
                            <div className="h-4 w-4 rounded-full border-4 border-blue-600 bg-white"></div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <WebpayButton tripId={tripId} />
                    </div>

                    <div className="flex justify-center items-center gap-1 text-gray-400 text-xs mt-2">
                        <Lock size={12} />
                        Pagos procesados por Transbank
                    </div>
                </div>
             </Card>
          </div>

        </div>
      </main>
      <PublicFooter />
    </div>
  );
};

export default PaymentPage;
