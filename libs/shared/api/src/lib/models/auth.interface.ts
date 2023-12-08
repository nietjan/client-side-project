import { ROLE } from './role.interface';

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
  role: ROLE;
}

export interface IToken {
  token: string;
}

// export const url = 'http://localhost:3000/api/';
export const url = 'client-side2-2api.azurewebsites.net/api';
