import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ICreateRegistration } from '@client-side/shared/api';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateRegistrationDTO implements ICreateRegistration {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @MinLength(24, { message: 'Incorrect locationId' })
  locationId!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @MinLength(24, { message: 'Incorrect abonnementId' })
  abonnementId!: string;
}
