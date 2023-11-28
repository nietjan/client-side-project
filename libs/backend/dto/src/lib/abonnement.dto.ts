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
import { ApiProperty } from '@nestjs/swagger';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateAbonnementDto implements ICreateAbonnement {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  period!: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  price!: number;
}

export class UpsertAbonnementDto implements IUpsertAbonnement {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  id!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  period!: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  price!: number;
}

export class UpdateAbonnementDto implements IUpdateAbonnement {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  period!: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  price!: number;
}
