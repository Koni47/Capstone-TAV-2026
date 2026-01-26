import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: (configService: ConfigService) => {
        try {
          const redis = new Redis({
            host: configService.get<string>('REDIS_HOST', 'localhost'),
            port: configService.get<number>('REDIS_PORT', 6379),
            lazyConnect: true, // No conectar inmediatamente
            connectTimeout: 5000,
          });

          // Manejar errores de conexión sin detener la aplicación
          redis.on('error', (err) => {
            console.warn('Redis connection error (continuing without Redis):', err.message);
          });

          return redis;
        } catch (error) {
          console.warn('Redis not available, continuing without Redis cache');
          return null; // Retornar null si no se puede conectar
        }
      },
      inject: [ConfigService],
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
