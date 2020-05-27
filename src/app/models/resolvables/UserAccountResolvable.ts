import { User } from '../classes/User';

export type UserAccountResolvable = User | number;

export function resolveUserAccount(userAccount: UserAccountResolvable) : number {
    if (userAccount instanceof User)
        return userAccount.id;
    return userAccount;
}