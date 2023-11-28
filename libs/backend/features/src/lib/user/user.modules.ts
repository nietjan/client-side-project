import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.services';
import { MongooseModule } from '@nestjs/mongoose';
import { DbLocation, LocationSchema } from '../location/location.schema';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [
    MongooseModule.forFeature([
      { name: DbLocation.name, schema: LocationSchema },
    ]),
  ],
})
export class UserModule {}
