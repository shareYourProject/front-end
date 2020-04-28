import { CollectionBase } from './CollectionBase';
import { Project } from '../classes/Project';
import { ProjectData } from '../api/project';
import { ApiService } from '../../services/api.service';

export class ProjectCollection extends CollectionBase<number, Project> {

  constructor(
    private readonly api: ApiService,
  ) {
    super();
  }

  protected async buildObject(key: number) {
    const data = await this.api.get<ProjectData>(`project/${key}`).toPromise();
    if (!data)
      throw new Error("Fail to build project.");
    return new Project(this.api, data);
  }
}
