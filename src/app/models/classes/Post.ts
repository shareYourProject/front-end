import { PostData } from '../api/PostBaseData';
import { PostBaseObject } from './PostBase';
import { User } from './User';
import { Project } from './Project';
import { ApiClient } from 'src/app/services/api-client.service';

export class Post extends PostBaseObject<PostData> {

    constructor(
        apiClient: ApiClient,
        data: PostData,
        author: User,
        public readonly project: Project,
    ) {
        super(apiClient, data, author);
    }

    get endpoint() { return `/post/${this.id}`; }

    protected getData(): PostData {
        return {
            id: this.id,
            author_id: this.author.id,
            content: this.content,
            user_ids: [...this._likes],
            project_id: this.project.id,
        }
    }
}
