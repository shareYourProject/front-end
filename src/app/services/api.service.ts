import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { USERNAME_PATTERN, PASSWORD_PATTERN } from '../regex';
import { LoginResponse } from '../models/api/login-response';


const API_ROOT = '/api/v1/'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token: string | null = null;

  constructor(private httpClient: HttpClient) { }

  private post<T>(endpoint: string, body: any): Observable<HttpResponse<T>> {
    return this.httpClient.post<T>("", {}, { observe: 'response' });
  }

  isLogged(): Observable<boolean> {
    if (this.token === null)
      return of(false);
    return this.post('check-token', { token: this.token }).pipe(map(response => response.ok));
  }

  login(username: string, password: string): Observable<boolean> {
    // check if username & password respect basique rules before send request to server.
    if (!USERNAME_PATTERN.test(username) || !PASSWORD_PATTERN.test(password))
      return of(false);

    return this.post<LoginResponse>('login', { username: username, password: password })
      .pipe(map(response => {
        if (response.ok)
          this.token = response.body.token;
        return response.ok;
      }));
  }



}
