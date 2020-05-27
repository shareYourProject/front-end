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

}
