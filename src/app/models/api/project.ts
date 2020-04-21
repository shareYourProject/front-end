import { ApiData } from './apiData';

export interface ProjectData extends ApiData<number> {
    member_ids?: number[];
    name?: string;
    description?: string;
    links?: string[];
    visibility?: boolean;
}