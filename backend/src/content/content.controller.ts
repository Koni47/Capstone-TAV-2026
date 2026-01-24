import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContentService } from './content.service';

@ApiTags('Contenido Estático')
@Controller('content')
export class ContentController {
  constructor(private readonly service: ContentService) {}

  @Get('terms')
  @ApiOperation({ summary: 'Obtener Términos y Condiciones' })
  @ApiResponse({ status: 200, description: 'Contenido de términos y condiciones' })
  getTerms() {
    return this.service.getTerms();
  }

  @Get('privacy')
  @ApiOperation({ summary: 'Obtener Política de Privacidad' })
  @ApiResponse({ status: 200, description: 'Contenido de política de privacidad' })
  getPrivacy() {
    return this.service.getPrivacy();
  }
}
