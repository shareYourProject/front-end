import { ApiData } from './ApiData';
import { Permissions } from './Permissions'
import { LinkData } from './LinkData';

export interface ProjectData extends ApiData {
    member_ids?: number[];
    owner_id: number;
    name?: string;
    description?: string;
    links?: LinkData[];
    visibility?: boolean;
    post_ids?: number[];
    file_ids?: number[];
    permissions?: Permissions[];
}