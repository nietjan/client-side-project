export interface IRegistration {
  userId: string;
  locationId: string;
  abonnementID: string;
  registrationDate: Date;
}

export type ICreateRegistration = Pick<
  IRegistration,
  'userId' | 'locationId' | 'abonnementID'
>;
