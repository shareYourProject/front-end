import { UserAccountData } from './UserAccountData';

export interface UserSessionData {
    account: UserAccountData,
    api_token: string,
    creation_date: string,
}