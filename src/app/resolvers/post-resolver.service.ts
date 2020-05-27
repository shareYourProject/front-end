import { Injectable } from '@angular/core';
import { DataResolver } from '../models/DataResolver';
import { Post } from '../models/classes/Post';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Injectable({
  providedIn: 'root'
})
export class PostResolverService extends DataResolver<Post> {

  constructor(
    router: Router,
    private readonly post: PostService
  ) { 
    super(router, 'post_id');
  }

  protected async getData(id: number) {
    return await this.post.get(id);
  }

}
