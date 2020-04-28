import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { USERNAME_PATTERN, PASSWORD_PATTERN, EMAIL_PATTERN, FIRST_LASTNAME_PATTERN } from '../regex';
import { UserSessionData } from '../models/api/UserSessionData';
import { AccessDeniedApiError } from '../models/errors/AccessDeniedApiError';
import {  HttpMethod } from '../models/errors/ApiError';
import { DefaultApiError } from '../models/errors/DefaultApiError';
import { NotFoundApiError } from '../models/errors/NotFoundApiError';
import { UserAccountCollection } from '../models/collections/UserAccountCollection';
import { ProjectCollection } from '../models/collections/ProjectCollection';
import { UserAccount } from '../models/classes/UserAccount';

const API_ROOT = '/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _user: UserAccount | null = null;
  private apiToken: string | null = null;

  public readonly users: UserAccountCollection;
  public readonly projects: ProjectCollection;

  constructor(
    private httpClient: HttpClient,

  ) {
    this.users = new UserAccountCollection(this);
    this.projects = new ProjectCollection(this);
  }

  get user() { return this._user; }

  // === HELP METHODS =========================================================================================================

  public post<T = Object>(endpoint: string, body: any, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient
      .post<T>(API_ROOT + endpoint, body, { headers: this.getHeaderWithToken(headers), observe: 'response' })
      .pipe(
        map(
          response => {
            if (response.ok)
              return response.body as T;
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
              return response.body as T;
            throw this.generateError(endpoint, "get", response.status);
          }
        )
      );
  }

  public delete(endpoint: string, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient
      .delete(API_ROOT + endpoint, { headers: this.getHeaderWithToken(headers), observe: 'response' })
      .pipe(
        map(
          response => {
            if (!response.ok)
              throw this.generateError(endpoint, "delete", response.status);
          }
        )
      );
  }

  public put(endpoint: string, body: any, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient
      .put(API_ROOT + endpoint, body, { headers: this.getHeaderWithToken(headers), observe: 'response' })
      .pipe(
        map(
          response => {
            if (!response.ok)
              throw this.generateError(endpoint, "put", response.status);
          }
        )
      );
  }

  /**
   * Generate a header with api_token
   */
  public getHeaderWithToken(headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return { api_token: this.apiToken ? this.apiToken : '', ...headers };
  }

  private generateError(endpoint: string, method: HttpMethod, status: number) {
    switch (status) {
      case 401: return new AccessDeniedApiError(endpoint, method);
      case 404: return new NotFoundApiError(endpoint, method);
      default: return new DefaultApiError(endpoint, method, status);
    }
  }

  // === REQUESTS =========================================================================================================

  /** @deprecated */
  isLogged(): Observable<boolean> {
    throw new Error('API.isLogged is deprecated !');
  }

  async register(firstname: string, lastname: string, username: string, password: string, email: string) {
    if (
      !FIRST_LASTNAME_PATTERN.test(firstname) ||
      !FIRST_LASTNAME_PATTERN.test(lastname) ||
      !USERNAME_PATTERN.test(username) ||
      !PASSWORD_PATTERN.test(password) ||
      !EMAIL_PATTERN.test(email)
    )
      return false;

    const session = await this.post<UserSessionData>('register', { firstname, lastname, username, password, email }).toPromise();
    this._user = this.users.mergeUser(session.account);
    this.apiToken = session.api_token;
    return true;
  }

  async login(username: string, password: string) {
    // check if username & password respect basic rules before send request to server.
    if (!USERNAME_PATTERN.test(username) || !PASSWORD_PATTERN.test(password))
      return false;

    const session = await this.post<UserSessionData>('login', { username: username, password: password }).toPromise();
    this._user = this.users.mergeUser(session.account);
    this.apiToken = session.api_token;
    return true;
  }
}
