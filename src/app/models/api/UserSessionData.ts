import { UserData } from './UserData';

export interface UserSessionData {
    account: UserData,
    access_token: string,
    creation_date: number,
}