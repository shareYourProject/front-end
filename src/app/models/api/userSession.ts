import { AccountData } from './account';

export interface UserSessionData {
    account: AccountData,
    api_token: string,
    creation_date: string,
}