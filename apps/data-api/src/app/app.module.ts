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

let neoScheme: any = process.env.NEO4J_SCHEME || 'bolt+s';

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
      host: process.env.NEO4J_URI || '09d0f933.databases.neo4j.io:7687',
      username: process.env.NEO4J_USERNAME || 'neo4j',
      password:
        process.env.NEO4J_PASSWORD ||
        'KMDK37mQbCwK-9ja_RKJTDyWOciOaeAn5alaV0QFlTU',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
