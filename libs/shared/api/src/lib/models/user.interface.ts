import { Id } from './id.type';
import { IAddress } from './address.interface';
import { ICreateLocation } from './location.interface';
import { ROLE } from './role.interface';

export interface IUser {
  _id: Id;
  name: string;
  dateOfBirith: string;
  sex: string;
  phoneNumber: string;
  eMail: string;
  password: string;
  role: ROLE;
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
  | 'role'
>;

export type IUpdateUser = Partial<Omit<IUser, '_id'>>;
export type IUpsertUser = IUser;
