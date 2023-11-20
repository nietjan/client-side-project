import { Id } from './id.type';

// Period and locationId together are primary key
export interface IAbonnement {
  period: number;
  price: number;
}

//must have types
export type ICreateAbonnement = Pick<IAbonnement, 'price' | 'period'>;

export type IUpdateAbonnement = Partial<Omit<IAbonnement, 'period'>>;
export type IUpsertAbonnement = IAbonnement;
