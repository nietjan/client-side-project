import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.services';
import { MongooseModule } from '@nestjs/mongoose';
import { DbUser, UserSchema } from './user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [
    MongooseModule.forFeature([{ name: DbUser.name, schema: UserSchema }]),
    JwtModule,
    AuthModule,
  ],
})
export class UserModule {}
