import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAbonnement, ILocation } from '@client-side/shared/api';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

@Injectable()
export class AbonnementService {
  endpoint = 'http://localhost:3000/api/location';
  private abonnements$ = new BehaviorSubject<IAbonnement[]>([]);
  //TODO: extra array erbij dat ervoor zorgt dat de goede worden gepakt, alleen voor dit inlever moment

  constructor(private readonly http: HttpClient) {}

  public allAbonnements(options?: any): Observable<IAbonnement[] | null> {
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
    return this.abonnements$;
  }

  public allAbonnementsFromLocation(
    options?: any,
    locationId?: string
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
    return this.abonnements$;
  }

  public singleAbonnoment(
    id: string | null,
    options?: any
  ): Observable<IAbonnement> {
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
    return this.abonnements$.pipe(
      map((abonnementList) =>
        abonnementList.find((abonnemnt) => abonnemnt.id == id)
      )
    ) as Observable<IAbonnement>;
  }

  public removeAbonnement(id: string | null): boolean {
    if (id == null) return false;

    const arr: any[] = this.abonnements$.getValue();

    arr.forEach((item, index) => {
      if (item.id == id) {
        arr.splice(index, 1);
      }
    });

    this.abonnements$.next(arr);
    return true;
  }

  public createAbonnement(abonnement: IAbonnement | null): string | null {
    if (abonnement == null) return null;

    abonnement.id = (
      parseInt(this.abonnements$.value[this.abonnements$.value.length - 1].id) +
      1
    ).toString();

    this.abonnements$.next([...this.abonnements$.value, abonnement]);

    return abonnement.id;
  }

  public updateAbonnement(abonnement: IAbonnement | null): string | null {
    if (abonnement == null) return null;
    else if (abonnement.id == null) return null;

    //delete
    let succes: boolean = this.removeAbonnement(abonnement.id);
    if (!succes) return null;

    //add it again
    this.abonnements$.next([...this.abonnements$.value, abonnement]);
    return abonnement.id;
  }
}
