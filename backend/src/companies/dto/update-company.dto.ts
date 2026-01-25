import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsDateString, IsEnum } from 'class-validator';

export enum CompanyStatus {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
  ELIMINADO = 'ELIMINADO',
}

export class UpdateCompanyDto {
  @ApiProperty({ example: 'Minera ABC', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '12.345.678-9', required: false })
  @IsString()
  @IsOptional()
  rut?: string;

  @ApiProperty({ example: 'Av. Granaderos 2550, Calama', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 'Juan Pérez', required: false })
  @IsString()
  @IsOptional()
  contactName?: string;

  @ApiProperty({ example: 'juan@mineraabc.cl', required: false })
  @IsEmail()
  @IsOptional()
  contactEmail?: string;

  @ApiProperty({ example: '+56 9 1234 5678', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'CC-001', required: false })
  @IsString()
  @IsOptional()
  costCenter?: string;

  @ApiProperty({ example: '2026-12-31', required: false })
  @IsDateString()
  @IsOptional()
  contractEnd?: string;

  @ApiProperty({ example: 'ACTIVO', enum: CompanyStatus, required: false })
  @IsEnum(CompanyStatus)
  @IsOptional()
  status?: CompanyStatus;
}
