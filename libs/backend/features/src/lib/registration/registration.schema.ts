import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { IRegistration } from '@client-side/shared/api';
import { DbUser } from '../user/user.schema';
import { DbLocation } from '../location/location.schema';
import { DbAbonnement } from '../abonnement/abonnement.schema';

export type RegistrationDocument = HydratedDocument<DbRegistration>;

@Schema()
export class DbRegistration {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  userId!: { type: mongoose.Schema.Types.ObjectId; ref: 'DbAbonnement' };

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  locationId!: { type: mongoose.Schema.Types.ObjectId; ref: 'DbAbonnement' };

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  abonnementId!: { type: mongoose.Schema.Types.ObjectId; ref: 'DbAbonnement' };

  @Prop({ required: true, default: new Date() })
  registrationDate!: Date;
}

export const RegistrationSchema = SchemaFactory.createForClass(DbRegistration);
