import { ApiData } from './apiData';

export interface PostBaseData extends ApiData<number> {
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