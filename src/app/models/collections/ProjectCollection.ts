import { Project } from '../classes/Project';
import { ProjectData } from '../api/ProjectData';
import { ApiCollection } from './ApiCollection';

export class ProjectCollection extends ApiCollection<Project, ProjectData> {

  protected async buildObject(key: number) {
    const data = await this.api.get<ProjectData>(`/project/${key}`);
    if (!data)
      throw new Error("Fail to build project.");
    return new Project(this.api, data);
  }

  protected buildObjectFromData(data: ProjectData): Project | Promise<Project> {
    return new Project(this.api, data);
  }

}
