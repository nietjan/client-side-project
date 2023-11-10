import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
  IsObject,
  IsEmail,
  IsDateString,
  IsStrongPassword,
  IsPhoneNumber,
} from 'class-validator';
import {
  IAddress,
  ICreateUser,
  IUpdateUser,
  IUpsertUser,
} from '@client-side/shared/api';

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

  @IsPhoneNumber()
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

export class UpdateUserDto implements IUpdateUser {
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
}
