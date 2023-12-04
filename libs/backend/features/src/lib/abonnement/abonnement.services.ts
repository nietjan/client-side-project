import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import {
  CreateAbonnementDto,
  UpdateAbonnementDto,
} from '@client-side/backend/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { DbAbonnement } from './abonnement.schema';
import { DeleteResult, ObjectId } from 'mongodb';
import { IAbonnement } from '@client-side/shared/api';
import { RegistrationService } from '../registration/registration.services';

@Injectable()
export class AbonnementService {
  TAG = 'AbonnementService';

  constructor(
    @InjectModel(DbAbonnement.name)
    private AbonnementModel: Model<DbAbonnement>,
    private registrationService: RegistrationService
  ) {}

  getAll(): Promise<DbAbonnement[]> {
    Logger.log('getAll', this.TAG);
    return this.AbonnementModel.find().exec();
  }

  getOne(id: string): Promise<DbAbonnement | null> {
    Logger.log('getAll', this.TAG);
    var objectId = new ObjectId(id);
    return this.AbonnementModel.findOne({ _id: objectId }).exec();
  }

  getAllFromArray(ids: string[]): Promise<DbAbonnement[]> {
    Logger.log('getAllFromLocation', this.TAG);

    //create array of objectIds
    let objectIds: ObjectId[] = [];
    ids.forEach(function (item) {
      objectIds.push(new ObjectId(item));
    });

    //find
    try {
      return this.AbonnementModel.find({ _id: { $in: objectIds } }).exec();
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  create(createAbonnementDto: CreateAbonnementDto): Promise<DbAbonnement> {
    Logger.log('create', this.TAG);
    const createdAbonnement = new this.AbonnementModel(createAbonnementDto);
    return createdAbonnement.save();
  }

  async delete(id: string): Promise<DeleteResult> {
    Logger.log('Delete', this.TAG);
    let result = await this.AbonnementModel.deleteOne({
      _id: new ObjectId(id),
    }).exec();

    //also delete registrations if user is deleted
    if (result.deletedCount > 0) {
      this.registrationService.delete(null, null, id);
    }
    return {
      acknowledged: result.acknowledged,
      deletedCount: result.deletedCount,
    };
  }

  update(
    Abonnement: UpdateAbonnementDto,
    id: string
  ): Promise<UpdateWriteOpResult> {
    return this.AbonnementModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: Abonnement }
    ).exec();
  }

  async areAbonnements(abonnementIds: string[]): Promise<boolean> {
    abonnementIds.forEach(async (abonnementId) => {
      let count: number = await this.AbonnementModel.countDocuments({
        $group: { _id: new ObjectId(abonnementId) },
      }).exec();
      if (count == 0) {
        return false;
      }
    });
    return true;
  }
}
