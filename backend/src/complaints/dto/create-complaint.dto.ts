import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export enum ComplaintType {
  SERVICE = 'Servicio',
  DRIVER = 'Conductor',
  VEHICLE = 'Vehículo',
  BILLING = 'Facturación',
  OTHER = 'Otro',
}

export class CreateComplaintDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'juan.perez@email.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+56 9 8765 4321', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ enum: ComplaintType, example: ComplaintType.SERVICE })
  @IsEnum(ComplaintType)
  @IsNotEmpty()
  type: ComplaintType;

  @ApiProperty({ example: 'Retraso en el servicio contratado' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: 'El viaje programado para las 10:00 AM se retrasó 45 minutos sin previo aviso...' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'VJ-2601', required: false })
  @IsString()
  @IsOptional()
  tripReference?: string;
}
