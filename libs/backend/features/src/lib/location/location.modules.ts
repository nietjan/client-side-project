import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.services';
import { MongooseModule } from '@nestjs/mongoose';
import { AbonnementModule } from '../abonnement/abonnement.modules';
import { DbLocation, LocationSchema } from './location.schema';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { RegistrationModule } from '../registration/registration.modules';

@Module({
  imports: [
    AbonnementModule,
    MongooseModule.forFeature([
      { name: DbLocation.name, schema: LocationSchema },
    ]),
    JwtModule,
    AuthModule,
    RegistrationModule,
  ],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
