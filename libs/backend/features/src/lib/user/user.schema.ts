import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IAddress } from '../../../../../shared/api/src/lib/models/address.interface';
import { AddressSchema } from '../address.schema';
import { ROLE } from '@client-side/shared/api';

export type UserDocument = HydratedDocument<DbUser>;

@Schema()
export class DbUser {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  dateOfBirith!: string;

  @Prop({ required: true })
  sex!: string;

  @Prop({ required: true })
  phoneNumber!: string;

  @Prop({ required: true })
  eMail!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  iban!: string;

  @Prop({ required: true, default: ROLE.USER, type: String })
  role!: ROLE;

  @Prop({ type: AddressSchema })
  address!: IAddress;
}

export const UserSchema = SchemaFactory.createForClass(DbUser);
