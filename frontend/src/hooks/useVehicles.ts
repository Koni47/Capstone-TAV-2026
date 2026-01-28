import { useState, useEffect } from "react";
import { vehicleService } from "../services/vehicle.service";
import { Vehicle } from "../types/vehicle.types";

export const useVehicles = (page = 1, limit = 10) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await vehicleService.getAll(page, limit);
        setVehicles(response.data);
        setTotalPages(response.totalPages);
        setTotalCount(response.total);
      } catch (err) {
        setError("Error al cargar vehículos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [page, limit]);

  return { vehicles, loading, error, totalPages, totalCount };
};
