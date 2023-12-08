import { Test, TestingModule } from '@nestjs/testing';
import { AbonnementController } from './abonnement.controller';
import { AbonnementService } from './abonnement.services';
import { DbAbonnement, AbonnementSchema } from './abonnement.schema';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { UpdateWriteOpResult } from 'mongoose';
import { DeleteResult } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import exp = require('constants');
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  CreateAbonnementDto,
  UpdateAbonnementDto,
} from '@client-side/backend/dto';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import {
  DbRegistration,
  RegistrationSchema,
} from '../registration/registration.schema';
import { Neo4jModule } from 'nest-neo4j/dist';

describe('AbonnementController', () => {
  let controller: AbonnementController;
  let service: AbonnementService;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbonnementController],
      providers: [AbonnementService],
      imports: [
        MongooseModule.forFeature([
          { name: DbAbonnement.name, schema: AbonnementSchema },
          { name: DbRegistration.name, schema: RegistrationSchema },
        ]),
        MongooseModule.forRoot(uri),
        JwtModule,
        AuthModule,
        Neo4jModule.forRoot({
          scheme: 'neo4j',
          host: 'localhost',
          port: 7687,
          username: 'neo4j',
          password: process.env.NEO4J_PASSWORD || 'neo4',
        }),
      ],
    }).compile();

    service = module.get<AbonnementService>(AbonnementService);
    controller = module.get<AbonnementController>(AbonnementController);
  });

  describe('getAll', () => {
    it('should return an array of locations', async () => {
      const result: DbAbonnement[] = [
        {
          name: '',
          period: 1,
          price: 1,
        },
      ];
      const promiseResult: Promise<DbAbonnement[]> = Promise.resolve(result);

      jest.spyOn(service, 'getAll').mockImplementation(() => promiseResult);

      let returnData: DbAbonnement[] = [];
      await controller.getAll().then((data) => (returnData = data));
      expect(returnData).toBe(result);
      expect(returnData.length).toBe(1);
    });

    it('should return an empty array of locations when there are no locations', async () => {
      const result: DbAbonnement[] = [];
      const promiseResult: Promise<DbAbonnement[]> = Promise.resolve(result);

      jest.spyOn(service, 'getAll').mockImplementation(() => promiseResult);

      let returnData: DbAbonnement[] = [];
      await controller.getAll().then((data) => (returnData = data));
      expect(returnData).toBe(result);
      expect(returnData.length).toBe(0);
    });
  });

  describe('getOne', () => {
    it('should return a location', async () => {
      const result: DbAbonnement = {
        name: '',
        period: 1,
        price: 1,
      };
      const promiseResult: Promise<DbAbonnement> = Promise.resolve(result);

      jest.spyOn(service, 'getOne').mockImplementation(() => promiseResult);

      let returnData: DbAbonnement | null = null;
      await controller.getOne('').then((data) => (returnData = data));
      expect(returnData).toBe(result);
    });

    it('Should throw not found exception when location equals null', async () => {
      const result: DbAbonnement[] = [];
      const promiseResult: Promise<DbAbonnement | null> = Promise.resolve(null);

      jest.spyOn(service, 'getOne').mockImplementation(() => promiseResult);

      await expect(controller.getOne('1')).rejects.toEqual(
        new HttpException(
          `Abonnement with id: 1 does not exist`,
          HttpStatus.NOT_FOUND
        )
      );
    });
  });

  describe('create', () => {
    it('should return a location', async () => {
      const result: CreateAbonnementDto = {
        name: '',
        period: 1,
        price: 1,
      };
      const promiseResult: Promise<DbAbonnement> = Promise.resolve(result);

      jest.spyOn(service, 'create').mockImplementation(() => promiseResult);

      let returnData: DbAbonnement | null = null;
      await controller.create(result).then((data) => (returnData = data));
      expect(returnData).toBe(result);
    });
  });

  describe('update', () => {
    it('should return a UpdateWriteOpResult', async () => {
      const input: UpdateAbonnementDto = {
        name: '',
        period: 1,
        price: 1,
      };

      let output: UpdateWriteOpResult = {
        acknowledged: true,
        matchedCount: 1,
        modifiedCount: 1,
        upsertedCount: 0,
        upsertedId: null,
      };
      const promiseResult: Promise<UpdateWriteOpResult> =
        Promise.resolve(output);

      jest.spyOn(service, 'update').mockImplementation(() => promiseResult);

      let returnData: UpdateWriteOpResult | null = null;
      await controller.Update('1', input).then((data) => (returnData = data));
      expect(returnData).toBe(output);
    });
  });

  describe('Delete', () => {
    it('should return a DeleteResult', async () => {
      let output: DeleteResult = {
        acknowledged: true,
        deletedCount: 1,
      };
      const promiseResult: Promise<DeleteResult> = Promise.resolve(output);

      jest.spyOn(service, 'delete').mockImplementation(() => promiseResult);

      let returnData: DeleteResult | null = null;
      await controller.delete('1').then((data) => (returnData = data));
      expect(returnData).toBe(output);
    });
  });

  afterAll(async () => {
    await mongod.stop();
  });
});
