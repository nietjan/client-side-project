import { Module } from '@nestjs/common';
import { AbonnementController } from './abonnement.controller';
import { AbonnementService } from './abonnement.services';
import { MongooseModule } from '@nestjs/mongoose';
import { DbAbonnement, AbonnementSchema } from './abonnement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbAbonnement.name, schema: AbonnementSchema },
    ]),
  ],
  controllers: [AbonnementController],
  providers: [AbonnementService],
  exports: [AbonnementService],
})
export class AbonnementModule {}
