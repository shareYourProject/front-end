import { CollectionBase } from './CollectionBase';
import { UserAccount } from '../classes/UserAccount';
import { ApiService } from '../../services/api.service';
import { UserAccountData } from '../api/account';

export class UserAccountCollection extends CollectionBase<number, UserAccount> {

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
      user.merge(data);
    } else {
      user = new UserAccount(this.api, data);
      this.cache.set(data.id, user);
    }

    return user;
  }

}
