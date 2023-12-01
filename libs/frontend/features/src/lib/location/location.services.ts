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
import { ApiResponse, IAddress, ILocation, url } from '@client-side/shared/api';
import { AbonnementService } from '../abonnement/abonnement.services';

@Injectable()
export class LocationService {
  endpoint = `${url}location`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all items.
   *
   * @options options - optional URL queryparam options
   */
  public allLocations(): Observable<ILocation[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http.get<ApiResponse<ILocation[]>>(this.endpoint).pipe(
      map((response: any) => response.results as ILocation[]),
      tap(console.log),
      catchError(this.handleError)
    );
  }

  public singleLocation(id: string): Observable<ILocation> {
    return this.http.get<ApiResponse<ILocation>>(`${this.endpoint}/${id}`).pipe(
      map((response: any) => response.results as ILocation),
      tap(console.log),
      catchError(this.handleError)
    );
  }

  public removeLocation(id: string | null) {
    if (id == null) return;

    this.http.delete<ApiResponse<any>>(`${this.endpoint}/${id}`).subscribe({
      error: (error) => {
        tap(error), catchError(this.handleError);
      },
    });
  }

  public createLocation(location: ILocation): Observable<ILocation> {
    return this.http.post<ApiResponse<ILocation>>(this.endpoint, location).pipe(
      map((response: any) => response.results as ILocation),
      tap(console.log),
      catchError(this.handleError)
    );
  }

  public updateLocation(location: ILocation): Observable<ILocation> {
    return this.http
      .put<ApiResponse<ILocation>>(`${this.endpoint}/${location._id}`, location)
      .pipe(
        map((response: any) => response.results as ILocation),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log(`handleError in ${AbonnementService.name}`, error);
    return throwError(() => new Error(error.message));
  }
}
