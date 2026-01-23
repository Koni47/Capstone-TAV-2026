import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDateString, IsOptional, IsEnum } from 'class-validator';

export enum TripStatus {
  PENDING = 'Pendiente',
  ASSIGNED = 'Asignado',
  IN_ROUTE = 'En ruta',
  COMPLETED = 'Completado',
  CANCELLED = 'Cancelado',
}

export class CreateTripDto {
  @ApiProperty({ example: 'Traslado Turno B' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '2026-01-22T08:30:00Z' })
  @IsDateString()
  @IsNotEmpty()
  scheduledDate: string;

  @ApiProperty({ example: 'Aeropuerto Calama' })
  @IsString()
  @IsNotEmpty()
  origin: string;

  @ApiProperty({ example: 'Faena Minera Gaby' })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  driverId?: number;

  @ApiProperty({ example: 85000 })
  @IsNumber()
  @IsNotEmpty()
  fare: number;

  @ApiProperty({ enum: TripStatus, example: TripStatus.PENDING, required: false })
  @IsEnum(TripStatus)
  @IsOptional()
  status?: TripStatus;
}
