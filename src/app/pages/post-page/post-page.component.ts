import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/classes/Post';
import { ApiService } from 'src/app/services/api.service';
import { PostBase } from 'src/app/models/classes/PostBase';
import { Comment } from 'src/app/models/classes/Comment';
import { NotFoundApiError } from 'src/app/models/errors/NotFoundApiError';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  private _projectID: number;
  private _postID: number;

  private _post?: Post;
  private _comments: Comment[];

  commentContent: string = "";
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) { }

  get projectID() { return this._projectID; }

  get postID() { return this._postID; }

  get post() { return this._post; }

  get comments(): Comment[] { return this._comments; }

  async ngOnInit() {
    this._projectID = this.route.parent?.snapshot.params['id'];
    this._postID = this.route.snapshot.params['postId'];

    console.log(this._projectID);
    console.log(this._postID);
    try {
      this._post = await (await this.api.projects.get(this._projectID)).posts.get(this._postID);
    } catch (error) {
      console.log(error);
      this.notFound = true;
    }
    await this.loadMore();
  }

  async loadMore() {
    if (this._post)
      this._comments = await this._post.comments.loadMore();
  }

  async onLikeClick(post: PostBase) {
    if (post.liked)
      await post.unlike();
    else
      await post.like();
  }

  async onPost() {
    if (this._post) {
      await this._post.createComment(this.commentContent);
      this._comments = this._post.comments.cached;
    }
  }

}
