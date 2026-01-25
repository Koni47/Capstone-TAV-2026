import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateServiceRequestDto {
  @ApiProperty({ example: '2026-01-22T10:00:00Z', required: false })
  @IsDateString()
  @IsOptional()
  requestedDate?: string;

  @ApiProperty({ example: 'Aeropuerto Calama' })
  @IsString()
  @IsNotEmpty()
  origin: string;

  @ApiProperty({ example: 'Centro Calama' })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty({ example: 2, required: false })
  @IsNumber()
  @IsOptional()
  passengers?: number;

  @ApiProperty({ example: 35000, required: false })
  @IsNumber()
  @IsOptional()
  estimatedFare?: number;

  @ApiProperty({ example: 25.5, required: false, description: 'Distancia en kilómetros' })
  @IsNumber()
  @IsOptional()
  distance?: number;

  @ApiProperty({ example: 'Necesito asientos con cinturón', required: false })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ example: 'uuid-company-id', required: false })
  @IsString()
  @IsOptional()
  companyId?: string;

  @ApiProperty({ example: 'Minera Escondida Ltda', required: false })
  @IsString()
  @IsOptional()
  companyName?: string;
}
