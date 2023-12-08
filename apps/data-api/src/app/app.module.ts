import { Module } from '@nestjs/common';
import {
  LocationModule,
  UserModule,
  AbonnementModule,
  RegistrationModule,
  AuthModule,
} from '@client-side/backend/features';
import { MongooseModule } from '@nestjs/mongoose';
import { Neo4jModule, Neo4jScheme } from 'nest-neo4j/dist';

let neoScheme: any = process.env.NEO4J_SCHEME || 'neo4j';

@Module({
  imports: [
    LocationModule,
    UserModule,
    AbonnementModule,
    RegistrationModule,
    AuthModule,
    MongooseModule.forRoot(
      process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/clientSide'
    ),
    Neo4jModule.forRoot({
      scheme: neoScheme,
      host: process.env.NEO4J_URI || 'localhost',
      port: process.env.NEO4J_PORT || 7687,
      username: process.env.NEO4J_USERNAME || 'neo4j',
      password: process.env.NEO4J_PASSWORD || 'neo4',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
