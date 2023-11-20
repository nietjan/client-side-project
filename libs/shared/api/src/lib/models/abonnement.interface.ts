import { Id } from './id.type';

// Period and locationId together are primary key
export interface IAbonnement {
  locationId: Id;
  period: number;
  price: number;
}

//must have types
export type ICreateAbonnement = Pick<
  IAbonnement,
  'locationId' | 'price' | 'period'
>;

export type IUpdateAbonnement = Partial<
  Omit<IAbonnement, 'locationId' | 'period'>
>;
export type IUpsertAbonnement = IAbonnement;
