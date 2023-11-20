import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAbonnement } from '@client-side/shared/api';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable()
export class AbonnementService {
  endpoint = 'http://localhost:3000/api/location';

  private abonnements$ = new BehaviorSubject<IAbonnement[]>([]);

  constructor(private readonly http: HttpClient) {}

  public allLocations(
    locationId: string | null,
    options?: any
  ): Observable<IAbonnement[] | null> {
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
    return this.abonnements$.pipe(
      map((abonnementList) =>
        abonnementList.filter(
          (abonnement) => abonnement.locationId == locationId
        )
      )
    );
  }

  public createAbonnement(abonomentArr: IAbonnement[] | null): boolean {
    if (abonomentArr == null) return false;

    this.abonnements$.next([...this.abonnements$.value, ...abonomentArr]);

    return true;
  }

  public removeAbonnement(
    locationId: string | null,
    period: number | null
  ): boolean {
    if (locationId == null || period == null) return false;

    const arr: any[] = this.abonnements$.getValue();

    arr.forEach((item, index) => {
      if (item.id == locationId && item.period == period) {
        arr.splice(index, 1);
      }
    });

    this.abonnements$.next(arr);
    return true;
  }

  public updateAbonnement(abonnement: IAbonnement | null): boolean {
    if (abonnement?.locationId == null || abonnement?.period == null)
      return false;

    //delete
    let succes: boolean = this.removeAbonnement(
      abonnement.locationId,
      abonnement.period
    );
    if (!succes) return false;

    //add it again
    this.abonnements$.next([...this.abonnements$.value, abonnement]);
    return true;
  }
}
