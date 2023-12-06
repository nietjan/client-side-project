import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICreateAddress } from '../../../../shared/api/src/lib/models/address.interface';

@Schema()
export class DbAddress implements ICreateAddress {
  @Prop({ required: true })
  street!: string;
  @Prop({ required: false })
  homeNumber!: string;
  @Prop({ required: true })
  city!: string;
  @Prop({ required: true })
  country!: string;
  @Prop({ required: true })
  postalCode!: string;
}

export const AddressSchema = SchemaFactory.createForClass(DbAddress);
