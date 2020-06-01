import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Post } from 'src/app/models/classes/Post';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/classes/User';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {

  me: User | null;
  posts: Post[] = [];
  subscription: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly search: SearchService,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { me: User | null }) => {
        this.me = data.me;
      }
    )
    this.subscription = this.search.getFeed().subscribe(p => this.posts.push(p));
    console.log(this.posts);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
