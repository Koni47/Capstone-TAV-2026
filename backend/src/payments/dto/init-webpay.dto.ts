import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class InitWebpayDto {
  @ApiProperty({
    description: 'El ID único del viaje (Trip) que se desea pagar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  tripId: string;
}
