import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap, filter } from 'rxjs/operators';
import { ApiResponse, IUser } from '@client-side/shared/api';
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
  endpoint = 'http://localhost:3000/api/user';
  private users$ = new BehaviorSubject<IUser[]>([]);

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all items.
   *
   * @options options - optional URL queryparam options
   */
  public allUsers(options?: any): Observable<IUser[] | null> {
    // console.log(`list ${this.endpoint}`);

    // return this.http
    //   .get<ApiResponse<IUser[]>>(this.endpoint, {
    //     ...options,
    //     ...httpOptions,
    //   })
    //   .pipe(
    //     map((response: any) => response.results as IUser[]),
    //     tap(console.log),
    //     catchError(this.handleError)
    //   );
    return this.users$;
  }

  /**
   * Get a single item from the service.
   *
   */
  public singleUser(id: string | null, options?: any): Observable<IUser> {
    // console.log(`read ${this.endpoint}`);
    // return this.http
    //   .get<ApiResponse<IUser>>(this.endpoint, {
    //     ...options,
    //     ...httpOptions,
    //   })
    //   .pipe(
    //     tap(console.log),
    //     map((response: any) => response.results as IUser),
    //     catchError(this.handleError)
    //   );
    return this.users$.pipe(
      map((userList) => userList.find((user) => user._id === id))
    ) as Observable<IUser>;
  }

  /**
   * Handle errors.
   */
  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in MealService', error);

    return throwError(() => new Error(error.message));
  }
}
