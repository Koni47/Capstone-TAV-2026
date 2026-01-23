import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InitiatePaymentDto {
  @ApiProperty({ 
    description: 'Monto a pagar', 
    example: 5000 
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ 
    description: 'Identificador único de la orden de compra', 
    example: 'orden-123456' 
  })
  @IsNotEmpty()
  @IsString()
  buyOrder: string;

  @ApiProperty({ 
    description: 'ID de la sesión del usuario', 
    example: 'session-abc-123' 
  })
  @IsNotEmpty()
  @IsString()
  sessionId: string;
}
