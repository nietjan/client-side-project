import { Injectable, NotFoundException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@client-side/backend/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { DbUser } from './user.schema';
import { DeleteResult, ObjectId } from 'mongodb';
import { IUser, IUpdateUser } from '@client-side/shared/api';

@Injectable()
export class UserService {
  TAG = 'UserService';

  constructor(@InjectModel(DbUser.name) private UserModel: Model<DbUser>) {}

  getAll(): Promise<DbUser[]> {
    Logger.log('getAll', this.TAG);
    return this.UserModel.find().exec();
  }

  getOne(id: string): Promise<DbUser | null> {
    Logger.log('getAll', this.TAG);
    var objectId = new ObjectId(id);
    return this.UserModel.findOne({ _id: objectId }).exec();
  }

  create(User: CreateUserDto): Promise<DbUser> {
    Logger.log('create', this.TAG);
    const createdUser = new this.UserModel(User);
    return createdUser.save();
  }

  delete(id: string): Promise<DeleteResult> {
    Logger.log('Delete', this.TAG);
    return this.UserModel.deleteOne({ _id: new ObjectId(id) }).exec();
  }

  update(User: UpdateUserDto, id: string): Promise<UpdateWriteOpResult> {
    return this.UserModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: User }
    ).exec();
  }
}
