export type VehicleStatus =
  | 'DISPONIBLE'
  | 'EN_RUTA'
  | 'MANTENCION'
  | 'FUERA_DE_SERVICIO'

export interface Vehicle {
  id: string
  licensePlate: string
  model: string
  year: number
  status: VehicleStatus
  technicalReviewDate?: string | null
  createdAt: string
  updatedAt: string
}

export type CreateVehicleDto = Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>
