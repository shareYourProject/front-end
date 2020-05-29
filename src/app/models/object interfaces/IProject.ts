import { LinkData } from '../api/LinkData';
import { Permissions } from '../api/Permissions';

export interface IProject {
    name?: string;
    description?: string;
    links: LinkData[];
    visibility?: boolean;
    permissions: Permissions[];
}