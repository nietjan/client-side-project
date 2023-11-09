import { Injectable, NotFoundException } from '@nestjs/common';
import { ILocation } from '@client-side/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { CreateLocationDto } from '@client-side/backend/dto';

@Injectable()
export class MealService {
  TAG = 'MealService';

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

  getAll(): ILocation[] {
    Logger.log('getAll', this.TAG);
    return this.locations$.value;
  }

  getOne(id: string): ILocation {
    Logger.log(`getOne(${id})`, this.TAG);
    const meal = this.locations$.value.find((td) => td.id === id);
    if (!meal) {
      throw new NotFoundException(`Meal could not be found!`);
    }
    return meal;
  }

  /**
   * Update the arg signature to match the DTO, but keep the
   * return signature - we still want to respond with the complete
   * object
   */
  create(meal: CreateLocationDto) {
    Logger.log('create', this.TAG);
    const current = this.locations$.value;
    // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
    const newLocation: ILocation = {
      id: '',
      ...meal,
    };
    this.locations$.next([...current, newLocation]);
    return newLocation;
  }
}
