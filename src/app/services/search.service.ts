import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { SearchResult } from '../models/api/SearchResult';
import { Project } from '../models/classes/Project';
import { UserAccount } from '../models/classes/UserAccount';
import { Post } from '../models/classes/Post';
import { FeedResponse } from '../models/api/FeedResponse';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private readonly api: ApiService) { }

  search(query: string): Observable<SearchValue> {
    const parsedQuery = (query.match(/[^\s"]+|"([^"]*)"/g) || [])
      .map(a => /^(".*")$/.test(a) ? a.substring(1, a.length - 1) : a)
      .join('/');
    return new Observable<SearchValue>(
      subscriber => {
        this.api.get<SearchResult>(`/search/${parsedQuery}`)
          .then(
            async r => {
              for (const id of r.project_ids)
                subscriber.next({ type: "project", value: await this.api.collections.projects.get(id) });
              for (const id of r.user_ids)
                subscriber.next({ type: "user", value: await this.api.collections.users.get(id) });
              subscriber.complete();
            }
          )
      }
    );
  }

  getFeed(): Observable<Post> {
    return new Observable<Post>(
      subscriber => {
        this.api.get<FeedResponse>('/feed/')
          .then(
            async res => {
              for (const id of res.post_ids) {
                try {
                  const post = await this.api.collections.posts.get(id);
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

export type SearchValue = { type: "project", value: Project } | { type: "user", value: UserAccount };