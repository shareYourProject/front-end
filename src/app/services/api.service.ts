import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { USERNAME_PATTERN, PASSWORD_PATTERN, EMAIL_PATTERN, FIRST_LASTNAME_PATTERN } from '../regex';
import { UserSessionData } from '../models/api/userSession';

const API_ROOT = '/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private session: UserSessionData | null = null;

  constructor(private httpClient: HttpClient) { }

  // === HELP METHODS =========================================================================================================

  public post<T = Object>(endpoint: string, body: any, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient.post<T>(API_ROOT + endpoint, body, { headers: this.getHeaderWithToken(headers), observe: 'response' });
  }

  public get<T = Object>(endpoint: string, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient.get<T>(API_ROOT + endpoint, { headers: this.getHeaderWithToken(headers), observe: 'response' });
  }

  public delete<T = Object>(endpoint: string, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient.delete<T>(API_ROOT + endpoint, { headers: this.getHeaderWithToken(headers), observe: 'response' });
  }

  public put<T = Object>(endpoint: string, body: any, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient.put<T>(API_ROOT + endpoint, body, { headers: this.getHeaderWithToken(headers), observe: 'response' });
  }

  /**
   * Make a get request and return the body if successful, return null otherwise.
   * @param endpoint 
   */
  public getData<U>(endpoint: string) {
    return this.get<U>(endpoint)
      .pipe(map(response => response.ok ? response.body : null));
  }

  /**
   * Generate a header with api_token
   */
  public getHeaderWithToken(headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return { api_token: this.session ? this.session.api_token : '', ...headers};
  }

  // === REQUESTS =========================================================================================================

  /** @deprecated */
  isLogged(): Observable<boolean> {
    throw new Error('API.isLogged is deprecated !');
  }

  register(firstname: string, lastname: string, username: string, password: string, email: string): Observable<boolean> {
    if (
      !FIRST_LASTNAME_PATTERN.test(firstname) ||
      !FIRST_LASTNAME_PATTERN.test(lastname) ||
      !USERNAME_PATTERN.test(username) ||
      !PASSWORD_PATTERN.test(password) ||
      !EMAIL_PATTERN.test(email)
    )
      return of(false);

    return this.post<UserSessionData>('register', { firstname, lastname, username, password, email })
      .pipe(map(response => {
        if (response.ok)
          this.session = response.body;
        return response.ok;
      }));
  }

  login(username: string, password: string): Observable<boolean> {
    // check if username & password respect basique rules before send request to server.
    if (!USERNAME_PATTERN.test(username) || !PASSWORD_PATTERN.test(password))
      return of(false);

    return this.post<UserSessionData>('login', { username: username, password: password })
      .pipe(map(response => {
        if (response.ok)
          this.session = response.body;
        return response.ok;
      }));
  }

  /*
  getUser(userID: number) {
    return this
      .getData<UserAccountData>(`user/${userID}`)
      .pipe(
        map(
          data => {
            if (!data) return null;
            const cached = this.userAccountCache.get(userID);

            if (!cached) {
              const userAccount = new UserAccountAPI(this, data);
              this.userAccountCache.set(userID, userAccount);
              return userAccount as UserAccount
            }

            cached.fetch(data);
            return cached as UserAccount;
          }
        )
      );
  }

  updateUser(user: UserAccountData): Observable<boolean> {
    return this.put(`user/${user.id}`, user, this.getHeaderWithToken())
      .pipe(map(response => response.ok));
  }

  deleteUser(userID: number): Observable<boolean> {
    return this.delete(`user/${userID}`, this.getHeaderWithToken())
      .pipe(map(response => response.ok));
  }

  getProject(projectID: number) {
    return this.getData<ProjectData>(`project/${projectID}`);
  }

  updateProject(user: UserAccountData): Observable<boolean> {
    return this.put(`user/${user.id}`, user, this.getHeaderWithToken())
      .pipe(map(response => response.ok));
  }

  deleteProject(userID: number): Observable<boolean> {
    return this.delete(`user/${userID}`, this.getHeaderWithToken())
      .pipe(map(response => response.ok));
  }

  */
}
