import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { USERNAME_PATTERN, PASSWORD_PATTERN, EMAIL_PATTERN, FIRST_LASTNAME_PATTERN } from '../regex';
import { UserSessionData } from '../models/api/UserSessionData';
import { AccessDeniedApiError } from '../models/errors/AccessDeniedApiError';
import { HttpMethod } from '../models/errors/ApiError';
import { DefaultApiError } from '../models/errors/DefaultApiError';
import { NotFoundApiError } from '../models/errors/NotFoundApiError';
import { UserAccountCollection } from '../models/collections/UserAccountCollection';
import { ProjectCollection } from '../models/collections/ProjectCollection';
import { UserAccount } from '../models/classes/UserAccount';
import { Subject } from 'rxjs';
import { UserAccountData } from '../models/api/UserAccountData';

const API_TOKEN_KEY = 'api_token';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {

  public static readonly API_ROOT = 'https://api.shareyourproject.fr/api';

  private _user: UserAccount | null = null;
  private _apiToken: string | null = null;

  public readonly users: UserAccountCollection;
  public readonly projects: ProjectCollection;

  private readonly _logChanged = new Subject<boolean>();

  constructor(
    private httpClient: HttpClient,

  ) {
    this.users = new UserAccountCollection(this);
    this.projects = new ProjectCollection(this);
    this._apiToken = localStorage.getItem(API_TOKEN_KEY);
  }

  ngOnInit(): void {

  }

  get user() { return this._user; }

  get logChanged() { return this._logChanged.asObservable(); }

  // === HELP METHODS =========================================================================================================

  public post<T = Object>(endpoint: string, body: any, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient
      .post<T>(ApiService.API_ROOT + endpoint, body, { headers: this.getHeaderWithToken(headers), observe: 'response' })
      .pipe(
        map(
          response => {
            if (response.ok)
              return response.body as T;
            throw this.generateError(endpoint, "post", response.status);
          }
        )
      ).toPromise();
  }

  public get<T = Object>(endpoint: string, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient
      .get<T>(ApiService.API_ROOT + endpoint, { headers: this.getHeaderWithToken(headers), observe: 'response' })
      .pipe(
        map(
          response => {
            if (response.ok)
              return response.body as T;
            throw this.generateError(endpoint, "get", response.status);
          }
        )
      ).toPromise();
  }

  public delete(endpoint: string, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient
      .delete(ApiService.API_ROOT + endpoint, { headers: this.getHeaderWithToken(headers), observe: 'response' })
      .pipe(
        map(
          response => {
            if (!response.ok)
              throw this.generateError(endpoint, "delete", response.status);
          }
        )
      ).toPromise();
  }

  public put(endpoint: string, body: any, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient
      .put(ApiService.API_ROOT + endpoint, body, { headers: this.getHeaderWithToken(headers), observe: 'response' })
      .pipe(
        map(
          response => {
            if (!response.ok)
              throw this.generateError(endpoint, "put", response.status);
          }
        )
      ).toPromise();
  }

  /**
   * Generate a header with api_token
   */
  public getHeaderWithToken(headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return { Authorization: this._apiToken ? 'Bearer ' + this._apiToken : '', ...headers };
  }

  private generateError(endpoint: string, method: HttpMethod, status: number) {
    switch (status) {
      case 401: return new AccessDeniedApiError(endpoint, method);
      case 404: return new NotFoundApiError(endpoint, method);
      default: return new DefaultApiError(endpoint, method, status);
    }
  }

  // === REQUESTS =========================================================================================================

  async isLogged() {
    if (!this._apiToken) return false;
    if (!await this.post<boolean>('/token', {})) {
      this._apiToken = null;
      this._user = null;
      return false;
    }
    if (!this._user) {
      const data = await this.get<UserAccountData>('/user');
      this._user = this.users.merge(data);
    }
    return true;
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

    const session = await this.post<UserSessionData>('/register', { firstname, lastname, username, password, email });
    this._user = this.users.merge(session.account);
    this._apiToken = session.access_token;
    localStorage.setItem(API_TOKEN_KEY, this._apiToken);
    this._logChanged.next(true);
    return true;
  }

  async login(username: string, password: string) {
    // check if username & password respect basic rules before send request to server.
    if (!USERNAME_PATTERN.test(username) || !PASSWORD_PATTERN.test(password))
      return false;

    const session = await this.post<UserSessionData>('/login', { username: username, password: password });
    this._user = this.users.merge(session.account);
    this._apiToken = session.access_token;
    localStorage.setItem(API_TOKEN_KEY, this._apiToken);
    this._logChanged.next(true);
    return true;
  }

  async logout() {
    if (!this._apiToken) return;
    localStorage.removeItem(API_TOKEN_KEY);
    this._apiToken = null;
    this._user = null;
    this._logChanged.next(false);
    await this.get('/logout').catch(() => {});
  }
}