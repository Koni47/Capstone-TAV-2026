import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class RefundPaymentDto {
  @ApiProperty({ 
    description: 'Token de la transacción confirmada', 
    example: '01ab3b1639cf9af706e1f6c0f7afb21a71bd114a642bf660b364e3e383937f4f' 
  })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({ 
    description: 'Monto a reembolsar (debe ser menor o igual al monto original)', 
    example: 1000 
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;
}
