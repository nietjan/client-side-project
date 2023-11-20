import { Id } from './id.type';

// Period and locationId together are primary key
export interface IAbonnement {
  name: string;
  period: number;
  price: number;
}

//must have types
export type ICreateAbonnement = Pick<IAbonnement, 'name' | 'price' | 'period'>;

export type IUpdateAbonnement = Partial<Omit<IAbonnement, 'name'>>;
export type IUpsertAbonnement = IAbonnement;
