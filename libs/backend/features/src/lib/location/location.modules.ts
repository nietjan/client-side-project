import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.services';
import { MongooseModule } from '@nestjs/mongoose';
import { AbonnementModule } from '../abonnement/abonnement.modules';
import { DbUser, UserSchema } from '../user/user.schema';

@Module({
  imports: [
    AbonnementModule,
    MongooseModule.forFeature([{ name: DbUser.name, schema: UserSchema }]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
