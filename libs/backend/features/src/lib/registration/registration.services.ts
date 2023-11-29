import { Injectable, NotFoundException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { DeleteResult, ObjectId } from 'mongodb';
import { CreateRegistrationDTO } from '@client-side/backend/dto';
import { IRegistration, ICreateRegistration } from '@client-side/shared/api';
import { DbRegistration } from './registration.schema';
import { UserService } from '../user/user.services';
import { LocationService } from '../location/location.services';
import { AbonnementService } from '../abonnement/abonnement.services';

@Injectable()
export class RegistrationService {
  TAG = 'RegistrationService';

  constructor(
    @InjectModel(DbRegistration.name)
    private RegistrationModel: Model<DbRegistration>,
    private userService: UserService,
    private locationService: LocationService,
    private abonnementService: AbonnementService
  ) {}

  getAll(
    userId?: string | null,
    locationId?: string | null,
    abonnementId?: string | null
  ): Promise<DbRegistration[]> {
    Logger.log('getAll', this.TAG);
    //create query object with correct properties
    var query: any = {};

    if (userId != null) {
      query.userId = userId;
    }

    if (locationId != null) {
      query.locationId = locationId;
    }

    if (abonnementId != null) {
      query.abonnementId = abonnementId;
    }

    return this.RegistrationModel.find(query).exec();
  }

  getOne(
    userId: string,
    locationId: string,
    abonnementId: string
  ): Promise<DbRegistration | null> {
    Logger.log('getOne', this.TAG);

    return this.RegistrationModel.findOne({
      userId: userId,
      locationId: locationId,
      abonnementId: abonnementId,
    }).exec();
  }

  async create(registration: ICreateRegistration): Promise<DbRegistration> {
    Logger.log('create', this.TAG);

    //check if ids are correct, if is null than correct
    const isValid = await this.checkIds(registration);
    if (isValid != null) {
      throw new ReferenceError(isValid);
    }

    //add to db
    const createdRegistration = new this.RegistrationModel({
      registrationDate: new Date(),
      ...registration,
    });
    return createdRegistration.save();
  }

  update(registration: ICreateRegistration): Promise<UpdateWriteOpResult> {
    Logger.log('update', this.TAG);
    return this.RegistrationModel.updateOne(
      {
        userId: new ObjectId(registration.userId),
        locationId: new ObjectId(registration.locationId),
        abonnementId: new ObjectId(registration.abonnementId),
      },
      { $set: registration }
    ).exec();
  }

  delete(registration: ICreateRegistration): Promise<DeleteResult> {
    Logger.log('delete', this.TAG);
    return this.RegistrationModel.deleteOne({
      userId: new ObjectId(registration.userId),
      locationId: new ObjectId(registration.locationId),
      abonnementId: new ObjectId(registration.abonnementId),
    }).exec();
  }

  private async checkIds(
    registration: ICreateRegistration
  ): Promise<string | null> {
    //if user == null than user does not exist
    const user = await this.userService.getOne(registration.userId);
    if (user == null) {
      return 'userId is invalid';
    }

    const location = await this.locationService.getOne(registration.locationId);
    if (location == null) {
      return 'locationId is invalid';
    }

    const abonnement = await this.abonnementService.getOne(
      registration.abonnementId
    );
    if (abonnement == null) {
      return 'abonnementId is invalid';
    }

    return null;
  }
}
