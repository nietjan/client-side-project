import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { DbUser, UserDocument } from '../user/user.schema';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ILoginReturnInfo,
  IUser,
  IUserCredentials,
} from '@client-side/shared/api';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(DbUser.name) private UserModel: Model<DbUser>,
    private jwtService: JwtService
  ) {}

  async validateUser(credentials: IUserCredentials): Promise<any> {
    this.logger.log('validateUser');

    //find user
    const user = await this.UserModel.findOne({
      emailAddress: credentials.eMail,
    });

    //check if password is correct
    if (user && user.password === credentials.password) {
      return user;
    }
    return null;
  }

  async login(credentials: IUserCredentials): Promise<ILoginReturnInfo> {
    this.logger.log('login ' + credentials.eMail + ' ' + credentials.password);
    return await this.UserModel.findOne({
      eMail: credentials.eMail,
    })
      .select('+password')
      .exec()
      .then((user) => {
        if (user && user.password === credentials.password) {
          const payload = {
            user_id: user._id,
            user_role: user.role,
          };
          const returnObject: ILoginReturnInfo = {
            _id: user._id.toString(),
            name: user.name,
            eMail: user.eMail,
            token: this.jwtService.sign(payload),
          };

          return returnObject;
        } else {
          const errMsg = 'Email not found or password invalid';
          this.logger.debug(errMsg);
          throw new UnauthorizedException(errMsg);
        }
      })
      .catch((error) => {
        if (error instanceof Error) {
          throw new UnauthorizedException(error.message);
        } else {
          throw new InternalServerErrorException('Internal server error');
        }
      });
  }
}
