import { Injectable } from '@angular/core';
import { UserData } from '../models/api/UserData';
import { User } from '../models/classes/User';
import { CacheServiceBase } from '../models/CacheServiceBase';
import { ApiClient } from './api-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CacheServiceBase<User> {

  private _loggedUser: User | null = null;

  constructor(apiClient: ApiClient) { super(apiClient); }

  get me() { return this._loggedUser; }

  protected async buildObject(key: number) {
    const data = await this.apiClient.get<UserData>(`/user/${key}`);
    if (!data)
      throw new Error('Fail to build project.');
    return new User(this.apiClient, data);
  }

  private async _fetchLoggedUser() {
    const data = await this.apiClient.get<UserData>(`/user`).catch(e => console.error('feth logged user', e));
    if (!data) return null;
    let user = this.cache.get(data.id);
    if (user) return user.merge(data);
    user = new User(this.apiClient, data);
    this.cache.set(user.id, user);
    return user;
  }

  /** Return the User that represent the logged user, null is not logged. */
  async fetchLoggedUser() {
    this._loggedUser = await this._fetchLoggedUser();
    return this._loggedUser;
  }
}
