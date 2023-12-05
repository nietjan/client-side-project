import { Module } from '@nestjs/common';
import {
  LocationModule,
  UserModule,
  AbonnementModule,
  RegistrationModule,
  AuthModule,
} from '@client-side/backend/features';
import { MongooseModule } from '@nestjs/mongoose';
import { Neo4jModule } from 'nest-neo4j/dist';

@Module({
  imports: [
    LocationModule,
    UserModule,
    AbonnementModule,
    RegistrationModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/clientSide'),
    Neo4jModule.forRoot({
      scheme: 'neo4j',
      host: 'localhost',
      port: 7687,
      username: 'neo4j',
      password: process.env.NEO4J_PASSWORD || 'neo4',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
