import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from './location.services';
import { DbLocation, LocationSchema } from './location.schema';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose, { UpdateWriteOpResult } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import exp = require('constants');
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateLocationDto, UpdateLocationDto } from '@client-side/backend/dto';
import { DeleteResult, ObjectId } from 'mongodb';
import { AbonnementModule } from './../abonnement/abonnement.modules';
import { AbonnementService } from '../abonnement/abonnement.services';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { Neo4jModule } from 'nest-neo4j/dist';
import {
  DbRegistration,
  RegistrationSchema,
} from '../registration/registration.schema';

describe('LocationController', () => {
  let controller: LocationController;
  let service: LocationService;
  let abonnementService: AbonnementService;
  let mongod: MongoMemoryServer;
  // let mongoConnection: Connection;
  // let articleModel: Model<DbLocation>;
  let neoScheme: any = process.env.NEO4J_SCHEME || 'neo4j';

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    // articleModel = mongoConnection.model(DbLocation.name, LocationSchema);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [LocationService],
      imports: [
        MongooseModule.forFeature([
          { name: DbLocation.name, schema: LocationSchema },
          { name: DbRegistration.name, schema: RegistrationSchema },
        ]),
        MongooseModule.forRoot(uri),
        AbonnementModule,
        JwtModule,
        AuthModule,
        Neo4jModule.forRoot({
          scheme: neoScheme,
          host: process.env.NEO4J_URI || 'localhost',
          port: process.env.NEO4J_PORT || 7687,
          username: process.env.NEO4J_USERNAME || 'neo4j',
          password: process.env.NEO4J_PASSWORD || 'neo4',
        }),
      ],
    }).compile();

    abonnementService = module.get<AbonnementService>(AbonnementService);
    service = module.get<LocationService>(LocationService);
    controller = module.get<LocationController>(LocationController);
  });

  describe('getAll', () => {
    it('should return an array of locations', async () => {
      const result: DbLocation[] = [
        {
          phoneNumber: '',
          eMail: '',
          openingsTime: '',
          closingTime: '',
          hasTrainers: true,
          abonnements: [],
          address: {
            street: '',
            homeNumber: '',
            city: '',
            country: '',
            postalCode: '',
          },
          imgUrl: '',
        },
      ];
      const promiseResult: Promise<DbLocation[]> = Promise.resolve(result);

      jest.spyOn(service, 'getAll').mockImplementation(() => promiseResult);

      let returnData: DbLocation[] = [];
      await controller.getAll().then((data) => (returnData = data));
      expect(returnData).toBe(result);
      expect(returnData.length).toBe(1);
    });

    it('should return an empty array of locations when there are no locations', async () => {
      const result: DbLocation[] = [];
      const promiseResult: Promise<DbLocation[]> = Promise.resolve(result);

      jest.spyOn(service, 'getAll').mockImplementation(() => promiseResult);

      let returnData: DbLocation[] = [];
      await controller.getAll().then((data) => (returnData = data));
      expect(returnData).toBe(result);
      expect(returnData.length).toBe(0);
    });
  });

  describe('getOne', () => {
    it('should return a location', async () => {
      const result: DbLocation = {
        phoneNumber: '',
        eMail: '',
        openingsTime: '',
        closingTime: '',
        hasTrainers: true,
        abonnements: [],
        address: {
          street: '',
          homeNumber: '',
          city: '',
          country: '',
          postalCode: '',
        },
        imgUrl: '',
      };
      const promiseResult: Promise<DbLocation> = Promise.resolve(result);

      jest.spyOn(service, 'getOne').mockImplementation(() => promiseResult);

      let returnData: DbLocation | null = null;
      await controller.getOne('').then((data) => (returnData = data));
      expect(returnData).toBe(result);
    });

    it('Should throw not found exception when location equals null', async () => {
      const result: DbLocation[] = [];
      const promiseResult: Promise<DbLocation | null> = Promise.resolve(null);

      jest.spyOn(service, 'getOne').mockImplementation(() => promiseResult);

      await expect(controller.getOne('1')).rejects.toEqual(
        new HttpException(`Not found`, HttpStatus.NOT_FOUND)
      );
    });
  });

  describe('create', () => {
    it('should return a location', async () => {
      const input: CreateLocationDto = {
        phoneNumber: '',
        eMail: '',
        openingsTime: '',
        closingTime: '',
        hasTrainers: true,
        abonnements: ['1'],
        address: {
          street: '',
          homeNumber: '',
          city: '',
          country: '',
          postalCode: '',
        },
        imgUrl: '',
      };

      const output: DbLocation = {
        phoneNumber: '',
        eMail: '',
        openingsTime: '',
        closingTime: '',
        hasTrainers: true,
        abonnements: [new mongoose.Schema.Types.ObjectId('1')],
        address: {
          street: '',
          homeNumber: '',
          city: '',
          country: '',
          postalCode: '',
        },
        imgUrl: '',
      };
      const promiseResult: Promise<DbLocation> = Promise.resolve(output);
      const promiseAbonnementResult: Promise<boolean> = Promise.resolve(true);
      jest
        .spyOn(abonnementService, 'areAbonnements')
        .mockImplementation(() => promiseAbonnementResult);
      jest.spyOn(service, 'create').mockImplementation(() => promiseResult);

      let returnData: DbLocation | null = null;
      await controller.create(input).then((data) => (returnData = data));
      expect(returnData).toBe(output);
    });

    it('should return a exception with incorrect abonnements', async () => {
      const input: CreateLocationDto = {
        phoneNumber: '',
        eMail: '',
        openingsTime: '',
        closingTime: '',
        hasTrainers: true,
        abonnements: ['1'],
        address: {
          street: '',
          homeNumber: '',
          city: '',
          country: '',
          postalCode: '',
        },
        imgUrl: '',
      };

      const output: DbLocation = {
        phoneNumber: '',
        eMail: '',
        openingsTime: '',
        closingTime: '',
        hasTrainers: true,
        abonnements: [new mongoose.Schema.Types.ObjectId('1')],
        address: {
          street: '',
          homeNumber: '',
          city: '',
          country: '',
          postalCode: '',
        },
        imgUrl: '',
      };
      const promiseResult: Promise<DbLocation> = Promise.resolve(output);
      const promiseAbonnementResult: Promise<boolean> = Promise.resolve(false);
      jest
        .spyOn(abonnementService, 'areAbonnements')
        .mockImplementation(() => promiseAbonnementResult);
      jest.spyOn(service, 'create').mockImplementation(() => {
        throw new HttpException(
          `One or multiple abonnements are not found`,
          HttpStatus.NOT_FOUND
        );
      });

      await expect(controller.create(input)).rejects.toEqual(
        new HttpException(
          `One or multiple abonnements are not found`,
          HttpStatus.NOT_FOUND
        )
      );
    });

    it('should return a exception with no abonnements', async () => {
      const input: CreateLocationDto = {
        phoneNumber: '',
        eMail: '',
        openingsTime: '',
        closingTime: '',
        hasTrainers: true,
        abonnements: [],
        address: {
          street: '',
          homeNumber: '',
          city: '',
          country: '',
          postalCode: '',
        },
        imgUrl: '',
      };

      const output: DbLocation = {
        phoneNumber: '',
        eMail: '',
        openingsTime: '',
        closingTime: '',
        hasTrainers: true,
        abonnements: [],
        address: {
          street: '',
          homeNumber: '',
          city: '',
          country: '',
          postalCode: '',
        },
        imgUrl: '',
      };
      const promiseAbonnementResult: Promise<boolean> = Promise.resolve(false);
      jest
        .spyOn(abonnementService, 'areAbonnements')
        .mockImplementation(() => promiseAbonnementResult);

      jest.spyOn(service, 'create').mockImplementation(() => {
        throw new HttpException(
          `There needs to be atleast one abonnement`,
          HttpStatus.NOT_FOUND
        );
      });

      await expect(controller.create(input)).rejects.toEqual(
        new HttpException(
          `There needs to be atleast one abonnement`,
          HttpStatus.NOT_FOUND
        )
      );
    });
  });

  describe('update', () => {
    it('should return a UpdateWriteOpResult', async () => {
      const input: UpdateLocationDto = {
        phoneNumber: '',
        eMail: '',
        openingsTime: '',
        closingTime: '',
        hasTrainers: true,
        abonnements: ['1'],
        address: {
          street: '',
          homeNumber: '',
          city: '',
          country: '',
          postalCode: '',
        },
        imgUrl: '',
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
// MongooseModule.forFeature([
//   { name: DbLocation.name, schema: LocationSchema },
// ]),
// MongooseModule.forRoot(''),
