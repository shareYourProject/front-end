import { CommentData } from '../api/PostBaseData';
import { PostBaseObject } from './PostBase';
import { User } from './User';
import { Post } from './Post';
import { ApiClient } from 'src/app/services/api-client.service';

export class Comment extends PostBaseObject<CommentData> {

    constructor(
        apiClient: ApiClient,
        data: CommentData,
        author: User,
        public readonly post: Post,
    ) {
        super(apiClient, data, author);
    }

    get endpoint() { return this.post.endpoint + `/comments/${this.id}`; }

    get directEndpoint() { return `/comment/${this.id}` };

    protected getData(): CommentData {
        return {
            id: this.id,
            author_id: this.author.id,
            content: this.content,
            likes: [...this._likes],
            post_id: this.post.id
        }
    }
}