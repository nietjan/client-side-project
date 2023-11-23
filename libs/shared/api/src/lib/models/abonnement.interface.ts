import { Id } from './id.type';

// Period and locationId together are primary key
export interface IAbonnement {
  id: Id;
  name: string;
  period: number;
  price: number;
}

//TODO: abonnoment aanpassen, of alles engels of alles nederlands

//must have types
export type ICreateAbonnement = Pick<IAbonnement, 'name' | 'price' | 'period'>;

export type IUpdateAbonnement = Partial<Omit<IAbonnement, 'id'>>;
export type IUpsertAbonnement = IAbonnement;
