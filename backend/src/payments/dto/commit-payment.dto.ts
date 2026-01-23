import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommitPaymentDto {
  @ApiProperty({ 
    description: 'Token de Webpay recibido en la URL de retorno (TBK_TOKEN o token_ws)', 
    example: '01ab23cd45ef...' 
  })
  @IsNotEmpty()
  @IsString()
  token_ws: string;
}
