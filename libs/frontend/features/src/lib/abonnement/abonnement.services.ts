import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApiResponse,
  IAbonnement,
  ILocation,
  url,
} from '@client-side/shared/api';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  tap,
  throwError,
} from 'rxjs';

@Injectable()
export class AbonnementService {
  endpoint = `${url}abonnement`;

  constructor(private readonly http: HttpClient) {}

  public allAbonnements(): Observable<IAbonnement[]> {
    console.log(`list ${this.endpoint}`);

    return this.http.get<ApiResponse<IAbonnement[]>>(this.endpoint).pipe(
      map((response: any) => response.results as IAbonnement[]),
      tap(console.log),
      catchError(this.handleError)
    );
  }

  //TODO: string array veranderen weer naar any bij options
  public allAbonnementsFromLocation(
    locationId?: string
  ): Observable<IAbonnement[] | null> {
    return this.http
      .get<ApiResponse<IAbonnement[]>>(
        `${url}location/${locationId}/abonnement`
      )
      .pipe(
        map((response: any) => response.results as IAbonnement[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public singleAbonnoment(id: string | null): Observable<IAbonnement> {
    return this.http
      .get<ApiResponse<IAbonnement>>(`${this.endpoint}/${id}`)
      .pipe(
        map((response: any) => response.results as IAbonnement),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public removeAbonnement(id: string | null) {
    if (id == null) return;

    this.http.delete<ApiResponse<any>>(`${this.endpoint}/${id}`).subscribe({
      error: (error) => {
        tap(error), catchError(this.handleError);
      },
    });
  }

  public createAbonnement(abonnement: IAbonnement): Observable<IAbonnement> {
    return this.http
      .post<ApiResponse<IAbonnement>>(this.endpoint, abonnement)
      .pipe(
        map((response: any) => response.results as IAbonnement),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public updateAbonnement(abonnement: IAbonnement): Observable<IAbonnement> {
    return this.http
      .put<ApiResponse<IAbonnement>>(
        `${this.endpoint}/${abonnement._id}`,
        abonnement
      )
      .pipe(
        map((response: any) => response.results as IAbonnement),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log(`handleError in ${AbonnementService.name}`, error);
    return throwError(() => new Error(error.message));
  }
}
