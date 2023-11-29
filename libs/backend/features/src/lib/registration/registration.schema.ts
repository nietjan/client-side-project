import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IRegistration } from '@client-side/shared/api';

export type RegistrationDocument = HydratedDocument<DbRegistration>;

@Schema()
export class DbRegistration implements IRegistration {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  locationId!: string;

  @Prop({ required: true })
  abonnementID!: string;

  @Prop({ required: true })
  registrationDate!: Date;
}

export const RegistrationSchema = SchemaFactory.createForClass(DbRegistration);
