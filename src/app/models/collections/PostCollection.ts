import { CollectionBase } from './CollectionBase';
import { Post } from 'src/app/models/classes/Post';
import { PostData } from 'src/app/models/api/PostBaseData';
import { ApiService } from 'src/app/services/api.service';
import { Project } from '../classes/Project';

export class PostCollection extends CollectionBase<Post> {

  constructor(
    api: ApiService,
    public readonly project: Project,
  ) {
    super(api);
  }

  protected async buildObject(key: number) {
    const data = await this.api.get<PostData>(this.project.endpoint + `/post/${key}`);
    const author = await this.api.users.get(data.author_id);
    return new Post(this.api, data, author, this.project);
  }

  async create(content: string) {
    const data = await this.api.post<PostData>(this.project.endpoint + `/post`, { content });
    const author = await this.api.users.get(data.author_id);
    const post = new Post(this.api, data, author, this.project);
    this.cache.set(post.id, post);
    return post;
  }
}
