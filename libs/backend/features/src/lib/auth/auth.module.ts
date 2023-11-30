import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.modules';
import { DbUser, UserSchema } from '../user/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DbUser.name, schema: UserSchema }]),
    UserModule,
    JwtModule.register({
      secret: process.env['JWT_SECRET'] || 'secretstring',
      signOptions: { expiresIn: '12 days' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
