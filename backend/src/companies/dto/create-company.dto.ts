import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional, IsDateString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Minera ABC' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '12.345.678-9' })
  @IsString()
  @IsNotEmpty()
  rut: string;

  @ApiProperty({ example: 'Av. Granaderos 2550, Calama' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty()
  contactName: string;

  @ApiProperty({ example: 'juan@mineraabc.cl' })
  @IsEmail()
  @IsNotEmpty()
  contactEmail: string;

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
}
