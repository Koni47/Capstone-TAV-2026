import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDateString, IsOptional, IsEnum } from 'class-validator';

export enum TripStatus {
  PENDIENTE = 'PENDIENTE',
  ASIGNADO = 'ASIGNADO',
  EN_RUTA = 'EN_RUTA',
  FINALIZADO = 'FINALIZADO',
  CANCELADO = 'CANCELADO',
}

export class CreateTripDto {
  @ApiProperty({ example: 'Traslado Turno B', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: '2026-01-22T08:30:00Z', required: false })
  @IsDateString()
  @IsOptional()
  scheduledDate?: string;

  @ApiProperty({ example: 'Aeropuerto Calama', required: false })
  @IsString()
  @IsOptional()
  origin?: string;

  @ApiProperty({ example: 'Faena Minera Gaby', required: false })
  @IsString()
  @IsOptional()
  destination?: string;

  @ApiProperty({ example: 'uuid-string', required: false })
  @IsString()
  @IsOptional()
  clientId?: string;

  @ApiProperty({ example: 'uuid-string', required: false })
  @IsString()
  @IsOptional()
  driverId?: string;

  @ApiProperty({ example: 'uuid-string', required: false })
  @IsString()
  @IsOptional()
  vehicleId?: string;

  @ApiProperty({ example: 'uuid-string', required: false })
  @IsString()
  @IsOptional()
  serviceRequestId?: string;

  @ApiProperty({ example: 85000, required: false })
  @IsNumber()
  @IsOptional()
  fare?: number;

  @ApiProperty({ example: 25.5, required: false, description: 'Distancia en kilómetros' })
  @IsNumber()
  @IsOptional()
  distance?: number;

  @ApiProperty({ example: 'ASIGNADO', required: false })
  @IsOptional()
  status?: string;
}
