import { IUserCredentials } from '@client-side/shared/api';
import { ApiProperty } from '@nestjs/swagger';

//for api tag
export class UserCredentialsApiTag implements IUserCredentials {
  @ApiProperty({ type: String })
  eMail!: string;

  @ApiProperty({ type: String })
  password!: string;
}
