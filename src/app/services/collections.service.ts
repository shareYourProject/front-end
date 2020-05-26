import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserAccountCollection } from '../models/collections/UserAccountCollection';
import { ProjectCollection } from '../models/collections/ProjectCollection';
import { PostCollection } from '../models/collections/PostCollection';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  public readonly users: UserAccountCollection;
  public readonly projects: ProjectCollection;
  public readonly posts: PostCollection;

  constructor(
    api: ApiService
  ) { 
    this.users = new UserAccountCollection(api);
    this.projects = new ProjectCollection(api);
    this.posts = new PostCollection(api);
  }
}
