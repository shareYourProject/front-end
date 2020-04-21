import { IAccount } from './account';

export interface IUserSession {
    account: IAccount,
    api_token: string,
    creation_date: string,
}