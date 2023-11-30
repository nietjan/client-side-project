import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { DbUser, UserDocument } from '../user/user.schema';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser, IUserCredentials } from '@client-side/shared/api';

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

  async login(credentials: IUserCredentials): Promise<IUser> {
    this.logger.log('login ' + credentials.eMail);
    return await this.UserModel.findOne({
      emailAddress: credentials.eMail,
    })
      .select('+password')
      .exec()
      .then((user) => {
        if (user && user.password === credentials.password) {
          const payload = {
            user_id: user._id,
          };
          return {
            _id: user._id,
            name: user.name,
            eMail: user.eMail,
            token: this.jwtService.sign(payload),
          };
        } else {
          const errMsg = 'Email not found or password invalid';
          this.logger.debug(errMsg);
          throw new UnauthorizedException(errMsg);
        }
      })
      .catch((error) => {
        return error;
      });
  }
}
