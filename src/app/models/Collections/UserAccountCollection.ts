import { CollectionBase } from './CollectionBase';
import { UserAccount, MergeableUserAccountData } from '../classes/UserAccount';
import { ApiService } from '../../services/api.service';
import { UserAccountData } from '../api/UserAccountData';
import { MergeableCollection } from './MergeableCollection';

export class UserAccountCollection extends MergeableCollection<UserAccount, MergeableUserAccountData, UserAccountData> {

  protected async buildObject(key: number) {
    const data = await this.api.get<UserAccountData>(`user/${key}`).toPromise();
    if (!data)
      throw new Error('Fail to build project.');
    return new UserAccount(this.api, data);
  }

  protected buildObjectFromData(data: UserAccountData) {
    return new UserAccount(this.api, data);
  }

}
