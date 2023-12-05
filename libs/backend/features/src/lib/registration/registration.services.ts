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
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class RegistrationService {
  TAG = 'RegistrationService';

  constructor(
    @InjectModel(DbRegistration.name)
    private RegistrationModel: Model<DbRegistration>,
    private locationService: LocationService,
    private abonnementService: AbonnementService,
    private readonly neo4jService: Neo4jService
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
    const result = await createdRegistration.save();

    //Neo4J - creating registration
    let query = `Create(registration:Registration{userId: '${userId}', locationId: '${registration.locationId}', abonnementId: '${registration.abonnementId}'}) `;
    //creating relation registration - abonnement
    query += `MATCH(abonnement:Abonnement) WHERE abonnement._id = '${registration.abonnementId}}' CREATE (abonnement)-[:hasRegistration]->(registration)`;
    //creating relation registration - location
    query += `MATCH(location:Location) WHERE location._id = '${registration.locationId}' CREATE (location)-[:hasRegistration]->(registration) return location, abonnement, registration`;

    await this.neo4jService.write(query);

    return result;
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

  async delete(
    userId: string | null,
    locationId: string | null,
    abonnementId: string | null
  ): Promise<DeleteResult> {
    Logger.log('delete', this.TAG);

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

    const result = await this.RegistrationModel.deleteOne(query).exec();

    //neo4j
    const neo4JQuery = `MATCH (registration:Registration {userId: '${userId}', locationId: '${locationId}', abonnementId: '${abonnementId}'}) OPTIONAL MATCH (registration)-[r]-() DELETE registration,r`;
    await this.neo4jService.write(neo4JQuery);

    return result;
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
