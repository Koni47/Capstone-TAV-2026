import { IsEnum, IsInt, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VehicleStatus } from '@prisma/client';

export class CreateVehicleDto {
  @ApiProperty({ example: 'ABCD-12' })
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @ApiProperty({ example: 'Toyota Hilux' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 2024 })
  @IsInt()
  @Min(2000)
  year: number;

  @ApiProperty({ enum: VehicleStatus, default: VehicleStatus.DISPONIBLE })
  @IsEnum(VehicleStatus)
  status: VehicleStatus;
}

export class UpdateVehicleDto {
    // Definición parcial para updates (opcional)
}
