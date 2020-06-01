import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from '../models/api/SearchResult';
import { Project } from '../models/classes/Project';
import { User } from '../models/classes/User';
import { Post } from '../models/classes/Post';
import { FeedResponse } from '../models/api/FeedResponse';
import { ApiClient } from './api-client.service';
import { ProjectService } from './project.service';
import { UserService } from './user.service';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private readonly apiClient: ApiClient,
    private readonly projects: ProjectService,
    private readonly users: UserService,
    private readonly posts: PostService
  ) { }

  search(query: string): Observable<SearchValue> {
    const parsedQuery = (query.match(/[^\s"]+|"([^"]*)"/g) || [])
      .map(a => /^(".*")$/.test(a) ? a.substring(1, a.length - 1) : a)
      .join('/');
    return new Observable<SearchValue>(
      subscriber => {
        this.apiClient.get<SearchResult>(`/search/${parsedQuery}`)
          .then(
            async r => {
              for (const id of r.project_ids)
                subscriber.next({ type: "project", value: await this.projects.get(id) });
              for (const id of r.user_ids)
                subscriber.next({ type: "user", value: await this.users.get(id) });
              subscriber.complete();
            }
          )
      }
    );
  }

  getFeed(): Observable<Post> {
    return new Observable<Post>(
      subscriber => {
        this.apiClient.get<FeedResponse>('/feed')
          .then(
            async res => {
              for (const id of res.post_ids) {
                try {
                  const post = await this.posts.get(id);
                  subscriber.next(post);
                } catch (e) {
                  console.error(e);
                }
              }
            }
          )
      }
    );
  }
}

export type SearchValue = { type: "project", value: Project } | { type: "user", value: User };