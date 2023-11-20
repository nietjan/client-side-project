import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
  IsObject,
  IsEmail,
  IsDateString,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import {
  IAddress,
  ICreateLocation,
  IUpdateLocation,
  IUpsertLocation,
} from '@client-side/shared/api';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './address.dto';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateLocationDto implements ICreateLocation {
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsEmail()
  @IsNotEmpty()
  eMail!: string;

  @IsDateString()
  @IsNotEmpty()
  openingsTime!: Date;

  @IsDateString()
  @IsNotEmpty()
  closingTime!: Date;

  @IsBoolean()
  @IsNotEmpty()
  hasTrainers!: boolean;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address!: CreateAddressDto;
}

export class UpsertLocationDto implements IUpsertLocation {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  eMail!: string;

  @IsDate()
  @IsNotEmpty()
  openingsTime!: Date;

  @IsDate()
  @IsNotEmpty()
  closingTime!: Date;

  @IsBoolean()
  @IsNotEmpty()
  hasTrainers!: boolean;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address!: CreateAddressDto;
}

export class UpdateLocationDto implements IUpdateLocation {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsOptional()
  phoneNumber!: string;

  @IsString()
  @IsOptional()
  eMail!: string;

  @IsDate()
  @IsOptional()
  openingsTime!: Date;

  @IsDate()
  @IsOptional()
  closingTime!: Date;

  @IsBoolean()
  @IsOptional()
  hasTrainers!: boolean;
}
