import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { role } from '@client-side/shared/api';

@Injectable()
export class EmployeeOnlyGuard implements CanActivate {
  private readonly logger = new Logger(EmployeeOnlyGuard.name);

  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      this.logger.log('No token found');
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env['JWT_SECRET'] || 'secretstring',
      });
      this.logger.log('payload', payload);

      //if user is not employee than not allowed
      if (payload.user_role != role.EMPLOYEE.toString()) {
        throw new UnauthorizedException(
          'User is not authorized for this action'
        );
      }

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('User is not authorized for this action');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
