import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { ComplaintType } from './create-complaint.dto';

export class UpdateComplaintDto {
  @ApiProperty({ example: 'Juan Pérez García', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'juan.perez@email.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '+56 9 8765 4321', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ enum: ComplaintType, example: ComplaintType.SERVICE, required: false })
  @IsEnum(ComplaintType)
  @IsOptional()
  type?: ComplaintType;

  @ApiProperty({ example: 'Retraso en el servicio contratado', required: false })
  @IsString()
  @IsOptional()
  subject?: string;

  @ApiProperty({ example: 'El viaje programado para las 10:00 AM se retrasó 45 minutos sin previo aviso...', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'VJ-2601', required: false })
  @IsString()
  @IsOptional()
  tripReference?: string;
}