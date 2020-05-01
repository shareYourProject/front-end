import { CollectionBase } from './CollectionBase';
import { Comment } from '../classes/Comment';
import { CommentData } from 'src/app/models/api/PostBaseData';
import { Post } from '../classes/Post';
import { ApiService } from 'src/app/services/api.service';

export class CommentCollection extends CollectionBase<Comment> {

  constructor(
    api: ApiService,
    public readonly post: Post
  ) {
    super(api);
  }

  protected async buildObject(key: number) {
    const data = await this.api.get<CommentData>(this.post.endpoint + `/comments/${key}`);
    const author = await this.api.users.get(data.author_id);
    return new Comment(this.api, data, author, this.post);
  }

  async create(content: string) {
    const data = await this.api.post<CommentData>(this.post.endpoint + '/comments', { content });
    const author = await this.api.users.get(data.author_id);
    const comment = new Comment(this.api, data, author, this.post);
    this.cache.set(comment.id, comment);
    return comment;
  }
}
