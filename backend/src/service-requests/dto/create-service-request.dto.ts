import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateServiceRequestDto {
  @ApiProperty({ example: '2026-01-22T10:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  requestedDate: string;

  @ApiProperty({ example: 'Aeropuerto Calama' })
  @IsString()
  @IsNotEmpty()
  origin: string;

  @ApiProperty({ example: 'Centro Calama' })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsNotEmpty()
  passengers: number;

  @ApiProperty({ example: 35000, required: false })
  @IsNumber()
  @IsOptional()
  estimatedFare?: number;

  @ApiProperty({ example: 'Necesito asientos con cinturón', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
