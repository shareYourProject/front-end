import { ApiService } from 'src/app/services/api.service';
import { PostData } from '../api/PostBaseData';
import { PostBaseObject } from './PostBase';
import { UserAccount } from './UserAccount';
import { Project } from './Project';
import { CommentCollection } from '../collections/CommentCollection';
import { DeletedDataError } from '../errors/DeletedDataError';

export class Post extends PostBaseObject<PostData> {

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

    async createComment(content: string) {
        if (this.deleted) throw new DeletedDataError();
        return await this._comments.create(content);
    }

    async getComments(from: number, count: number) {
        throw new Error("Not implemented"); // TODO : check for pagination.
    }
}
