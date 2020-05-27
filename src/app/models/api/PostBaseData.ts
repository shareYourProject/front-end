import { ApiData } from './ApiData';

export interface PostBaseData extends ApiData {
    content: string;
    user_ids: number[];
    author_id: number;
}

export interface PostData extends PostBaseData {
    project_id: number;
}

export interface CommentData extends PostBaseData {
    post_id: number;
}