import { ApiService } from 'src/app/services/api.service';
import { PostData } from '../api/post';
import { PostBase } from './PostBase';

// WIP

export class Post extends PostBase<PostData> {

    public readonly projectId: number;
    private commentIds: number[];

    constructor(
        api: ApiService,
        data: PostData,
    ) {
        super(api, data);
        this.projectId = data.project_id;
    }

    get endpoint() { return `post/${this.id}`; }

    protected setData(data: PostData) {
        super.setData(data);
        this.commentIds = [...data.comment_ids];
    }

    async createComment(content: string) {
        return await this.api.comments.create(content, this.id);
    }
}
