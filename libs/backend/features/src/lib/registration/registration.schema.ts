import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { IRegistration } from '@client-side/shared/api';

export type RegistrationDocument = HydratedDocument<DbRegistration>;

@Schema()
export class DbRegistration {
  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'DbUser' },
  })
  userId!: ObjectId;

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'DbLocation' },
  })
  locationId!: ObjectId;

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'DbAbonnement' },
  })
  abonnementId!: ObjectId;

  @Prop({ required: true })
  registrationDate!: Date;
}

export const RegistrationSchema = SchemaFactory.createForClass(DbRegistration);
