import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IAddress } from '../../../../../shared/api/src/lib/models/address.interface';
import { AddressSchema } from '../address.schema';

export type LocationDocument = HydratedDocument<DbLocation>;

@Schema()
export class DbLocation {
  @Prop({ required: true })
  phoneNumber!: string;

  @Prop({ required: true })
  eMail!: string;

  @Prop({ required: true })
  openingsTime!: string;

  @Prop({ required: true })
  closingTime!: string;

  @Prop({ required: true })
  hasTrainers!: boolean;

  @Prop({ type: AddressSchema })
  address!: IAddress;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DbAbonnement' }],
  })
  abonnements!: mongoose.Schema.Types.ObjectId[];

  @Prop({
    required: true,
  })
  imgUrl!: string;
}

export const LocationSchema = SchemaFactory.createForClass(DbLocation);
