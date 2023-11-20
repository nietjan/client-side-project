import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AbonnementService {
  endpoint = 'http://localhost:3000/api/location';

  constructor(private readonly http: HttpClient) {}

  // public createAbonnement(location: ILocation[] | null): string | null {
  //   if (location == null) return null;

  //   location.id = (
  //     parseInt(this.locations$.value[this.locations$.value.length - 1].id) + 1
  //   ).toString();

  //   this.locations$.next([...this.locations$.value, location]);
  //   return location.id;
  // }
}
