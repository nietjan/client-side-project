import { IAbonnement } from './abonnement.interface';
import { ILocation } from './location.interface';
import { IUser } from './user.interface';

export interface IRegistration {
  userId: string;
  locationId: string;
  abonnementId: string;
  registrationDate: Date;
}

export type ICreateRegistration = Pick<
  IRegistration,
  'locationId' | 'abonnementId'
>;

export interface IRegistrationInfo {
  registration: IRegistration;
  user: { name: string; _id: string } | null;
  location: {
    _id: string;
    street: string;
    homeNumber: string;
    postalCode: string;
    city: string;
  } | null;
  abonnement: { name: string; _id: string } | null;
}
