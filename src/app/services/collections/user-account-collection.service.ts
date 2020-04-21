import { Injectable } from '@angular/core';
import { CollectionBase } from '../../models/Collections/CollectionBase';
import { UserAccount } from '../../models/classes/UserAccount';
import { ApiService } from '../api.service';
import { UserAccountData } from '../../models/api/account';

@Injectable({
  providedIn: 'root'
})
export class UserAccountCollectionService extends CollectionBase<number, UserAccount> {

  constructor(
    private readonly api: ApiService,
  ) {
    super();
  }

  protected async buildObject(key: number) {
    const data = await this.api.get<UserAccountData>(`user/${key}`).toPromise();
    if (!data)
      throw new Error("Fail to build project.");
    return new UserAccount(this.api, data);
  }
}
