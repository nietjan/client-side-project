import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
  IsObject,
  IsEmail,
  IsDateString,
} from 'class-validator';
import {
  IAddress,
  ICreateAddress,
  ICreateLocation,
} from '@client-side/shared/api';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateAddressDto implements ICreateAddress {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  street!: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  homeNumber!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  city!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  country!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  postalCode!: string;
}
