import { ApiData } from './ApiData';
import { PermissionsData } from './PermissionsData'

export interface ProjectData extends ApiData {
    member_ids?: number[];
    name?: string;
    description?: string;
    links?: string[];
    visibility?: boolean;
    post_ids?: number[];
    file_ids?: number[];
    permissions?: { member_id: number, permissions: PermissionsData }[];
}