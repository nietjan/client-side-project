import { Injectable, NotFoundException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { CreateLocationDto, UpdateLocationDto } from '@client-side/backend/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { DbLocation } from './location.schema';
import { DeleteResult, ObjectId } from 'mongodb';
import { ILocation, IUpdateLocation } from '@client-side/shared/api';

@Injectable()
export class LocationService {
  TAG = 'LocationService';

  constructor(
    @InjectModel(DbLocation.name) private LocationModel: Model<DbLocation>
  ) {}

  getAll(): Promise<DbLocation[]> {
    Logger.log('getAll', this.TAG);
    return this.LocationModel.find().exec();
  }

  getOne(id: string): Promise<DbLocation | null> {
    Logger.log('getAll', this.TAG);
    var objectId = new ObjectId(id);
    return this.LocationModel.findOne({ _id: objectId }).exec();
  }

  create(createLocationDto: CreateLocationDto): Promise<DbLocation> {
    //TODO: Check if abonementId are correct
    Logger.log('create', this.TAG);
    const createdLocation = new this.LocationModel(createLocationDto);
    return createdLocation.save();
  }

  delete(id: string): Promise<DeleteResult> {
    Logger.log('Delete', this.TAG);
    return this.LocationModel.deleteOne({ _id: new ObjectId(id) }).exec();
  }

  update(
    location: UpdateLocationDto,
    id: string
  ): Promise<UpdateWriteOpResult> {
    //TODO: check abonnmentId are correct
    return this.LocationModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: location }
    ).exec();
  }
}
