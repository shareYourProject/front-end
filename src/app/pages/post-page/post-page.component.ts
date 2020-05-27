import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/classes/Post';
import { PostBase } from 'src/app/models/classes/PostBase';
import { Comment } from 'src/app/models/classes/Comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClient } from 'src/app/services/api-client.service';
import { PostService } from 'src/app/services/post.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/classes/User';
import { UserService } from 'src/app/services/user.service';
import { PagedResponse } from 'src/app/models/PagedResponse';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {

  me: User | null;
  post: Post;
  comments: Comment[];

  private _commentsLoader: PagedResponse<Comment>;

  newCommentContent: string = "";
  notFound = false;

  commentForm: FormGroup;
  postCommentError = false;

  private _paramSubscription: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly commentService: CommentService,
    formBuilder: FormBuilder,
  ) {
    this.commentForm = formBuilder.group({
      content: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { post: Post, me: User | null }) => {
        this.me = data.me;
        this.post = data.post;
        this._commentsLoader = this.commentService.getPostComments(this.post.id);
        this.comments = [];
      }
    );
  }

  ngOnDestroy() {
    this._paramSubscription?.unsubscribe();
  }

  isLiked(post: PostBase) {
    return this.me && post.likerIds.includes(this.me.id);
  }

  async loadMore() {
    this.comments.push(...await this._commentsLoader.next());
  }

  onCommentFormSubmit() {
    throw new Error('Not implemented.');
  }

  async onLikeClick(post: PostBase) {
    if (this.isLiked(post))
      await post.unlike().catch(() => { });
    else
      await post.like().catch(() => { });
  }

  // TODO

  /*
    async loadMore() {
      if (this._post)
        await this._post.comments.loadMore();
    }
  
    async onCommentFormSubmit() {
      if (this._post && this.commentForm.valid) {
        const content = this.commentForm.value.content;
        console.log("Post new comment :", content);
        const comment = await this._post.createComment(this.commentForm.value.content).catch(() => { });
        if (comment)
          this._comments.push(comment);
        else
          this.postCommentError = true;
      }
    }
    */
}