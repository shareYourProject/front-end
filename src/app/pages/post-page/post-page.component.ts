import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface DumbPost {
  author: DumbUser;
  content: string;
  comments: DumbComment[];
  liked: boolean;
}

interface DumbComment {
  content: string;
  //author: DumbUser;
}

interface DumbUser {
  id: number;
  username: string;
  profilePictureUrl: string;
}


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  private _projectID: string;
  private _postID: string;

  private _post: DumbPost

  constructor(private route: ActivatedRoute) { }

  get projectID() { return this._projectID; }

  get postID() { return this._postID; }

  get post(): DumbPost { return this._post; }

  ngOnInit(): void {
    this._projectID = this.route.parent.snapshot.params['id'];
    this._postID = this.route.snapshot.params['postId'];

    // Todo: Get post data from api
    this._post = {
      content: 'I am the content',
      author: {
        id: 42,
        username: 'Alice',
        profilePictureUrl: 'https://www.journaldebrazza.com/wp-content/uploads/2018/04/IMAGE-DE-PHOTO-DE-PROFIL-VIDE.png',
      },
      comments: [
        { content: 'I like this ^^' },
        { content: 'wow ! Awesome !' },
        { content: 'comment 3' },
      ],
      liked: false,
    };
  }

  loadMore(): void {
    this._post.comments.push({ content: 'Another Comment' });
  }

  onLikeClick(): void {
    this._post.liked = !this._post.liked;
  }

}
