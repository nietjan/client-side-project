import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from './location.services';
import { DbLocation, LocationSchema } from './location.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection, connect, Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import exp = require('constants');
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateLocationDto } from '@client-side/backend/dto';

describe('LocationController', () => {
  let controller: LocationController;
  let service: LocationService;
  let mongod: MongoMemoryServer;
  // let mongoConnection: Connection;
  // let articleModel: Model<DbLocation>;

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
        ]),
        MongooseModule.forRoot(uri),
      ],
    }).compile();

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

  afterAll(async () => {
    await mongod.stop();
  });
});
// MongooseModule.forFeature([
//   { name: DbLocation.name, schema: LocationSchema },
// ]),
// MongooseModule.forRoot(''),
