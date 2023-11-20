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

  @IsNumber()
  @IsNotEmpty()
  period!: number;

  @IsOptional()
  @IsNumber()
  price!: number;
}
