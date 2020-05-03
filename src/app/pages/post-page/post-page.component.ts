import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface DumbComment {
  content: string;
}


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  private _projectID: string;
  private _postID: string;
  private _comments: DumbComment[] = [];

  constructor(private route: ActivatedRoute) { }

  get projectID() { return this._projectID; }

  get postID() { return this._postID; }

  get content(): string { return 'DUMB CONTENT'; }

  get comments(): DumbComment[] { return this._comments;  }

  ngOnInit(): void {
    this._projectID = this.route.parent.snapshot.params['id'];
    this._postID = this.route.snapshot.params['postId'];

    // Todo: Get post data from api
    this._comments = [ 
      {content: 'I like this ^^'},
      {content: 'wow ! Awesome !'},
      {content: 'comment 3'},
    ]
  }

  loadMore(): void {
    this._comments.push({content: 'Another Comment'});
  }

}
