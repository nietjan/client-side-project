import { role } from './user.interface';

/**
 * User information required for loggin in
 */
export interface IUserCredentials {
  eMail: string;
  password: string;
}

export interface ILoginReturnInfo extends IToken {
  _id: string;
  name: string;
  eMail: string;
  role: role;
}

export interface IToken {
  token: string;
}

export const url = 'http://localhost:3000/api/';
