import { UserAccountData } from './UserAccountData';

export interface UserSessionData {
    account: UserAccountData,
    access_token: string,
    creation_date: number,
}