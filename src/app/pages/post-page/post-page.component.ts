import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/classes/Post';
import { ApiService } from 'src/app/services/api.service';
import { PostBase } from 'src/app/models/classes/PostBase';
import { Comment } from 'src/app/models/classes/Comment';

const COMMENTS_PER_REQUEST = 10;

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  private _projectID: number;
  private _postID: number;

  private _post: Post;
  private _comments: Comment[];

  commentContent: string = "";

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) { }

  get projectID() { return this._projectID; }

  get postID() { return this._postID; }

  get post(): Post { return this._post; }

  get comments(): Comment[] { return this._comments; }

  async ngOnInit() {
    this._projectID = this.route.parent?.snapshot.params['id'];
    this._postID = this.route.snapshot.params['postId'];

    this._post = await (await this.api.projects.get(this._projectID)).posts.get(this._postID);
    await this.loadMore();
  }

  async loadMore() {
    this._comments = await this._post.comments.loadMore();
  }

  // TODO: use correct PostBase interface !
  async onLikeClick(post: PostBase) {
    if (post.liked)
      await post.unlike();
    else
      await post.like();
  }

}
