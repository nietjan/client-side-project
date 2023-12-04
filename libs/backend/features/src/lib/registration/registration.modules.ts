import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationService } from './registration.services';
import { RegistrationController } from './registration.controller';
import { DbRegistration, RegistrationSchema } from './registration.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { LocationModule } from '../location/location.modules';
import { AbonnementModule } from '../abonnement/abonnement.modules';

@Module({
  controllers: [RegistrationController],
  providers: [RegistrationService],
  exports: [RegistrationService],
  imports: [
    MongooseModule.forFeature([
      { name: DbRegistration.name, schema: RegistrationSchema },
    ]),
    JwtModule,
    AuthModule,
    LocationModule,
    AbonnementModule,
  ],
})
export class RegistrationModule {}
