import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@client-side/backend/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { DbUser } from './user.schema';
import { DeleteResult, ObjectId } from 'mongodb';
import { IUser, IUpdateUser } from '@client-side/shared/api';
import { RegistrationService } from '../registration/registration.services';
import { DbRegistration } from '../registration/registration.schema';

@Injectable()
export class UserService {
  TAG = 'UserService';

  constructor(
    @InjectModel(DbUser.name) private UserModel: Model<DbUser>,
    @InjectModel(DbRegistration.name)
    private RegistrationModel: Model<DbRegistration>
  ) {}

  getAll(): Promise<Object[]> {
    Logger.log('getAll', this.TAG);
    return this.UserModel.find({}, { password: false }).exec();
  }

  getOne(id: string): Promise<Object | null> {
    Logger.log('getAll', this.TAG);
    var objectId = new ObjectId(id);
    return this.UserModel.findOne(
      { _id: objectId },
      { password: false }
    ).exec();
  }

  async create(user: CreateUserDto): Promise<Object> {
    Logger.log('create', this.TAG);

    //check if user already exists
    const alreadyExists = await this.UserModel.findOne({
      eMail: user.eMail,
    }).exec();
    if (alreadyExists != null) {
      throw new ConflictException('User already exist');
    }

    const createdUser = new this.UserModel(user);

    return createdUser
      .save()
      .then((data) => {
        return {
          _id: createdUser.id,
          name: createdUser.name,
          dateOfBirith: createdUser.dateOfBirith,
          sex: createdUser.sex,
          phoneNumber: createdUser.phoneNumber,
          eMail: createdUser.eMail,
          role: createdUser.role,
          address: {
            street: createdUser.address.street,
            homeNumber: createdUser.address.homeNumber,
            city: createdUser.address.city,
            country: createdUser.address.country,
            postalCode: createdUser.address.postalCode,
          },
        };
      })
      .catch((error) => {
        throw new InternalServerErrorException();
      });
  }

  async delete(id: string): Promise<DeleteResult> {
    Logger.log('delete', this.TAG);
    const result = await this.UserModel.deleteOne({
      _id: new ObjectId(id),
    }).exec();

    //also delete registrations if user is deleted
    if (result.deletedCount > 0) {
      this.RegistrationModel.deleteMany({
        userId: new ObjectId(id),
      }).exec();
    }
    return {
      acknowledged: result.acknowledged,
      deletedCount: result.deletedCount,
    };
  }

  update(User: UpdateUserDto, id: string): Promise<UpdateWriteOpResult> {
    Logger.log('update', this.TAG);
    return this.UserModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: User }
    ).exec();
  }
}
