import { Id } from './id.type';
import { IAddress } from './address.interface';
import { IAbonnement } from './abonnement.interface';

export interface ILocation {
  [x: string]: any;
  id: Id;
  phoneNumber: string;
  eMail: string;
  openingsTime: string;
  closingTime: string;
  hasTrainers: boolean;
  address: IAddress;
  abonnements: string[];
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
  | 'abonnements'
>;

export type IUpdateLocation = Partial<Omit<ILocation, 'id'>>;
export type IUpsertLocation = ILocation;
