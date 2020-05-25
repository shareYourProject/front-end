import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { SearchResult } from '../models/api/SearchResult';
import { Project } from '../models/classes/Project';
import { UserAccount } from '../models/classes/UserAccount';

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
                subscriber.next({ type: "project", value: await this.api.projects.get(id) });
              for (const id of r.user_ids)
                subscriber.next({ type: "user", value: await this.api.users.get(id) });
              subscriber.complete();
            }
          )
      }
    );
  }
}

export type SearchValue = { type: "project", value: Project } | { type: "user", value: UserAccount };