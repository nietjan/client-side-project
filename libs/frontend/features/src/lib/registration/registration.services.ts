import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  tap,
  throwError,
} from 'rxjs';
import {
  ApiResponse,
  IAddress,
  ICreateRegistration,
  ILocation,
  IRegistration,
  url,
} from '@client-side/shared/api';
import { AbonnementService } from '../abonnement/abonnement.services';

@Injectable()
export class RegistrationService {
  endpoint = `${url}registration`;

  constructor(private readonly http: HttpClient) {}

  public getRegistrations(
    userId: string | null,
    locationId: string | null,
    abonnementId: string | null
  ): Observable<IRegistration[] | null> {
    console.log(`list ${this.endpoint}`);

    //setup query
    let query: string = '';
    if (userId != null || userId != undefined) {
      query += `userId=${userId}&`;
    }
    if (locationId != null || locationId != undefined) {
      query += `locationId=${locationId}&`;
    }
    if (abonnementId != null || abonnementId != undefined) {
      query += `abonnementId=${abonnementId}`;
    }

    return this.http
      .get<ApiResponse<IRegistration[]>>(`${this.endpoint}?${query}`)
      .pipe(
        map((response: any) => response.results as IRegistration[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public removeRegistration(
    locationId: string | null,
    abonnementId: string | null
  ) {
    if (locationId == null || abonnementId == null) return;

    this.http
      .delete<ApiResponse<any>>(
        `${this.endpoint}?locationId=${locationId}&abonnementId=${abonnementId}`
      )
      .subscribe({
        error: (error) => {
          tap(error), catchError(this.handleError);
        },
      });
  }

  public createRegistration(
    registration: IRegistration
  ): Observable<ILocation> {
    return this.http
      .post<ApiResponse<IRegistration>>(this.endpoint, registration)
      .pipe(
        map((response: any) => response.results as IRegistration),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public updateLocation(registration: IRegistration): Observable<ILocation> {
    return this.http
      .put<ApiResponse<IRegistration>>(`${this.endpoint}`, registration)
      .pipe(
        map((response: any) => response.results as IRegistration),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log(`handleError in ${RegistrationService.name}`, error);
    return throwError(() => new Error(error.message));
  }
}
