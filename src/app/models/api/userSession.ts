import { Account } from './account';

export interface UserSession {
    account: Account,
    api_token: string,
    creation_date: string,
}