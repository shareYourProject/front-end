import { ApiData } from './ApiData';

export interface PostBaseData extends ApiData {
    content: string;
    nb_like: number;
    author_id: number;
}

export interface PostData extends PostBaseData {
    project_id: number;
    comment_ids: number[];
}

export interface CommentData extends PostBaseData {
    post_id: number;
}