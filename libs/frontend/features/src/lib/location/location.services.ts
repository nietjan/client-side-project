import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { IAbonnement, IAddress, ILocation } from '@client-side/shared/api';

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
        phoneNumber: '06 12345678',
        closingTime: new Date(),
        openingsTime: new Date(),
        eMail: 'email@1.com',
        hasTrainers: true,
        address: new DummyAddresObject(
          'Heuvelring',
          '153',
          '5038 CJ',
          'Tilburg',
          'Netherlands'
        ),
        abonnoments: [
          {
            id: '',
            name: 'Yearly',
            period: 12,
            price: 10.5,
          },
          {
            id: '',
            name: 'Montly',
            period: 1,
            price: 20,
          },
        ],
      },
      {
        id: '2',
        phoneNumber: '06 12345678',
        closingTime: new Date(),
        openingsTime: new Date(),
        eMail: 'email@2.com',
        hasTrainers: true,
        address: new DummyAddresObject(
          'Chasséveld',
          '15',
          '4811 DH',
          'Breda',
          'Netherlands'
        ),
        abonnoments: [
          {
            id: '',
            name: 'Yearly',
            period: 12,
            price: 15,
          },
          {
            id: '',
            name: 'Montly',
            period: 1,
            price: 22.5,
          },
        ],
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

  public removeLocation(id: string | null): boolean {
    if (id == null) return false;

    const arr: any[] = this.locations$.getValue();

    arr.forEach((item, index) => {
      if (item.id == id) {
        arr.splice(index, 1);
      }
    });

    this.locations$.next(arr);
    return true;
  }

  public createLocation(location: ILocation | null): string | null {
    if (location == null) return null;

    location.id = (
      parseInt(this.locations$.value[this.locations$.value.length - 1].id) + 1
    ).toString();

    this.locations$.next([...this.locations$.value, location]);

    return location.id;
  }

  public updateLocation(location: ILocation | null): string | null {
    if (location == null) return null;
    else if (location.id == null) return null;

    //delete
    let succes: boolean = this.removeLocation(location.id);
    if (!succes) return null;

    //add it again
    this.locations$.next([...this.locations$.value, location]);
    return location.id;
  }
}
