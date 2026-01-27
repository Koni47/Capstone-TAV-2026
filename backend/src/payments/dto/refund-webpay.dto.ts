import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class RefundWebpayDto {
  @ApiProperty({
    description: 'El ID único del viaje (Trip) cuya transacción se desea anular',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  tripId: string;

  @ApiProperty({
    description: 'Monto a reembolsar. Si se omite, se reembolsa el total.',
    required: false,
    example: 1000,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  amount?: number;
}
