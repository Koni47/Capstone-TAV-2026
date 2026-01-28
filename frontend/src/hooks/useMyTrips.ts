import { useState, useEffect, useCallback } from 'react';
import { tripService } from '../services/trip.service';
import { Trip } from '../types/trip.types';

export const useMyTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tripService.getMyTrips();
      setTrips(data);
    } catch (err) {
      setError('Error al cargar tus viajes.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const updateTripStatus = async (id: string, action: 'start' | 'finish') => {
    try {
      if (action === 'start') await tripService.startTrip(id);
      if (action === 'finish') await tripService.finishTrip(id);
      fetchTrips(); // Refresh list after update
    } catch (err) {
      console.error('Error updating trip status', err);
      // Optional: handle UI feedback for error
    }
  };

  return { trips, loading, error, refresh: fetchTrips, updateTripStatus };
};
