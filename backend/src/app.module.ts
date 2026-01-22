import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { CompaniesModule } from './companies/companies.module';
import { ServiceRequestsModule } from './service-requests/service-requests.module';
import { TripsModule } from './trips/trips.module';
import { ReportsModule } from './reports/reports.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    RedisModule,
    AuthModule,
    UsersModule,
    VehiclesModule,
    CompaniesModule,
    ServiceRequestsModule,
    TripsModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
