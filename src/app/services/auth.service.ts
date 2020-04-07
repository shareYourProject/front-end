import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, switchMap, retry, map, catchError, filter, scan } from 'rxjs/operators'
import { UserService } from './user.service';

interface CheckTokenResponse {
  isValid: boolean,
}

interface AuthResponse {
  result: LogResult,
  token: string | undefined,
}

export enum LogResult {
  Success,
  UnknownUsername,
  WrongPassword,
  Error,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string | undefined;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
  ) { }

  get token(): string | undefined { return this._token; }

  isLogged(): Observable<boolean> {
    // Check if auth token is still valid
    if (this._token) {
      return this.httpClient
        .post<CheckTokenResponse>('/api/v1/check-auth-token', { token: this._token })
        .pipe(
          map(r => r.isValid),
          retry(2),
          catchError(e => {
            console.error('on check-auth-token :', e);
            return of(false);
          })
        );
    } else {
      return of(false);
    }
  }

  log(username: string, password: string): Observable<LogResult> {
    // check if username & password respect basique rules before send request to server.
    if (!this.userService.usernameRegex.test(username))
      return of(LogResult.UnknownUsername);
    if (!this.userService.passwordRegex.test(password))
      return of(LogResult.WrongPassword);

    return this.httpClient
      .post<AuthResponse>('/api/v1/auth', { username: username, password: password })
      .pipe(
        map(res => {
          console.log("auth result =", res);
          if (res.result === LogResult.Success)
            this._token = res.token;
          return res.result;
        }),
        catchError(e => {
          console.error('on auth', e);
          return of(LogResult.Error);
        }),
      );
  }
}
