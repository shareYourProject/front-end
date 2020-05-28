import { LinkData } from '../api/LinkData';

export interface IUser {
    username: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    skills: string[];
    biography?: string;
    links: LinkData[];
}