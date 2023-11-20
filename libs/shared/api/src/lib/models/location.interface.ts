import { Id } from './id.type';
import { IAddress } from './address.interface';
import { IAbonnement } from './abonnement.interface';

export interface ILocation {
  id: Id;
  phoneNumber: string;
  eMail: string;
  openingsTime: Date;
  closingTime: Date;
  hasTrainers: boolean;
  address: IAddress;
  abonnoments: IAbonnement[];
}

//must have types
export type ICreateLocation = Pick<
  ILocation,
  | 'phoneNumber'
  | 'eMail'
  | 'hasTrainers'
  | 'address'
  | 'openingsTime'
  | 'closingTime'
  | 'abonnoments'
>;

export type IUpdateLocation = Partial<Omit<ILocation, 'id'>>;
export type IUpsertLocation = ILocation;
