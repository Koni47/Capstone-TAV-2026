import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsEnum, IsOptional, MinLength } from 'class-validator';
import { UserRole } from '../../auth/dto/user-role.enum';

export class UpdateUserDto {
  @ApiProperty({ example: 'Juan Pérez Actualizado', required: false })
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

  @ApiProperty({ enum: UserRole, example: UserRole.CLIENTE, required: false })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ example: '+56 9 8765 4321', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  companyId?: number;
}