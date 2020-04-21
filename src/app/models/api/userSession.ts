import { UserAccountData } from './account';

export interface UserSessionData {
    account: UserAccountData,
    api_token: string,
    creation_date: string,
}