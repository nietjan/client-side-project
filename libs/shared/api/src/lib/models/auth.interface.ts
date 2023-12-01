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
}

export interface IToken {
  token: string;
}

export const url = 'http://localhost:3000/api/';
