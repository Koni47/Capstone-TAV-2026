export type TripStatus = 'PENDIENTE' | 'ASIGNADO' | 'EN_RUTA' | 'FINALIZADO' | 'CANCELADO'

export interface Trip {
  id: string
  status: TripStatus
  startTime?: string | null
  endTime?: string | null
  rating?: number | null
  comment?: string | null
  createdAt: string
  updatedAt: string
  serviceRequestId: string
  driverId?: string | null
  vehicleId?: string | null
  evidenceUrl?: string | null
  fare?: number | null
}

export type CreateTripDto = Partial<Trip>
