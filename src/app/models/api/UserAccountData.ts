import { ApiData } from './ApiData';

export interface UserAccountData extends ApiData {
    username: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    skills?: string[];
    biography?: string;
    links?: string[];
    project_ids?: number[];
}
