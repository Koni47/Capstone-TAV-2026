import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommitWebpayDto {
  @ApiProperty({
    description: 'El token recibido desde Webpay (token_ws)',
    example: '01ab2bf123...',
  })
  @IsNotEmpty()
  @IsString()
  token_ws: string;
}
