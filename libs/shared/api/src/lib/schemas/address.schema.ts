import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICreateAddress } from '../models/address.interface';

@Schema()
export class DbAddress implements ICreateAddress {
  @Prop({ required: true })
  street!: string;
  @Prop({ required: true })
  homeNumber!: string;
  @Prop({ required: true })
  city!: string;
  @Prop({ required: true })
  country!: string;
  @Prop({ required: true })
  postalCode!: string;
}

export const AddressSchema = SchemaFactory.createForClass(DbAddress);
