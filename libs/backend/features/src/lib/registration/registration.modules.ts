import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationService } from './registration.services';
import { RegistrationController } from './registration.controller';
import { DbRegistration, RegistrationSchema } from './registration.schema';
import { LocationModule } from '../location/location.modules';
import { AbonnementModule } from '../abonnement/abonnement.modules';
import { UserModule } from '../user/user.modules';

@Module({
  controllers: [RegistrationController],
  providers: [RegistrationService],
  exports: [RegistrationService],
  imports: [
    LocationModule,
    AbonnementModule,
    UserModule,
    MongooseModule.forFeature([
      { name: DbRegistration.name, schema: RegistrationSchema },
    ]),
  ],
})
export class RegistrationModule {}
