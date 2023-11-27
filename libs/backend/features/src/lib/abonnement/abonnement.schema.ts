import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IAddress } from '../../../../../shared/api/src/lib/models/address.interface';
import { AddressSchema } from '../address.schema';
import { ICreateAbonnement } from '../../../../../shared/api/src/lib/models/abonnement.interface';

export type AbonnementDocument = HydratedDocument<DbAbonnement>;

@Schema()
export class DbAbonnement implements ICreateAbonnement {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true })
  period!: number;
}

export const AbonnementSchema = SchemaFactory.createForClass(DbAbonnement);
