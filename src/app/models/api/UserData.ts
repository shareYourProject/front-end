import { ApiData } from './ApiData';
import { LinkData } from './LinkData';

export interface UserData extends ApiData {
    username: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    skills?: string[];
    biography?: string;
    links?: LinkData[];
    project_ids?: number[];
    followed_project_ids?: number[];
}
