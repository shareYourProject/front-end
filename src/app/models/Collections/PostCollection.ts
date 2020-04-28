import { CollectionBase } from 'src/app/models/collections/CollectionBase';
import { Post } from 'src/app/models/classes/Post';
import { ApiService } from '../../services/api.service';
import { PostData } from 'src/app/models/api/PostBaseData';

export class PostCollection extends CollectionBase<Post> {


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
