import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { REDIS_CLIENT } from '../redis/redis.module';
import Redis from 'ioredis';

@Injectable()
export class HealthService {
  constructor(
    private prisma: PrismaService,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
  ) {}

  async checkHealth() {
    const health = {
      api: 'up',
      database: 'down',
      redis: 'down',
      timestamp: new Date().toISOString(),
    };

    try {
      await this.prisma.$queryRaw`SELECT 1`;
      health.database = 'up';
    } catch (e) {
      health.database = 'down';
    }

    try {
      const ping = await this.redis.ping();
      if (ping === 'PONG') {
        health.redis = 'up';
      }
    } catch (e) {
      health.redis = 'down';
    }

    return health;
  }
}
