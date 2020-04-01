import { UserAccountRequest } from './user-account';
import { PostRequest } from './post';

export interface PostList {
    authorReferences: UserAccountRequest[];
    posts: PostRequest[];
}
