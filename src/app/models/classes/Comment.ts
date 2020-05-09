import { ApiService } from 'src/app/services/api.service';
import { CommentData } from '../api/PostBaseData';
import { PostBase } from './PostBase';
import { UserAccount } from './UserAccount';
import { Post } from './Post';

export class Comment extends PostBase<CommentData> {

    constructor(
        api: ApiService,
        data: CommentData,
        author: UserAccount,
        public readonly post: Post,
    ) {
        super(api, data, author);
    }

    get endpoint() { return this.post.endpoint + `/comments/${this.id}`; }

    get directEndpoint() {return `/comment/${this.id}`};

}