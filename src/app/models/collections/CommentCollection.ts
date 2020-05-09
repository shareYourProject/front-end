import { CollectionBase } from './CollectionBase';
import { Comment } from '../classes/Comment';
import { CommentData } from 'src/app/models/api/PostBaseData';
import { Post } from '../classes/Post';
import { ApiService } from 'src/app/services/api.service';
import { PagingCollection } from '../collections/PagingCollection';

export class CommentCollection extends PagingCollection<Comment, CommentData> {

  constructor(
    api: ApiService,
    public readonly post: Post
  ) {
    super(api, `/comments/${post.id}`);
  }

  protected async build(data: CommentData) {
    const author = await this.api.users.get(data.author_id);
    return new Comment(this.api, data, author, this.post);
  }

  async create(content: string) {
    const data = await this.api.post<CommentData>('/comment', { content, post_id: this.post.id });
    const author = await this.api.users.get(data.author_id);
    const comment = new Comment(this.api, data, author, this.post);
    this.cache.set(comment.id, comment);
    return comment;
  }
}
