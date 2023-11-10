export interface IAddress {
  street: string;
  homeNumber: string;
  postalCode: string;
  city: string;
  country: string;
}

//must have types
export type ICreateAddress = Pick<
  IAddress,
  'street' | 'homeNumber' | 'city' | 'country' | 'postalCode'
>;

export type IUpdateAddress = Partial<
  Omit<IAddress, 'street' | 'homeNumber' | 'city' | 'country' | 'postalCode'>
>;
export type IUpsertAddress = IAddress;
