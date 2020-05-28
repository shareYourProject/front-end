import { LinkData } from '../api/LinkData';

export interface IProject {
    name?: string;
    description?: string;
    links: LinkData[];
    visibility?: boolean;
}