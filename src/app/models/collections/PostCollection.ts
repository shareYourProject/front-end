import { Post } from 'src/app/models/classes/Post';
import { PostData } from 'src/app/models/api/PostBaseData';
import { ApiService } from 'src/app/services/api.service';
import { ApiCollection } from './ApiCollection';
import { Project } from '../classes/Project';

export class PostCollection extends ApiCollection<Post, PostData> {

  constructor(
    api: ApiService
  ) {
    super(api);
  }

  protected async buildObject(key: number) {
    const data = await this.api.get<PostData>(`/post/${key}`);
    return this.buildObjectFromData(data);
  }

  protected async buildObjectFromData(data: PostData) {
    const author = await this.api.collections.users.get(data.author_id);
    const project = await this.api.collections.projects.get(data.author_id);
    return new Post(this.api, data, author, project);
  }

  async create(project: Project, content: string) {
    const data = await this.api.post<PostData>('/post', { content, project_id: project.id });
    const author = await this.api.collections.users.get(data.author_id);
    const post = new Post(this.api, data, author, project);
    this.cache.set(post.id, post);
    return post;
  }
}
