import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckStatusDto {
  @ApiProperty({ 
    description: 'Token de la transacción a consultar', 
    example: '01ab3b1639cf9af706e1f6c0f7afb21a71bd114a642bf660b364e3e383937f4f' 
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
