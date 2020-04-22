import { Injectable } from '@angular/core';
import { CollectionBase } from 'src/app/models/Collections/CollectionBase';
import { Comment } from '../../models/classes/Comment';
import { ApiService } from '../api.service';
import { CommentData } from 'src/app/models/api/post';

@Injectable({
  providedIn: 'root'
})
export class CommentCollectionService extends CollectionBase<number, Comment> {

  constructor(
    private readonly api: ApiService,
  ) {
    super();
  }

  protected async buildObject(key: number) {
    const data = await this.api.get<CommentData>(`user/${key}`).toPromise();
    if (!data)
      throw new Error('Fail to build project.');
    return new Comment(this.api, data);
  }

  async create(content: string, postId: number) {
    const data = await this.api.post<CommentData>('comment/', { content, post_id: postId }).toPromise();
    const comment = new Comment(this.api, data);
    this.cache.set(comment.id, comment);
    return comment;
  }
}
