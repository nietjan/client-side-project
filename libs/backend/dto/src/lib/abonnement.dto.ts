import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
  IsObject,
  IsEmail,
  IsDateString,
  IsNumber,
} from 'class-validator';
import {
  IAbonnement,
  ICreateAbonnement,
  IUpdateAbonnement,
  IUpsertAbonnement,
} from '@client-side/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateAbonnementDto implements ICreateAbonnement {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  locationId!: string;

  @IsNumber()
  @IsNotEmpty()
  period!: number;

  @IsNotEmpty()
  @IsNumber()
  price!: number;
}

export class UpsertAbonnementDto implements IUpsertAbonnement {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  locationId!: string;

  @IsNumber()
  @IsNotEmpty()
  period!: number;

  @IsNotEmpty()
  @IsNumber()
  price!: number;
}

export class UpdateAbonnementDto implements IUpdateAbonnement {
  @IsNotEmpty()
  locationId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @IsOptional()
  period!: number;

  @IsOptional()
  @IsNumber()
  price!: number;
}
