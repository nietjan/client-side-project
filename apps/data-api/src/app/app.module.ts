import { Module } from '@nestjs/common';
import { LocationModule, UserModule } from '@client-side/backend/features';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    LocationModule,
    UserModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/clientSide'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
