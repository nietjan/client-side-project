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
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  IAddress,
  ICreateUser,
  IUpdateUser,
  IUpsertUser,
  IUpdateAddress,
  role,
} from '@client-side/shared/api';
import { CreateAddressDto } from './address.dto';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateUserDto implements ICreateUser {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    type: String,
  })
  @IsDateString()
  @IsNotEmpty()
  dateOfBirith!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  sex!: string;

  @ApiProperty({ type: String })
  @IsPhoneNumber('NL')
  @IsNotEmpty()
  phoneNumber!: string;

  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  eMail!: string;

  @ApiProperty({ enum: ['user', 'employee'] })
  @IsEnum(role)
  @IsOptional()
  role!: role;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  password!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  iban!: string;

  @ApiProperty({ type: CreateAddressDto })
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address!: CreateAddressDto;
}

export class UpsertUserDto implements IUpsertUser {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  _id!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  dateOfBirith!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  sex!: string;

  @ApiProperty({ type: String })
  @IsPhoneNumber('NL')
  @IsNotEmpty()
  phoneNumber!: string;

  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  eMail!: string;

  @ApiProperty({ type: String })
  @IsStrongPassword()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({ enum: ['USER', 'EMPLOYEE'] })
  @IsOptional()
  @IsEnum(role)
  role!: role;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  iban!: string;

  @ApiProperty({ type: CreateAddressDto })
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address!: CreateAddressDto;
}

export class UpdateUserDto implements IUpdateUser, IUpdateAddress {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  dateOfBirith!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  sex!: string;

  @ApiProperty({ type: String })
  @IsPhoneNumber('NL')
  @IsNotEmpty()
  phoneNumber!: string;

  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  eMail!: string;

  @ApiProperty({ enum: ['USER', 'EMPLOYEE'] })
  @IsOptional()
  @IsEnum(role)
  role!: role;

  @ApiProperty({ type: String })
  @IsStrongPassword()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  iban!: string;

  @ApiProperty({ type: CreateAddressDto })
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address!: CreateAddressDto;
}
