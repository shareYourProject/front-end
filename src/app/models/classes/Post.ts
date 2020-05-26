import { ApiService } from 'src/app/services/api.service';
import { PostData } from '../api/PostBaseData';
import { PostBaseObject } from './PostBase';
import { UserAccount } from './UserAccount';
import { Project } from './Project';
import { CommentCollection } from '../collections/CommentCollection';
import { DeletedDataError } from '../errors/DeletedDataError';

export class Post extends PostBaseObject<PostData> {

    public readonly comments: CommentCollection;

    constructor(
        api: ApiService,
        data: PostData,
        author: UserAccount,
        public readonly project: Project,
    ) {
        super(api, data, author);
        this.comments = new CommentCollection(api, this);
    }

    get endpoint() { return this.project.endpoint + `/post/${this.id}`; }

    get directEndpoint() { return `/post/${this.id}` };

    protected getData(): PostData {
        return {
            id: this.id,
            author_id: this.author.id,
            content: this.content,
            likes: [...this._likes],
            project_id: this.project.id,
        }
    }

    /** @deprecated use Post.comments.create instead. */
    async createComment(content: string) {
        if (this.deleted) throw new DeletedDataError();
        return await this.comments.create(content);
    }
}
