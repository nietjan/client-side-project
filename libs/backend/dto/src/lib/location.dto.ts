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
import { ApiProperty } from '@nestjs/swagger';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateLocationDto implements ICreateLocation {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  eMail!: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!00:00)(24:00|([0-1]\d|2[0-3]):[0-5]\d)$/g, {
    message: 'OpeningsTime does not have valid value',
  })
  openingsTime!: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!00:00)(24:00|([0-1]\d|2[0-3]):[0-5]\d)$/g, {
    message: 'closingTime does not have valid value',
  })
  closingTime!: string;

  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  @IsNotEmpty()
  hasTrainers!: boolean;

  @ApiProperty({
    type: CreateAddressDto,
  })
  @IsObject()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateAddressDto)
  address!: CreateAddressDto;

  @ApiProperty({
    type: [String],
  })
  @IsArray()
  @IsNotEmpty()
  abonnements!: string[];
}

export class UpsertLocationDto implements IUpsertLocation {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  id!: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  eMail!: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!00:00)(24:00|([0-1]\d|2[0-3]):[0-5]\d)$/g, {
    message: 'OpeningsTime does not have valid value',
  })
  openingsTime!: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!00:00)(24:00|([0-1]\d|2[0-3]):[0-5]\d)$/g, {
    message: 'closingTime does not have valid value',
  })
  closingTime!: string;

  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  @IsNotEmpty()
  hasTrainers!: boolean;

  @ApiProperty({
    type: CreateAddressDto,
  })
  @IsObject()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateAddressDto)
  address!: CreateAddressDto;

  @ApiProperty({
    type: [String],
  })
  @IsArray()
  @IsNotEmpty()
  abonnements!: string[];
}

export class UpdateLocationDto implements IUpdateLocation {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  eMail!: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!00:00)(24:00|([0-1]\d|2[0-3]):[0-5]\d)$/g, {
    message: 'OpeningsTime does not have valid value',
  })
  openingsTime!: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!00:00)(24:00|([0-1]\d|2[0-3]):[0-5]\d)$/g, {
    message: 'closingTime does not have valid value',
  })
  closingTime!: string;

  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  @IsNotEmpty()
  hasTrainers!: boolean;

  @ApiProperty({
    type: CreateAddressDto,
  })
  @IsObject()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateAddressDto)
  address!: CreateAddressDto;

  @ApiProperty({
    type: [String],
  })
  @IsArray()
  @IsNotEmpty()
  abonnements!: string[];
}
