import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

export enum VehicleStatus {
  DISPONIBLE = 'DISPONIBLE',
  EN_RUTA = 'EN_RUTA',
  MANTENCION = 'MANTENCION',
  FUERA_DE_SERVICIO = 'FUERA_DE_SERVICIO',
}

export class CreateVehicleDto {
  @ApiProperty({ example: 'ABCD-12' })
  @IsString()
  @IsNotEmpty()
  plate: string;

  @ApiProperty({ example: 'Mercedes-Benz' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: 'Sprinter 515 CDI' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 'Van Pasajeros' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 19 })
  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @ApiProperty({ example: 'Blanco', required: false })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({ example: 125000, required: false })
  @IsNumber()
  @IsOptional()
  mileage?: number;

  @ApiProperty({ example: 2020, required: false })
  @IsNumber()
  @IsOptional()
  year?: number;

  @ApiProperty({ example: 'Diésel', required: false })
  @IsString()
  @IsOptional()
  fuel?: string;

  @ApiProperty({ enum: VehicleStatus, example: VehicleStatus.DISPONIBLE, required: false })
  @IsEnum(VehicleStatus)
  @IsOptional()
  status?: VehicleStatus;
}

export class UpdateVehicleDto {
    // Definición parcial para updates (opcional)
}
