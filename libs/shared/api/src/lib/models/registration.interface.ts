export interface IRegistration {
  userId: string;
  locationId: string;
  abonnementId: string;
  registrationDate: Date;
}

export type ICreateRegistration = Pick<
  IRegistration,
  'userId' | 'locationId' | 'abonnementId'
>;
