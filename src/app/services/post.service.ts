import { Injectable } from '@angular/core';
import { CacheServiceBase } from '../models/CacheServiceBase';
import { Post } from '../models/classes/Post';
import { PostData } from '../models/api/PostBaseData';
import { ApiClient } from './api-client.service';
import { UserService } from './user.service';
import { ProjectService } from './project.service';
import { Project } from '../models/classes/Project';
import { User } from '../models/classes/User';

@Injectable({
  providedIn: 'root'
})
export class PostService extends CacheServiceBase<Post> {

  constructor(
    apiClient: ApiClient,
    private readonly users: UserService,
    private readonly projects: ProjectService
  ) {
    super(apiClient);
  }

  protected async buildObject(key: number) {
    const data = await this.apiClient.get<PostData>(`/post/${key}`);
    const author = await this.users.get(data.author_id);
    const project = await this.projects.get(data.project_id);
    return new Post(this.apiClient, data, author, project);
  }

  async create(project: Project, content: string) {
    const data = await this.apiClient.post<PostData>('/post', { content, project_id: project.id });
    const author = await this.users.get(data.author_id);
    const post = new Post(this.apiClient, data, author, project);
    this.cache.set(post.id, post);
    return post;
  }

  async getLikedPosts(userId: number): Promise<Post[]> {
    const res = await this.apiClient.get<{ post_ids: number[] }>(`/user/${userId}/likedPosts`);
    return (await Promise.all(
      res.post_ids
        .map(
          id => this.get(id).catch(e => console.error('get post', e))
        )

    ))
      .filter(function (o): o is Post { return !!o; })
  }
}
