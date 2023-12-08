import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.services';
import { Public } from './decorators/decorators';
import { ILoginReturnInfo, IUserCredentials } from '@client-side/shared/api';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { UserCredentialsApiTag } from './decorators/api.decorators';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 201,
    description: 'Succesfully logged',
  })
  @ApiResponse({
    status: 401,
    description: 'Email or password or incorrect',
  })
  @ApiBody({ type: UserCredentialsApiTag })
  async login(
    @Body() credentials: IUserCredentials
  ): Promise<ILoginReturnInfo> {
    this.logger.log('Login');
    return await this.authService.login(credentials);
  }
}
