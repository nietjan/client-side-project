import { Id } from './id.type';
import { IAddress } from './address.interface';
import { ICreateLocation } from './location.interface';

//add role

export interface IUser {
  id: Id;
  name: string;
  dateOfBirith: string;
  sex: string;
  phoneNumber: string;
  eMail: string;
  password: string;
  iban: string;
  address: IAddress;
}

//must have types
export type ICreateUser = Pick<
  IUser,
  | 'name'
  | 'dateOfBirith'
  | 'sex'
  | 'phoneNumber'
  | 'eMail'
  | 'password'
  | 'iban'
  | 'address'
>;

export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;
