import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAbonnement, ILocation, url } from '@client-side/shared/api';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

@Injectable()
export class AbonnementService {
  endpoint = `${url}location`;
  private abonnements$ = new BehaviorSubject<IAbonnement[]>([]);

  constructor(private readonly http: HttpClient) {
    const newAbbonees: IAbonnement[] = [
      {
        id: '1',
        name: 'Yearly',
        period: 12,
        price: 10.5,
      },
      {
        id: '2',
        name: 'Montly',
        period: 1,
        price: 20,
      },
      {
        id: '3',
        name: 'Yearly',
        period: 12,
        price: 15,
      },
      {
        id: '4',
        name: 'Montly',
        period: 1,
        price: 22.5,
      },
    ];

    this.abonnements$.next([...this.abonnements$.value, ...newAbbonees]);
  }

  public allAbonnements(_options?: any): Observable<IAbonnement[] | null> {
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

  //TODO: string array veranderen weer naar any bij options
  public allAbonnementsFromLocation(
    options?: string[],
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
    let abonnees: IAbonnement[] = [];
    options?.forEach((id) => {
      this.singleAbonnoment(id).subscribe((object) => abonnees.push(object));
    });
    return of(abonnees);
  }

  public singleAbonnoment(
    id: string | null,
    _options?: any
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

    let id = 1;
    this.abonnements$.subscribe((i) =>
      i.forEach((value) => {
        if (parseInt(value.id) > id) id = parseInt(value.id);
      })
    );

    abonnement.id = (id + 1).toString();

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
