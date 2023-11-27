import { Injectable, NotFoundException } from '@nestjs/common';
import { ILocation } from '@client-side/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { CreateLocationDto } from '@client-side/backend/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbLocation } from './location.schema';

@Injectable()
export class LocationService {
  TAG = 'LocationService';

  constructor(
    @InjectModel(DbLocation.name) private LocationModel: Model<DbLocation>
  ) {}

  private locations$ = new BehaviorSubject<ILocation[]>([
    // {
    //   id: '0',
    //   title: 'Spaghetti con funghi',
    //   description: 'Vega version of the famous spaghetti recipe.',
    //   isVega: true,
    //   dateServed: new Date(),
    //   cook: 'cook',
    //   sort: MealSort.Breakfast,
    // },
  ]);

  getAll(): Promise<DbLocation[]> {
    Logger.log('getAll', this.TAG);
    return this.LocationModel.find().exec();
    // return this.locations$.value;
  }

  //TODO: implement
  // getOne(id: string): ILocation {
  //   Logger.log(`getOne(${id})`, this.TAG);
  //   const location = this.locations$.value.find((td) => td.id. === id.toString());
  //   if (!location) {
  //     throw new NotFoundException(`Location could not be found!`);
  //   }
  //   return location;
  // }

  /**
   * Update the arg signature to match the DTO, but keep the
   * return signature - we still want to respond with the complete
   * object
   */
  create(createLocationDto: CreateLocationDto): Promise<DbLocation> {
    Logger.log('create', this.TAG);
    const createdLocation = new this.LocationModel(createLocationDto);
    return createdLocation.save();
    // const current = this.locations$.value;
    // // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
    // const newLocation: ILocation = {
    //   ...location,
    //   id: '',
    // };
    // this.locations$.next([...current, newLocation]);
    // return newLocation;
  }
}
