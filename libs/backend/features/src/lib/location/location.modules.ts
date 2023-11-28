import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.services';
import { MongooseModule } from '@nestjs/mongoose';
import { DbLocation, LocationSchema } from './location.schema';
import { AbonnementModule } from '../abonnement/abonnement.modules';

@Module({
  imports: [
    AbonnementModule,
    MongooseModule.forFeature([
      { name: DbLocation.name, schema: LocationSchema },
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
