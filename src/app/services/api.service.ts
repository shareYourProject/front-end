import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { USERNAME_PATTERN, PASSWORD_PATTERN } from '../regex';
import { UserSession } from '../models/api/userSession';

const API_ROOT = '/api/v1/'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private session: UserSession | null = null;

  constructor(private httpClient: HttpClient) { }

  private post<T>(endpoint: string, body: any, headers?: HttpHeaders | { [header: string]: string | string[] }): Observable<HttpResponse<T>> {
    return this.httpClient.post<T>(API_ROOT + endpoint, body, { headers, observe: 'response' });
  }

  
  isLogged(): Observable<boolean> {
    console.error("API.isLogged is deprecated !");
    return of(false);
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
}
