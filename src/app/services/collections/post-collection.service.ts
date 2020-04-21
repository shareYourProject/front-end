import { Injectable } from '@angular/core';
import { CollectionBase } from 'src/app/models/Collections/CollectionBase';
import { Post } from 'src/app/models/classes/Post';
import { ApiService } from '../api.service';
import { PostData } from 'src/app/models/api/post';

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
}
