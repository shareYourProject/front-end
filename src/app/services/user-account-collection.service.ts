import { Injectable } from '@angular/core';
import { CollectionBase } from '../models/CollectionBase';
import { UserAccount } from '../models/classes/UserAccount';
import { ApiService } from './api.service';
import { UserAccountData } from '../models/api/account';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAccountCollectionService extends CollectionBase<number, UserAccount> {

  constructor(
    private readonly api: ApiService,
  ) {
    super();
  }

  protected buildObject(key: number) {
    return this.api
      .getData<UserAccountData>(`user/${key}`)
      .pipe(
        map(
          data => {
            if (!data)
              throw new Error("Fail to build user.");
            return new UserAccount(this.api, data);
          }
        )
      );
  }
}
