import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { USERNAME_PATTERN, PASSWORD_PATTERN, EMAIL_PATTERN, FIRST_LASTNAME_PATTERN } from '../regex';
import { UserSession } from '../models/api/userSession';
import { Project } from '../models/project';

const API_ROOT = '/api/v1/'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private session: UserSession | null = null;

  constructor(private httpClient: HttpClient) { }

  // === HELP METHODS =========================================================================================================

  private post<T = Object>(endpoint: string, body: any, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient.post<T>(API_ROOT + endpoint, body, { headers, observe: 'response' });
  }

  private get<T = Object>(endpoint: string, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient.get<T>(API_ROOT + endpoint, { headers, observe: 'response' });
  }

  private delete<T = Object>(endpoint: string, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient.delete<T>(API_ROOT + endpoint, { headers, observe: 'response' });
  }

  private put<T = Object>(endpoint: string, body: any, headers?: HttpHeaders | { [header: string]: string | string[] }) {
    return this.httpClient.put<T>(API_ROOT + endpoint, body, { headers, observe: 'response' });
  }

  /**
   * Make a get request and return the body if successful, return null otherwise.
   * @param endpoint 
   */
  private getData<U>(endpoint: string) {
    return this.get<U>(endpoint, this.getHeaderWithToken())
      .pipe(map(response => response.ok ? response.body : null));
  }

  /**
   * Generate a header with api_token
   */
  private getHeaderWithToken() {
    return { api_token: this.session ? this.session.api_token : '' };
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

    return this.post<UserSession>('register', { firstname, lastname, username, password, email })
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

    return this.post<UserSession>('login', { username: username, password: password })
      .pipe(map(response => {
        if (response.ok)
          this.session = response.body;
        return response.ok;
      }));
  }

  getUser(userID: number) {
    return this.getData<Account>(`user/${userID}`);
  }

  updateUser(user: Account): Observable<boolean> {
    return this.put(`user/${user.id}`, user, this.getHeaderWithToken())
      .pipe(map(response => response.ok));
  }

  deleteUser(userID: number): Observable<boolean> {
    return this.delete(`user/${userID}`, this.getHeaderWithToken())
      .pipe(map(response => response.ok));
  }

  getProject(projectID: number) {
    return this.getData<Project>(`project/${projectID}`);
  }

  updateProject(user: Account): Observable<boolean> {
    return this.put(`user/${user.id}`, user, this.getHeaderWithToken())
      .pipe(map(response => response.ok));
  }

  deleteProject(userID: number): Observable<boolean> {
    return this.delete(`user/${userID}`, this.getHeaderWithToken())
      .pipe(map(response => response.ok));
  }
}
