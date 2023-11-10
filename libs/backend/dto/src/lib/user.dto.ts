import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsObject,
  IsEmail,
  IsDateString,
  ValidateNested,
  IsStrongPassword,
  IsPhoneNumber,
  IsNotEmptyObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  IAddress,
  ICreateUser,
  IUpdateUser,
  IUpsertUser,
  IUpdateAddress,
} from '@client-side/shared/api';
import { CreateAddressDto } from './address.dto';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateUserDto implements ICreateUser {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirith!: Date;

  @IsString()
  @IsNotEmpty()
  sex!: string;

  @IsPhoneNumber('NL')
  @IsNotEmpty()
  phoneNumber!: string;

  @IsEmail()
  @IsNotEmpty()
  eMail!: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  iban!: string;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address!: CreateAddressDto;
}

export class UpsertUserDto implements IUpsertUser {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirith!: Date;

  @IsString()
  @IsNotEmpty()
  sex!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsEmail()
  @IsNotEmpty()
  eMail!: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  iban!: string;

  @IsObject()
  @IsNotEmpty()
  address!: IAddress;
}

export class UpdateUserDto implements IUpdateUser, IUpdateAddress {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsOptional()
  name!: string;

  @IsDateString()
  @IsOptional()
  dateOfBirith!: Date;

  @IsString()
  @IsOptional()
  sex!: string;

  @IsString()
  @IsOptional()
  phoneNumber!: string;

  @IsEmail()
  @IsOptional()
  eMail!: string;

  @IsStrongPassword()
  @IsOptional()
  password!: string;

  @IsString()
  @IsOptional()
  iban!: string;

  @IsObject()
  @IsOptional()
  address!: IAddress;

  @IsString()
  @IsOptional()
  street!: string;

  @IsString()
  @IsOptional()
  homeNumber!: string;

  @IsString()
  @IsOptional()
  city!: string;

  @IsString()
  @IsOptional()
  country!: string;

  @IsString()
  @IsOptional()
  postalCode!: string;
}
