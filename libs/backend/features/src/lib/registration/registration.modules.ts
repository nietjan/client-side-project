import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationService } from './registration.services';
import { RegistrationController } from './registration.controller';
import { DbRegistration, RegistrationSchema } from './registration.schema';

@Module({
  controllers: [RegistrationController],
  providers: [RegistrationService],
  exports: [RegistrationService],
  imports: [
    MongooseModule.forFeature([
      { name: DbRegistration.name, schema: RegistrationSchema },
    ]),
  ],
})
export class RegistrationModule {}
