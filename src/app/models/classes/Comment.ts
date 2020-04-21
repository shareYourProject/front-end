import { ApiService } from 'src/app/services/api.service';
import { CommentData } from '../api/post';
import { PostBase } from './PostBase';

export class Comment extends PostBase<CommentData> {

    public readonly postId: number;

    constructor(
        api: ApiService,
        data: CommentData,
    ) {
        super(api, data);
        this.postId = data.post_id;
    }

    get endpoint() { return `comment/${this.id}`; }

}