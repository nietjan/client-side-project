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
  IsArray,
  Matches,
} from 'class-validator';
import {
  ICreateLocation,
  IUpdateLocation,
  IUpsertLocation,
} from '@client-side/shared/api';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './address.dto';
import { CreateAbonnementDto } from './abonnement.dto';

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

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!00:00)(24:00|([0-1]\d|2[0-3]):[0-5]\d)$/g, {
    message: 'OpeningsTime does not have valid value',
  })
  openingsTime!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!00:00)(24:00|([0-1]\d|2[0-3]):[0-5]\d)$/g, {
    message: 'closingTime does not have valid value',
  })
  closingTime!: string;

  @IsBoolean()
  @IsNotEmpty()
  hasTrainers!: boolean;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address!: CreateAddressDto;

  @IsArray()
  @IsNotEmpty()
  abonnements!: string[];
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

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!00:00)(24:00|([0-1]\d|2[0-3]):[0-5]\d)$/g, {
    message: 'OpeningsTime does not have valid value',
  })
  openingsTime!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!00:00)(24:00|([0-1]\d|2[0-3]):[0-5]\d)$/g, {
    message: 'closingTime does not have valid value',
  })
  closingTime!: string;

  @IsBoolean()
  @IsNotEmpty()
  hasTrainers!: boolean;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address!: CreateAddressDto;

  @IsArray()
  @IsNotEmpty()
  abonnements!: string[];
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
  @Matches(/^(?!00:00)(24:00|([0-1]\d|2[0-3]):[0-5]\d)$/g, {
    message: 'OpeningsTime does not have valid value',
  })
  openingsTime!: Date;

  @IsDate()
  @Matches(/^(?!00:00)(24:00|([0-1]\d|2[0-3]):[0-5]\d)$/g, {
    message: 'closingTime does not have valid value',
  })
  @IsOptional()
  closingTime!: Date;

  @IsBoolean()
  @IsOptional()
  hasTrainers!: boolean;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address!: CreateAddressDto;

  @IsArray()
  @IsOptional()
  abonnements!: string[];
}
