import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { USERNAME_PATTERN, PASSWORD_PATTERN, EMAIL_PATTERN, FIRST_LASTNAME_PATTERN } from '../regex';
import { UserSessionData } from '../models/api/userSession';
import { AccessDeniedApiError } from '../models/errors/AccessDeniedApiError';
import { ApiError, HttpMethod } from '../models/errors/ApiError';
import { DefaultApiError } from '../models/errors/DefaultApiError';

const API_ROOT = '/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private session: UserSessionData | null = null;

  constructor(private httpClient: HttpClient) { }

  // === HELP METHODS =========================================================================================================

  public post<T = Object>(endpoint: string, body: any, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient
      .post<T>(API_ROOT + endpoint, body, { headers: this.getHeaderWithToken(headers), observe: 'response' })
      .pipe(
        map(
          response => {
            if (response.ok)
              return response.body;
            throw this.generateError(endpoint, "post", response.status);
          }
        )
      );
  }

  public get<T = Object>(endpoint: string, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient
      .get<T>(API_ROOT + endpoint, { headers: this.getHeaderWithToken(headers), observe: 'response' })
      .pipe(
        map(
          response => {
            if (response.ok)
              return response.body;
            throw this.generateError(endpoint, "get", response.status);
          }
        )
      );
  }

  public delete<T = Object>(endpoint: string, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient.delete<T>(API_ROOT + endpoint, { headers: this.getHeaderWithToken(headers), observe: 'response' })
      .pipe(
        map(
          response => {
            if (response.ok)
              return response.body;
            throw this.generateError(endpoint, "delete", response.status);
          }
        )
      );
  }

  public put<T = Object>(endpoint: string, body: any, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient.put<T>(API_ROOT + endpoint, body, { headers: this.getHeaderWithToken(headers), observe: 'response' })
      .pipe(
        map(
          response => {
            if (response.ok)
              return response.body;
            throw this.generateError(endpoint, "put", response.status);
          }
        )
      );
  }

 /*
  public getData<U>(endpoint: string) {
    return this.get<U>(endpoint)
      .pipe(
        map(
          response => {
            if (response.ok)
              return response.body;
            throw this.generateError(endpoint, "get", response.status);
          }
        )
      );
  }

  public putData(endpoint: string, data: any) {
    return this.put(endpoint, data)
      .pipe(map(response => response.ok));
  }

  public deleteData(endpoint: string) {
    return this.delete(endpoint).pipe(map(response => response.ok));
  }
  */

  /**
   * Generate a header with api_token
   */
  public getHeaderWithToken(headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return { api_token: this.session ? this.session.api_token : '', ...headers };
  }


  private generateError(endpoint: string, method: HttpMethod, status: number) {
    switch (status) {
      case 401: return new AccessDeniedApiError(endpoint, method);
      default: return new DefaultApiError(endpoint, method, status);
    }
  }

  // === REQUESTS =========================================================================================================

  /** @deprecated */
  isLogged(): Observable<boolean> {
    throw new Error('API.isLogged is deprecated !');
  }

  register(firstname: string, lastname: string, username: string, password: string, email: string): Promise<boolean> {
    if (
      !FIRST_LASTNAME_PATTERN.test(firstname) ||
      !FIRST_LASTNAME_PATTERN.test(lastname) ||
      !USERNAME_PATTERN.test(username) ||
      !PASSWORD_PATTERN.test(password) ||
      !EMAIL_PATTERN.test(email)
    )
      return Promise.resolve(false);

    return this.post<UserSessionData>('register', { firstname, lastname, username, password, email })
      .pipe(
        map(
          response => {
            if (response.ok)
              this.session = response.body;
            return response.ok;
          }
        )
      )
      .toPromise();
  }

  login(username: string, password: string): Promise<boolean> {
    // check if username & password respect basique rules before send request to server.
    if (!USERNAME_PATTERN.test(username) || !PASSWORD_PATTERN.test(password))
      return Promise.resolve(false);

    return this.post<UserSessionData>('login', { username: username, password: password })
      .pipe(
        map(
          response => {
            if (response.ok)
              this.session = response.body;
            return response.ok;
          }
        )
      )
      .toPromise();
  }
}
