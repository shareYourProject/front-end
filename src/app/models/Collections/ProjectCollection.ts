import { CollectionBase } from './CollectionBase';
import { Project } from '../classes/Project';
import { ProjectData } from '../api/ProjectData';
import { ApiService } from '../../services/api.service';

export class ProjectCollection extends CollectionBase<Project> {

  protected async buildObject(key: number) {
    const data = await this.api.get<ProjectData>(`project/${key}`);
    if (!data)
      throw new Error("Fail to build project.");
    return new Project(this.api, data);
  }
}
