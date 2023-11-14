import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILocation } from '@client-side/shared/api';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IAddress } from '@client-side/shared/api';

class DummyAddresObject implements IAddress {
  street: string;
  homeNumber: string;
  postalCode: string;
  city: string;
  country: string;

  constructor(
    street: string,
    homeNumber: string,
    postalCode: string,
    city: string,
    country: string
  ) {
    this.street = street;
    this.homeNumber = homeNumber;
    this.postalCode = postalCode;
    this.country = country;
    this.city = city;
  }
}

@Injectable()
export class LocationService {
  endpoint = 'http://localhost:3000/api/location';
  private locations$ = new BehaviorSubject<ILocation[]>([]);

  constructor(private readonly http: HttpClient) {
    const newLocations: ILocation[] = [
      {
        id: '1',
        phoneNumber: '0000000000',
        closingTime: new Date(),
        openingsTime: new Date(),
        eMail: 'email@email.com',
        hasTrainers: true,
        address: new DummyAddresObject('sss', '1D', 'Postal', 'city', 'NL'),
      },
      {
        id: '2',
        phoneNumber: 'sdfdfdsdf',
        closingTime: new Date(),
        openingsTime: new Date(),
        eMail: 'email@email2.com',
        hasTrainers: true,
        address: new DummyAddresObject('aaaa', '2D', 'Postal', 'city', 'NL'),
      },
    ];

    this.locations$.next([...this.locations$.value, ...newLocations]);
  }

  /**
   * Get all items.
   *
   * @options options - optional URL queryparam options
   */
  public allLocations(options?: any): Observable<ILocation[] | null> {
    // console.log(`list ${this.endpoint}`);

    // return this.http
    //   .get<ApiResponse<ILocation[]>>(this.endpoint, {
    //     ...options,
    //     ...httpOptions,
    //   })
    //   .pipe(
    //     map((response: any) => response.results as ILocation[]),
    //     tap(console.log),
    //     catchError(this.handleError)
    //   );
    return this.locations$;
  }

  public singleLocation(
    id: string | null,
    options?: any
  ): Observable<ILocation> {
    // console.log(`read ${this.endpoint}`);
    // return this.http
    //   .get<ApiResponse<ILocation>>(this.endpoint, {
    //     ...options,
    //     ...httpOptions,
    //   })
    //   .pipe(
    //     tap(console.log),
    //     map((response: any) => response.results as ILocation),
    //     catchError(this.handleError)
    //   );
    return this.locations$.pipe(
      map((locationList) => locationList.find((location) => location.id == id))
    ) as Observable<ILocation>;
  }
}
