import { Module, forwardRef } from '@nestjs/common';
import { AbonnementController } from './abonnement.controller';
import { AbonnementService } from './abonnement.services';
import { MongooseModule } from '@nestjs/mongoose';
import { DbAbonnement, AbonnementSchema } from './abonnement.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { RegistrationModule } from '../registration/registration.modules';
import {
  DbRegistration,
  RegistrationSchema,
} from '../registration/registration.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbAbonnement.name, schema: AbonnementSchema },
      { name: DbRegistration.name, schema: RegistrationSchema },
    ]),
    JwtModule,
    AuthModule,
  ],
  controllers: [AbonnementController],
  providers: [AbonnementService],
  exports: [AbonnementService],
})
export class AbonnementModule {}
