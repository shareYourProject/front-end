import { Injectable } from '@angular/core';
import { Project } from 'src/app/models/classes/Project';
import { ProjectData } from 'src/app/models/api/ProjectData';
import { CacheServiceBase } from '../models/CacheServiceBase';
import { ApiClient } from './api-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends CacheServiceBase<Project> {

  constructor(apiClient: ApiClient) { super(apiClient); }

  protected async buildObject(key: number) {
    const data = await this.apiClient.get<ProjectData>(`/project/${key}`);
    if (!data) throw new Error("Fail to build project.");
    return new Project(this.apiClient, data);
  }

  async create(name: string, description: string) {
    const data = await this.apiClient.post<ProjectData>('/project', { name, description }).catch(e => console.error('create project', e));
    if (!data) return null;
    const project = new Project(this.apiClient, data);
    this.cache.set(project.id, project);
    return project;
  }

  async getFollowedProject(userId: number): Promise<Project[]> {
    const res = await this.apiClient.get<{ project_ids: number[] }>(`/user/${userId}/followedProjects`);
    return (await Promise.all(
      res.project_ids
        .map(
          id => this.get(id).catch(e => console.error('get post', e))
        )

    ))
      .filter(function (o): o is Project { return !!o; })
  }

}
