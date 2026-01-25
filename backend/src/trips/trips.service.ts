import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripStatus } from './dto/create-trip.dto';

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

  async create(createTripDto: CreateTripDto) {
    // Construir objeto de datos con campos opcionales
    const tripData: any = {
      status: (createTripDto.status || TripStatus.PENDIENTE) as any,
    };

    // Agregar campos opcionales solo si están definidos
    if (createTripDto.title) tripData.title = createTripDto.title;
    if (createTripDto.scheduledDate) tripData.scheduledDate = new Date(createTripDto.scheduledDate);
    if (createTripDto.origin) tripData.origin = createTripDto.origin;
    if (createTripDto.destination) tripData.destination = createTripDto.destination;
    if (createTripDto.fare) tripData.fare = createTripDto.fare;
    if (createTripDto.clientId) tripData.clientId = createTripDto.clientId;
    if (createTripDto.driverId) tripData.driverId = createTripDto.driverId;
    if (createTripDto.vehicleId) tripData.vehicleId = createTripDto.vehicleId;
    if (createTripDto.serviceRequestId) tripData.serviceRequestId = createTripDto.serviceRequestId;

    // Crear el trip y actualizar el ServiceRequest si existe
    const trip = await this.prisma.trip.create({
      data: tripData,
      include: {
        client: true,
        driver: true,
        vehicle: true,
        serviceRequest: true,
      },
    });

    // Si se asoció a un ServiceRequest, actualizar su estado a ASIGNADO
    if (createTripDto.serviceRequestId) {
      await this.prisma.serviceRequest.update({
        where: { id: createTripDto.serviceRequestId },
        data: { status: 'ASIGNADO' as any },
      });
    }

    return trip;
  }

  async findAll(user: any, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    // Obtener rol del usuario
    const userRole = user.role?.nombre || user.role;

    // Construir filtro según rol
    let whereClause: any = {};

    if (userRole === 'CHOFER') {
      // Chofer: solo sus viajes asignados
      whereClause = { driverId: user.id };
    } else if (userRole === 'CLIENTE') {
      // Cliente: solo viajes de su empresa
      if (!user.companyId) {
        return {
          trips: [],
          pagination: {
            currentPage: page,
            totalPages: 0,
            totalResults: 0,
          },
        };
      }
      whereClause = { clientId: user.companyId };
    }
    // Si es ADMIN, whereClause queda {} = todos los viajes

    const [trips, total] = await Promise.all([
      this.prisma.trip.findMany({
        where: whereClause,
        skip,
        take: limit,
        include: {
          client: true,
          driver: true,
          vehicle: true,
        },
        orderBy: { scheduledDate: 'desc' },
      }),
      this.prisma.trip.count({ where: whereClause }),
    ]);

    return {
      trips,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalResults: total,
      },
    };
  }

  async findOne(id: string, user: any) {
    const trip = await this.prisma.trip.findUnique({
      where: { id },
      include: {
        client: true,
        driver: true,
        vehicle: true,
      },
    });

    if (!trip) {
      throw new NotFoundException(`Viaje #${id} no encontrado`);
    }

    // Validar acceso según rol
    const userRole = user.role?.nombre || user.role;

    if (userRole === 'CHOFER' && trip.driverId !== user.id) {
      throw new ForbiddenException('No tienes acceso a este viaje');
    }

    if (userRole === 'CLIENTE' && trip.clientId !== user.companyId) {
      throw new ForbiddenException('No tienes acceso a este viaje');
    }

    return trip;
  }

  async updateStatus(id: string, status: TripStatus, user: any) {
    // Primero validar que el usuario tenga acceso al viaje
    await this.findOne(id, user);

    return this.prisma.trip.update({
      where: { id },
      data: { status: status as any },
    });
  }

  async startTrip(id: string, user: any) {
    // Validar que el usuario sea el chofer asignado
    const trip = await this.prisma.trip.findUnique({
      where: { id },
    });

    if (!trip) {
      throw new NotFoundException(`Viaje no encontrado`);
    }

    const userRole = user.role?.nombre || user.role;

    if (userRole === 'CHOFER' && trip.driverId !== user.id) {
      throw new ForbiddenException('Solo el chofer asignado puede iniciar este viaje');
    }

    return this.prisma.trip.update({
      where: { id },
      data: {
        status: 'EN_RUTA' as any,
        startTime: new Date(),
      },
      include: {
        client: true,
        driver: true,
      },
    });
  }

  async finishTrip(id: string, user: any, data?: any) {
    // Validar que el usuario sea el chofer asignado
    const trip = await this.prisma.trip.findUnique({
      where: { id },
    });

    if (!trip) {
      throw new NotFoundException(`Viaje no encontrado`);
    }

    const userRole = user.role?.nombre || user.role;

    if (userRole === 'CHOFER' && trip.driverId !== user.id) {
      throw new ForbiddenException('Solo el chofer asignado puede finalizar este viaje');
    }

    return this.prisma.trip.update({
      where: { id },
      data: {
        status: 'FINALIZADO' as any,
        endTime: new Date(),
        fare: data?.finalFare || undefined,
      },
      include: {
        client: true,
        driver: true,
      },
    });
  }

  async uploadEvidence(id: string, body: any) {
    // El campo evidenceUrl no existe en el schema actual
    // Por ahora retornamos un mensaje de éxito
    return {
      message: 'Evidencia recibida',
      tripId: id,
      data: body,
    };
  }

  // Método para recalcular fares de todos los trips según nueva fórmula
  async recalculateAllFares() {
    const trips = await this.prisma.trip.findMany({
      select: {
        id: true,
        origin: true,
        destination: true,
      },
    });

    let updatedCount = 0;
    const baseRate = 1800; // $1,800 por km
    const airportSurcharge = 5000; // $5,000 si va al aeropuerto
    const minimumFare = 30000; // Mínimo $30,000

    for (const trip of trips) {
      let distance = 20; // Default si no podemos calcular

      // Intentar calcular distancia real usando geocoding
      if (trip.origin && trip.destination) {
        try {
          const originCoords = await this.geocodeAddress(trip.origin);
          const destCoords = await this.geocodeAddress(trip.destination);
          
          if (originCoords && destCoords) {
            distance = this.calculateDistance(
              originCoords.lat, originCoords.lng,
              destCoords.lat, destCoords.lng
            );
          }
        } catch (error) {
          console.log(`No se pudo calcular distancia para trip ${trip.id}, usando default`);
        }
      }

      // Detectar si va al aeropuerto
      const isAirport = 
        trip.origin?.toLowerCase().includes('aeropuerto') ||
        trip.destination?.toLowerCase().includes('aeropuerto');

      // Calcular fare
      const baseCost = distance * baseRate;
      const surcharge = isAirport ? airportSurcharge : 0;
      const calculatedFare = Math.max(baseCost + surcharge, minimumFare);

      // Actualizar el trip con distancia y fare
      await this.prisma.trip.update({
        where: { id: trip.id },
        data: { 
          distance: Math.round(distance * 100) / 100, // 2 decimales
          fare: calculatedFare 
        },
      });

      updatedCount++;
    }

    return {
      message: 'Fares y distancias recalculados exitosamente',
      updatedTrips: updatedCount,
      formula: `(distancia × $${baseRate}) + ($${airportSurcharge} si aeropuerto) con mínimo de $${minimumFare}`,
    };
  }

  // Geocodificar dirección usando Nominatim
  private async geocodeAddress(address: string): Promise<{lat: number, lng: number} | null> {
    try {
      const fetch = (await import('node-fetch')).default;
      const searchStrategies = [
        `${address}, Chile`,
        address,
        `${address} Chile`
      ];

      for (const searchAddress of searchStrategies) {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}&countrycodes=cl&limit=1`;
        const response = await fetch(url, {
          headers: { 'User-Agent': 'ServiciosElLoa/1.0' }
        });
        
        const data: any = await response.json();
        
        if (data && data.length > 0) {
          return {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon)
          };
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error geocoding:', error);
      return null;
    }
  }

  // Calcular distancia en km usando fórmula de Haversine
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
