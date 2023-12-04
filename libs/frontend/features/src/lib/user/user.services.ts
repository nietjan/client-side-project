import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap, filter } from 'rxjs/operators';
import { ApiResponse, IUser, url } from '@client-side/shared/api';
import { Injectable } from '@angular/core';

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

/**
 *
 *
 */
@Injectable()
export class UserService {
  endpoint = `${url}user`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all items.
   *
   * @options options - optional URL queryparam options
   */
  public allUsers(): Observable<IUser[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http.get<ApiResponse<IUser[]>>(this.endpoint).pipe(
      map((response: any) => response.results as IUser[]),
      tap(console.log),
      catchError(this.handleError)
    );
  }

  /**
   * Get a single item from the service.
   *
   */
  public singleUser(id: string): Observable<IUser> {
    console.log(`read ${this.endpoint}`);

    return this.http.get<ApiResponse<IUser>>(`${this.endpoint}/${id}`).pipe(
      map((response: any) => response.results as IUser),
      tap(console.log),
      catchError(this.handleError)
    );
  }

  public removeUser(id: string | null) {
    console.log(`remove ${this.endpoint}`);

    if (id == null) return;

    this.http.delete<ApiResponse<any>>(`${this.endpoint}/${id}`).subscribe({
      error: (error) => {
        tap(error), catchError(this.handleError);
      },
    });
  }

  public createUser(user: IUser): Observable<IUser> {
    console.log(`create ${this.endpoint}`);

    return this.http.post<ApiResponse<IUser>>(this.endpoint, user).pipe(
      map((response: any) => response.results as IUser),
      tap(console.log),
      catchError(this.handleError)
    );
  }

  public updateUser(user: IUser): Observable<IUser> {
    console.log(`update ${this.endpoint}`);

    let result = this.http
      .put<ApiResponse<IUser>>(`${this.endpoint}/${user._id}`, user)
      .pipe(
        map((response: any) => response.results as IUser),
        tap(console.log),
        catchError(this.handleError)
      );
    result.subscribe((value) => {
      console.log(value);
    });
    return result;
  }

  /**
   * Handle errors.
   */
  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log(`handleError in ${UserService.name}`, error);

    return throwError(() => new Error(error.message));
  }
}
