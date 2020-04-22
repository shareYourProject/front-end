import { Injectable } from '@angular/core';
import { CollectionBase } from 'src/app/models/Collections/CollectionBase';
import { Post } from 'src/app/models/classes/Post';
import { ApiService } from '../api.service';
import { PostData } from 'src/app/models/api/post';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class PostCollectionService extends CollectionBase<number, Post> {

  constructor(
    private readonly api: ApiService,
  ) {
    super();
  }

  protected async buildObject(key: number) {
    const data = await this.api.get<PostData>(`post/${key}`).toPromise();
    if (!data)
      throw new Error('Fail to build Post.');
    return new Post(this.api, data);
  }

  async create(content: string, projectId: number) {
    const data = await this.api.post<PostData>('post/', { content, project_id: projectId }).toPromise();
    const post = new Post(this.api, data);
    this.cache.set(post.id, post);
    return post;
  }
}
