import { useState, useEffect } from 'react';
import api from '../lib/axios';
import { VehicleStats } from '../types/vehicle.types';

interface DashboardStats {
  activeTrips: number;
  completedTrips: number;
  revenue: number;
  vehicleStats: VehicleStats;
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<DashboardStats>('/api/v1/reports/dashboard');
        setStats(response.data);
      } catch (err) {
        setError('Error al cargar estadísticas del dashboard.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
