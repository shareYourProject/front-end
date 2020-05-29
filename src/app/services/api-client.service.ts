import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccessDeniedApiError } from '../models/errors/AccessDeniedApiError';
import { NotFoundApiError } from '../models/errors/NotFoundApiError';
import { DefaultApiError } from '../models/errors/DefaultApiError';
import { HttpMethod } from '../models/errors/ApiError';
import { map } from 'rxjs/operators';
import { FIRST_LASTNAME_PATTERN, USERNAME_PATTERN, PASSWORD_PATTERN, EMAIL_PATTERN } from '../regex';
import { UserSessionData } from '../models/api/UserSessionData';
import { Subject } from 'rxjs';

const API_TOKEN_KEY = 'api_token';

@Injectable({
  providedIn: 'root'
})
export class ApiClient {

  public static readonly API_ROOT = 'https://api.shareyourproject.fr/api';

  private _apiToken: string | null = null;
  private readonly _loggedChanged = new Subject<boolean>();

  constructor(private httpClient: HttpClient) {
    this._apiToken = localStorage.getItem(API_TOKEN_KEY);
  }

  get onLoggedChanged() { return this._loggedChanged.asObservable(); }

  public post<T = Object>(endpoint: string, body: any, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient
      .post<T>(ApiClient.API_ROOT + endpoint, body, { headers: this.getHeaderWithToken(headers), observe: 'response' })
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
      .get<T>(ApiClient.API_ROOT + endpoint, { headers: this.getHeaderWithToken(headers), observe: 'response' })
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
      .delete(ApiClient.API_ROOT + endpoint, { headers: this.getHeaderWithToken(headers), observe: 'response', responseType: 'text' })
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
      .put(ApiClient.API_ROOT + endpoint, body, { headers: this.getHeaderWithToken(headers), observe: 'response', responseType: 'text' })
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


  async isLogged() {
    if (!this._apiToken) return false;
    if (await this.post<boolean>('/token', {}).catch(() => false)) return true;
    this._apiToken = null;
    return false;
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
    this._apiToken = session.access_token;
    localStorage.setItem(API_TOKEN_KEY, this._apiToken);
    this._loggedChanged.next(true);
    return true;
  }

  async login(username: string, password: string) {
    // check if username & password respect basic rules before send request to server.
    if (!USERNAME_PATTERN.test(username) || !PASSWORD_PATTERN.test(password))
      return false;

    const session = await this.post<UserSessionData>('/login', { username: username, password: password });
    this._apiToken = session.access_token;
    localStorage.setItem(API_TOKEN_KEY, this._apiToken);
    this._loggedChanged.next(true);
    return true;
  }

  async logout() {
    if (!this._apiToken) return;
    localStorage.removeItem(API_TOKEN_KEY);
    this._apiToken = null;
    this._loggedChanged.next(false);
    await this.get('/logout').catch(() => { });
  }
}
