import { Injectable } from '@angular/core';
import { CacheServiceBase } from '../models/CacheServiceBase';
import { Comment } from '../models/classes/Comment';
import { CommentData } from '../models/api/PostBaseData';
import { PostService } from './post.service';
import { UserService } from './user.service';
import { ApiClient } from './api-client.service';
import { Post } from '../models/classes/Post';
import { DeletedDataError } from '../models/errors/DeletedDataError';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends CacheServiceBase<Comment> {

  constructor(
    apiClient: ApiClient,
    private readonly users: UserService,
    private readonly posts: PostService
  ) {
    super(apiClient);
  }

  protected async buildObject(key: number) {
    const data = await this.apiClient.get<CommentData>(`/comment/${key}`);
    const author = await this.users.get(data.author_id);
    const post = await this.posts.get(data.post_id);
    return new Comment(this.apiClient, data, author, post);
  }

  async create(post: Post, content: string) {
    if (post.deleted) throw new DeletedDataError();
    const data = await this.apiClient.post<CommentData>('/comment', { content, post_id: post.id });
    const author = await this.users.get(data.author_id);
    const comment = new Comment(this.apiClient, data, author, post);
    this.cache.set(comment.id, comment);
    return comment;
  }

}
