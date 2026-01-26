import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Seguridad
  app.use(helmet());
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*', // Ajustar en producción
    credentials: true,
  });
  app.use(cookieParser());

  // Validación Global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Prefijo Global de API
  app.setGlobalPrefix('api/v1');

  // Configuración Swagger
  const config = new DocumentBuilder()
    .setTitle('Servicios El Loa API')
    .setDescription('API para gestión de transporte corporativo y fleet management')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Exponer JSON de Swagger explícitamente
  app.getHttpAdapter().get('/api/v1/swagger-json', (req, res) => {
    res.json(document);
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  const url = await app.getUrl();
  const formattedUrl = url.replace('[::1]', 'localhost');
  console.log(`Application is running on: ${formattedUrl}`);
  console.log(`Swagger docs available at: ${formattedUrl}/docs`);
  console.log(`Swagger JSON available at: ${formattedUrl}/api/v1/swagger-json`);
  console.log(`Health check available at: ${formattedUrl}/api/v1/health`);
}
bootstrap();
