import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/classes/Post';
import { ApiService } from 'src/app/services/api.service';
import { PostBase } from 'src/app/models/classes/PostBase';
import { Comment } from 'src/app/models/classes/Comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  private _projectID: number;
  private _postID: number;

  post$: Promise<Post>;

  private _post: Post;
  private _comments: Comment[];

  newCommentContent: string = "";
  notFound = false;

  commentForm: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: ApiService,
    private readonly formBuilder: FormBuilder,
  ) {
    this.commentForm = formBuilder.group({
      content: ['', Validators.required],
    });
  }

  get projectID() { return this._projectID; }

  get postID() { return this._postID; }

  get comments(): Comment[] { return this._comments; }

  ngOnInit() {
    this._projectID = this.route.parent?.snapshot.params['id'];
    this._postID = this.route.snapshot.params['postId'];

    console.log(this._projectID);
    console.log(this._postID);


    this.post$ = this.api.projects.get(this._projectID).then(p => p.posts.get(this._postID));
    this.post$.then(p => this._post = p);
  }

  async loadMore() {
    if (this._post)
      await this._post.comments.loadMore();
  }

  async onLikeClick(post: PostBase) {
    if (post.liked)
      await post.unlike();
    else
      await post.like();
  }

  async onCommentFormSubmit() {
    if (this._post && this.commentForm.valid) {
      const content = this.commentForm.value.content;
      console.log("Post new comment :", content);
      // TODO
      /*
      await this._post.createComment(this.commentContent);
      this._comments = this._post.comments.cached;
      */
      this.commentForm.reset();
    }
  }
}