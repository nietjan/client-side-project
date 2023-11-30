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

  get(
    userId?: string | null,
    locationId?: string | null,
    abonnementId?: string | null
  ): Promise<DbRegistration[]> {
    Logger.log('getAll', this.TAG);
    //create query object with correct properties
    var query: any = {};

    if (userId != null && userId != undefined) {
      query.userId = userId;
    }

    if (locationId != null && userId != undefined) {
      query.locationId = locationId;
    }

    if (abonnementId != null && userId != undefined) {
      query.abonnementId = abonnementId;
    }

    return this.RegistrationModel.find(query).exec();
  }

  async create(
    registration: ICreateRegistration,
    userId: string
  ): Promise<DbRegistration> {
    Logger.log('create', this.TAG);

    //check if ids are correct, if is null than correct
    const isValid = await this.checkIds(registration);
    if (isValid != null) {
      throw new ReferenceError(isValid);
    }

    //add to db
    const createdRegistration = new this.RegistrationModel({
      ...registration,
      registrationDate: new Date(),
      userId: userId,
    });
    return createdRegistration.save();
  }

  update(
    registration: ICreateRegistration,
    userId: string
  ): Promise<UpdateWriteOpResult> {
    Logger.log('update', this.TAG);
    return this.RegistrationModel.updateOne(
      {
        userId: new ObjectId(userId),
        locationId: new ObjectId(registration.locationId),
        abonnementId: new ObjectId(registration.abonnementId),
      },
      { $set: registration }
    ).exec();
  }

  delete(
    registration: ICreateRegistration,
    userId: string
  ): Promise<DeleteResult> {
    Logger.log('delete', this.TAG);
    return this.RegistrationModel.deleteOne({
      userId: new ObjectId(userId),
      locationId: new ObjectId(registration.locationId),
      abonnementId: new ObjectId(registration.abonnementId),
    }).exec();
  }

  private async checkIds(
    registration: ICreateRegistration
  ): Promise<string | null> {
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
