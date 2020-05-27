import { Injectable } from '@angular/core';
import { Project } from '../models/classes/Project';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { DataResolver } from '../models/DataResolver';

@Injectable({
  providedIn: 'root'
})
export class ProjectResolverService extends DataResolver<Project> {

  constructor(
    router: Router,
    private readonly projects: ProjectService
  ) { 
    super(router, 'project_id');
  }

  protected async getData(id: number) {
    return await this.projects.get(id);
  }
}
