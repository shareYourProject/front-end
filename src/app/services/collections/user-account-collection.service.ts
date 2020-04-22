import { Injectable } from '@angular/core';
import { CollectionBase } from '../../models/Collections/CollectionBase';
import { UserAccount } from '../../models/classes/UserAccount';
import { ApiService } from '../api.service';
import { UserAccountData } from '../../models/api/account';
import { USERNAME_PATTERN, PASSWORD_PATTERN } from 'src/app/regex';
import { UserSessionData } from 'src/app/models/api/userSession';

@Injectable({
  providedIn: 'root'
})
export class UserAccountCollectionService extends CollectionBase<number, UserAccount> {

  private _currentUser: UserAccount | null = null;

  constructor(
    private readonly api: ApiService,
  ) {
    super();
  }

  protected async buildObject(key: number) {
    const data = await this.api.get<UserAccountData>(`user/${key}`).toPromise();
    if (!data)
      throw new Error('Fail to build project.');
    return new UserAccount(this.api, data);
  }

  mergeUser(data: UserAccountData) {
    let user = this.cache.get(data.id);

    if (user) {
      user.metge(data);
    } else {
      user = new UserAccount(this.api, data);
      this.cache.set(data.id, user);
    }

    return user;
  }

}
