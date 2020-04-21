import { Injectable } from '@angular/core';
import { CollectionBase } from '../../models/Collections/CollectionBase';
import { Project } from '../../models/classes/Project';
import { ProjectData } from '../../models/api/project';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectCollectionService extends CollectionBase<number, Project> {

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
