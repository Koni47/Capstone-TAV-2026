import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDateString, IsOptional, IsIn } from 'class-validator';

export class UpdateServiceRequestDto {
  @ApiProperty({ example: '2026-01-22T10:00:00Z', required: false })
  @IsDateString()
  @IsOptional()
  requestedDate?: string;

  @ApiProperty({ example: 'Aeropuerto Calama', required: false })
  @IsString()
  @IsOptional()
  origin?: string;

  @ApiProperty({ example: 'Centro Calama', required: false })
  @IsString()
  @IsOptional()
  destination?: string;

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

  @ApiProperty({ 
    example: 'PENDIENTE', 
    required: false,
    enum: ['PENDIENTE', 'AGENDADO', 'EN_RUTA', 'COMPLETADO', 'CANCELADO']
  })
  @IsIn(['PENDIENTE', 'AGENDADO', 'EN_RUTA', 'COMPLETADO', 'CANCELADO'])
  @IsOptional()
  status?: string;
}