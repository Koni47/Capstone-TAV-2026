import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class TestInitWebpayDto {
  @ApiProperty({
    description: 'Monto a probar',
    example: 1000,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({
    description: 'Nombre del producto (solo para referencia)',
    example: 'Prueba de Humo',
  })
  @IsOptional()
  @IsString()
  productName?: string;

  @ApiProperty({
    description: 'Orden de compra (opcional)',
    example: 'TEST-123456',
    required: false,
  })
  @IsOptional()
  @IsString()
  buyOrder?: string;
}
