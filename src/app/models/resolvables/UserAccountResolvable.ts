import { UserAccount } from '../classes/UserAccount';

export type UserAccountResolvable = UserAccount | number;

export function resolveUserAccount(userAccount: UserAccountResolvable) : number {
    if (userAccount instanceof UserAccount)
        return userAccount.id;
    return userAccount;
}