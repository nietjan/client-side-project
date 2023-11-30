import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.services';
import { Public } from './decorators/decorators';
import { IUserCredentials } from '@client-side/shared/api';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() credentials: IUserCredentials): Promise<any> {
    this.logger.log('Login');
    return await this.authService.login(credentials);
  }
}
