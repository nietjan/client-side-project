import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, catchError, Observable, throwError } from 'rxjs';
import {
  ILoginReturnInfo,
  ApiResponse,
  IUserCredentials,
  url,
} from '@client-side/shared/api';

export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable()
export class UiService {
  constructor(private readonly http: HttpClient) {}

  login(body: IUserCredentials): Observable<ILoginReturnInfo> {
    return this.http
      .post<ApiResponse<ILoginReturnInfo>>(`${url}auth/login`, body)
      .pipe(
        map((response: any) => response.results as ILoginReturnInfo[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  deleteUser() {
    this.http
      .delete<ApiResponse<any>>(`${url}user/${localStorage.getItem('id')}`)
      .subscribe({
        error: (error) => {
          tap(error), catchError(this.handleError);
        },
      });
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in UiService', error);
    return throwError(() => new Error(error.message));
  }
}

// const body = {};
// const headers = {
//   Authorization: 'Bearer my-token',
//   'My-Custom-Header': 'foobar',
// };
// return this.http
//   .post<ApiResponse<ILoginReturnInfo>>('url', body, { headers: headers })
//   .pipe(
//     map((response: any) => response.results as ILoginReturnInfo[]),
//     tap(console.log),
//     catchError(this.handleError)
//   );
