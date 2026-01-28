import api from '../lib/axios';
import { CommitWebpayResponse, InitWebpayResponse, WebpayStatusResponse } from '../types/payment.types';

export const paymentService = {
  /**
   * Inicia una transacción de pago Webpay Plus
   * @param tripId ID del viaje a pagar
   */
  initTransaction: async (tripId: string): Promise<InitWebpayResponse> => {
    const response = await api.post<InitWebpayResponse>('/payments/webpay/init', { tripId });
    return response.data;
  },

  /**
   * Confirma la transacción con Transbank usando el token recibido
   * @param token_ws Token retornado por Transbank (o TBK_TOKEN si fue abortado por usuario)
   */
  commitTransaction: async (token_ws: string): Promise<CommitWebpayResponse> => {
    const response = await api.post<CommitWebpayResponse>('/payments/webpay/commit', { token_ws });
    return response.data;
  },

  /**
   * Obtiene el estado actual de una transacción
   * @param token Token de la transacción
   */
  getTransactionStatus: async (token: string): Promise<WebpayStatusResponse> => {
    const response = await api.get<WebpayStatusResponse>(`/payments/webpay/status/${token}`);
    return response.data;
  },
};
