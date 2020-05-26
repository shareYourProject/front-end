import { UserAccount } from '../classes/UserAccount';
import { UserAccountData } from '../api/UserAccountData';
import { ApiCollection } from './ApiCollection';

export class UserAccountCollection extends ApiCollection<UserAccount, UserAccountData> {

  protected async buildObject(key: number) {
    const data = await this.api.get<UserAccountData>(`/user/${key}`);
    if (!data)
      throw new Error('Fail to build project.');
    return new UserAccount(this.api, data);
  }

  protected buildObjectFromData(data: UserAccountData) {
    return new UserAccount(this.api, data);
  }

}
