import { Injectable, NotFoundException } from '@nestjs/common';
import { ILocation } from '@client-side/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { CreateLocationDto } from '@client-side/backend/dto';

@Injectable()
export class UserService {
  TAG = 'LocationService';

  private users$ = new BehaviorSubject<ILocation[]>([]);

  getAll(): ILocation[] {
    Logger.log('getAll', this.TAG);
    return this.users$.value;
  }

  getOne(id: string): ILocation {
    Logger.log(`getOne(${id})`, this.TAG);
    const user = this.users$.value.find((td) => td.id === id);
    if (!user) {
      throw new NotFoundException(`User could not be found!`);
    }
    return user;
  }

  /**
   * Update the arg signature to match the DTO, but keep the
   * return signature - we still want to respond with the complete
   * object
   */
  create(user: CreateLocationDto) {
    Logger.log('create', this.TAG);
    const current = this.users$.value;
    // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
    const newUser: ILocation = {
      ...user,
      id: '',
    };
    this.users$.next([...current, newUser]);
    return newUser;
  }
}
