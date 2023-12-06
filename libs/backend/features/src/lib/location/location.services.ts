import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
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
import { DbRegistration } from '../registration/registration.schema';
import { Neo4jService } from 'nest-neo4j';
import { NotFoundError } from 'rxjs';

@Injectable()
export class LocationService {
  TAG = 'LocationService';

  constructor(
    @InjectModel(DbLocation.name) private LocationModel: Model<DbLocation>,
    private abonnementService: AbonnementService,
    @InjectModel(DbRegistration.name)
    private RegistrationModel: Model<DbRegistration>,
    private readonly neo4jService: Neo4jService
  ) {}

  getAll(): Promise<DbLocation[]> {
    Logger.log('getAll', this.TAG);
    return this.LocationModel.find().exec();
  }

  getOne(id: string): Promise<DbLocation | null> {
    Logger.log('getOne', this.TAG);
    var objectId = new ObjectId(id);
    return this.LocationModel.findOne({ _id: objectId }).exec();
  }

  async getFavoriteAbonnement(
    locationId: string,
    abonnementIds: string[]
  ): Promise<DbAbonnement | null> {
    let favorite: string | null = null;
    let favoriteCount: number = 0;

    //loop over all abonnements and check wich has the most registrations
    for (const index in abonnementIds) {
      //get amount
      const query = `MATCH(location: Location)-[:hasRegistration]->(registration:Registration)<-[:hasRegistration]-(abonnement:Abonnement) WHERE location._id = '${locationId}' AND abonnement._id='${abonnementIds[index]}' return count(registration)`;
      const res = await this.neo4jService.read(query);
      let amount = res.records[0].get('count(registration)') as number;

      if (amount > favoriteCount || favoriteCount == 0) {
        favoriteCount = amount;
        favorite = abonnementIds[index];
      }
    }

    //get abonnement of the gatherd id
    if (favorite == null) {
      return null;
    }

    let favoriteAbonnement = await this.abonnementService.getOne(favorite);

    if (favoriteAbonnement == null) {
      return null;
    }

    return favoriteAbonnement;
  }

  async create(location: CreateLocationDto): Promise<DbLocation> {
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
    const result = await createdLocation.save();

    //neo4j
    const query = `CREATE(:Location{_id: '${result._id}'})`;
    await this.neo4jService.write(query);

    return result;
  }

  async delete(id: string): Promise<DeleteResult> {
    Logger.log('Delete', this.TAG);
    const result = await this.LocationModel.deleteOne({
      _id: new ObjectId(id),
    }).exec();

    //also delete registrations if location is deleted
    if (result.deletedCount > 0) {
      this.RegistrationModel.deleteMany({
        locationId: new ObjectId(id),
      }).exec();
    }

    //neo4j --> Delete location with relation to abonnement and registration. Also delete registrations with relation to this location and their relations
    const query = `MATCH (location:Location {_id:'${id}'}) OPTIONAL MATCH (location)-[locationAbonnement]-() OPTIONAL MATCH (location)-[locationRegistration:hasRegistration]-(registration:Registration)-[registrationAbonnement]-()  DELETE location,locationAbonnement,locationRegistration,registration,registrationAbonnement`;
    await this.neo4jService.write(query);

    return {
      acknowledged: result.acknowledged,
      deletedCount: result.deletedCount,
    };
  }

  async update(
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

    const locationFromDb = await this.LocationModel.findOne({
      _id: new ObjectId(id),
    });

    const result = await this.LocationModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: location }
    ).exec();

    return result;
  }
}
