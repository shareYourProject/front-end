import { Injectable } from '@angular/core';
import { CacheServiceBase } from '../models/CacheServiceBase';
import { Comment } from '../models/classes/Comment';
import { CommentData } from '../models/api/PostBaseData';
import { PostService } from './post.service';
import { UserService } from './user.service';
import { ApiClient } from './api-client.service';
import { Post } from '../models/classes/Post';
import { DeletedDataError } from '../models/errors/DeletedDataError';
import { PagedData } from '../models/api/PagedData';
import { PagedResponse } from '../models/PagedResponse';
import { MakePagedResponse } from '../utils/MakePagedResponse';

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

    return this.buildComment(data);
  }

  private async buildComment(data: CommentData) {
    console.log(data);
    const author = await this.users.get(data.author_id);
    const post = await this.posts.get(data.post_id);
    return new Comment(this.apiClient, data, author, post);
  }

  async create(post: Post, content: string) {
    if (post.deleted) throw new DeletedDataError();
    const data = await this.apiClient.post<CommentData>(`/post/${post.id}/comment`, { content });
    const author = await this.users.get(data.author_id);
    const comment = new Comment(this.apiClient, data, author, post);
    this.cache.set(comment.id, comment);
    return comment;
  }

  getPostComments(postId: number) {
    return MakePagedResponse<CommentData, Comment>(
      `/post/${postId}/comments`,
      this.apiClient,
      d => this.buildComment(d)
    );
  }
}
