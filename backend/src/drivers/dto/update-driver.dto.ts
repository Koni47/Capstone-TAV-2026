import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class UpdateDriverDto {
  @ApiProperty({ example: 'Juan Pérez García', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'juan.perez@mineraabc.cl', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'NewPassword123!', required: false })
  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string;

  @ApiProperty({ example: '+56 9 8765 4321', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  companyId?: number;
}