import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'nuevo@usuario.cl' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'ContraseñaSegura123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Juan Nuevo' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: '+56912345678', required: false })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
