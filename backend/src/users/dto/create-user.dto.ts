import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'ADMIN',
  CHOFER = 'CHOFER',
  CLIENTE = 'CLIENTE',
}

export class CreateUserDto {
  @ApiProperty({ example: 'juan@elloa.cl' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Secret123!', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Juan Perez' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ enum: UserRole, default: UserRole.CLIENTE })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ example: '+56912345678', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'uuid-company', required: false })
  @IsString()
  @IsOptional()
  companyId?: string;
}
