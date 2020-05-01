import { ApiService } from 'src/app/services/api.service';
import { PostData } from '../api/PostBaseData';
import { PostBase } from './PostBase';
import { UserAccount } from './UserAccount';
import { Project } from './Project';
import { CommentCollection } from '../collections/CommentCollection';
import { DeletedDataError } from '../errors/DeletedDataError';

// WIP

export class Post extends PostBase<PostData> {

    private commentIds: number[];

    private readonly _comments: CommentCollection;

    constructor(
        api: ApiService,
        data: PostData,
        author: UserAccount,
        public readonly project: Project,
    ) {
        super(api, data, author);
        this._comments = new CommentCollection(api, this);
    }

    get endpoint() { return this.project.endpoint + `/post/${this.id}`; }

    get directEndpoint() {return `/post/${this.id}`};

    get comments() { return this._comments; }

    protected setData(data: PostData) {
        super.setData(data);
        this.commentIds = [...data.comment_ids];
    }

    async createComment(content: string) {
        if (this.deleted) throw new DeletedDataError();
        return await this._comments.create(content);
    }
}
