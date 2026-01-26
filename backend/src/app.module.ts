import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServiceRequestsModule } from './service-requests/service-requests.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { UsersModule } from './users/users.module';
import { DriversModule } from './drivers/drivers.module';
import { AppController } from './app.controller';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';
import { TripsModule } from './trips/trips.module';
import { CompaniesModule } from './companies/companies.module';
import { ReportsModule } from './reports/reports.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    RedisModule,
    AuthModule,
    TripsModule,
    CompaniesModule,
    ServiceRequestsModule,
    VehiclesModule,
    UsersModule,
    DriversModule,
    PaymentsModule,
    ReportsModule,
    ComplaintsModule,
    ContentModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
