import { ApiData } from './ApiData';
import { PermissionsData } from './PermissionsData'
import { LinkData } from './LinkData';

export interface ProjectData extends ApiData {
    member_ids?: number[];
    name?: string;
    description?: string;
    links?: LinkData[];
    visibility?: boolean;
    post_ids?: number[];
    file_ids?: number[];
    permissions?: { member_id: number, permissions: PermissionsData }[];
}