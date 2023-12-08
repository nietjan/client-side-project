import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './User.controller';
import { UserService } from './user.services';
import { DbUser, UserSchema } from './user.schema';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { UpdateWriteOpResult } from 'mongoose';
import { DeleteResult } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import exp = require('constants');
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@client-side/backend/dto';
import { ROLE } from '@client-side/shared/api';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import {
  DbRegistration,
  RegistrationSchema,
} from '../registration/registration.schema';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [
        MongooseModule.forFeature([
          { name: DbUser.name, schema: UserSchema },
          { name: DbRegistration.name, schema: RegistrationSchema },
        ]),
        MongooseModule.forRoot(uri),
        JwtModule,
        AuthModule,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
  });

  describe('getAll', () => {
    it('should return an array of locations', async () => {
      const result: DbUser[] = [
        {
          name: '',
          dateOfBirith: '',
          sex: '',
          phoneNumber: '',
          eMail: '',
          password: '',
          iban: '',
          role: ROLE.USER,
          address: {
            street: '',
            postalCode: '',
            city: '',
            country: '',
            homeNumber: '',
          },
        },
      ];
      const promiseResult: Promise<DbUser[]> = Promise.resolve(result);

      jest.spyOn(service, 'getAll').mockImplementation(() => promiseResult);

      let returnData: Object[] = [];
      await controller.getAll().then((data) => (returnData = data));
      expect(returnData).toBe(result);
      expect(returnData.length).toBe(1);
    });

    it('should return an empty array of locations when there are no locations', async () => {
      const result: DbUser[] = [];
      const promiseResult: Promise<DbUser[]> = Promise.resolve(result);

      jest.spyOn(service, 'getAll').mockImplementation(() => promiseResult);

      let returnData: Object[] = [];
      await controller.getAll().then((data) => (returnData = data));
      expect(returnData).toBe(result);
      expect(returnData.length).toBe(0);
    });
  });

  describe('getOne', () => {
    it('should return a location', async () => {
      const result: DbUser = {
        name: '',
        dateOfBirith: '',
        sex: '',
        phoneNumber: '',
        eMail: '',
        password: '',
        role: ROLE.USER,
        iban: '',
        address: {
          street: '',
          postalCode: '',
          city: '',
          country: '',
          homeNumber: '',
        },
      };

      const promiseResult: Promise<DbUser> = Promise.resolve(result);

      jest.spyOn(service, 'getOne').mockImplementation(() => promiseResult);

      let returnData: Object | null = null;
      await controller.getOne('').then((data) => (returnData = data));
      expect(returnData).toBe(result);
    });

    it('Should throw not found exception when location equals null', async () => {
      const result: DbUser[] = [];
      const promiseResult: Promise<DbUser | null> = Promise.resolve(null);

      jest.spyOn(service, 'getOne').mockImplementation(() => promiseResult);

      await expect(controller.getOne('1')).rejects.toEqual(
        new HttpException(`Not found`, HttpStatus.NOT_FOUND)
      );
    });
  });

  describe('create', () => {
    it('should return a location', async () => {
      const result: CreateUserDto = {
        name: '',
        dateOfBirith: '',
        sex: '',
        phoneNumber: '',
        eMail: '',
        password: '',
        iban: '',
        role: ROLE.USER,
        address: {
          street: '',
          postalCode: '',
          city: '',
          country: '',
          homeNumber: '',
        },
      };

      const promiseResult: Promise<DbUser> = Promise.resolve(result);

      jest.spyOn(service, 'create').mockImplementation(() => promiseResult);

      let returnData: Object | null = null;
      await controller.create(result).then((data) => (returnData = data));
      expect(returnData).toBe(result);
    });
  });

  describe('update', () => {
    it('should return a UpdateWriteOpResult', async () => {
      const input: UpdateUserDto = {
        name: '',
        dateOfBirith: '',
        sex: '',
        phoneNumber: '',
        eMail: '',
        iban: '',
        role: ROLE.USER,
        address: {
          street: '',
          postalCode: '',
          city: '',
          country: '',
          homeNumber: '',
        },
      };

      const output: UpdateWriteOpResult = {
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
      await controller
        .Update('1', input, { user: { user_id: '1' } })
        .then((data) => (returnData = data));
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
      await controller
        .delete('1', { user: { user_id: '1' } })
        .then((data) => (returnData = data));
      expect(returnData).toBe(output);
    });
  });

  afterAll(async () => {
    await mongod.stop();
  });
});
