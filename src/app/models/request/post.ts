import { UserAccountRequest } from './user-account';
import { PartialList } from './partial-list';

export interface PostRequest {
    ID: string;
    content: string;
    likerIDs: string[];
    author: UserAccountRequest | number;
    responses: PartialList<PostRequest> | undefined;
}
