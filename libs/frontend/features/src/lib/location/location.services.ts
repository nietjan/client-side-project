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
    const current = new Date();
    const newLocations: ILocation[] = [
      {
        id: '1',
        phoneNumber: '0612345678',
        closingTime: new Date(
          `${current.getFullYear()}-${
            current.getMonth() + 1
          }-${current.getDate()} 19:41`
        ),
        openingsTime: new Date(
          `${current.getFullYear()}-${
            current.getMonth() + 1
          }-${current.getDate()} 12:41`
        ),
        eMail: 'email@1.com',
        hasTrainers: true,
        address: new DummyAddresObject(
          'Heuvelring',
          '153',
          '5038 CJ',
          'Tilburg',
          'Netherlands'
        ),
        abonnements: ['1', '2'],
      },
      {
        id: '2',
        phoneNumber: '0612345678',
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
        abonnements: ['3', '4'],
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

    let id = 1;
    this.locations$.subscribe((i) =>
      i.forEach((value) => {
        if (parseInt(value.id) > id) id = parseInt(value.id);
      })
    );

    location.id = (id + 1).toString();

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
