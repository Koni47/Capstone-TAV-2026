import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENTE',
  DRIVER = 'CHOFER',
}

export class LoginDto {
  @ApiProperty({ example: 'juan.perez@mineraabc.cl' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Password123!' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.CLIENT })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
