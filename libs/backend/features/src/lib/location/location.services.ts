import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { CreateLocationDto, UpdateLocationDto } from '@client-side/backend/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { DbLocation } from './location.schema';
import { DeleteResult, ObjectId } from 'mongodb';
import { ILocation, IUpdateLocation } from '@client-side/shared/api';
import { AbonnementService } from '../abonnement/abonnement.services';
import { DbAbonnement } from '../abonnement/abonnement.schema';
import { RegistrationService } from '../registration/registration.services';

@Injectable()
export class LocationService {
  TAG = 'LocationService';

  constructor(
    @InjectModel(DbLocation.name) private LocationModel: Model<DbLocation>,
    private abonnementService: AbonnementService,
    private registrationService: RegistrationService
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

  create(location: CreateLocationDto): Promise<DbLocation> {
    //TODO: Check if abonementId are correct
    Logger.log('create', this.TAG);

    //check if there are abonnements
    if (location.abonnements.length == 0) {
      throw new RangeError('There needs to be atleast one abonnement');
    }

    //check if each id exists
    if (!this.abonnementService.areAbonnements(location.abonnements)) {
      throw new TypeError('One or multiple abonnements are found');
    }

    const createdLocation = new this.LocationModel(location);
    return createdLocation.save();
  }

  async delete(id: string): Promise<DeleteResult> {
    Logger.log('Delete', this.TAG);
    const result = await this.LocationModel.deleteOne({
      _id: new ObjectId(id),
    }).exec();

    //also delete registrations if user is deleted
    if (result.deletedCount > 0) {
      this.registrationService.delete(null, id, null);
    }
    return {
      acknowledged: result.acknowledged,
      deletedCount: result.deletedCount,
    };
  }

  update(
    location: UpdateLocationDto,
    id: string
  ): Promise<UpdateWriteOpResult> {
    //check if there are abonnements
    if (location.abonnements.length == 0) {
      throw new RangeError('There needs to be atleast one abonnement');
    }

    //check if each id exists
    if (!this.abonnementService.areAbonnements(location.abonnements)) {
      throw new TypeError('One or multiple abonnements are not found');
    }
    return this.LocationModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: location }
    ).exec();
  }
}
