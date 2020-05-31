import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/classes/User';
import { Project } from 'src/app/models/classes/Project';
import { ProjectService } from 'src/app/services/project.service';
import { Post } from 'src/app/models/classes/Post';
import { PostService } from 'src/app/services/post.service';
import { faBell } from '@fortawesome/free-solid-svg-icons';

type Tabs = "tab 1" | "tab with explicit name 2" | "tab 3" | "tab 4";

@Component({
  selector: 'app-user-public-page',
  templateUrl: './user-public-page.component.html',
  styleUrls: ['./user-public-page.component.scss']
})
export class UserPublicPageComponent implements OnInit {

  // Icons
  readonly faBell = faBell;

  user: User;
  me: User | null;
  projects$: Promise<Project[]>;
  likedPosts$: Promise<Post[]>;
  tab: Tabs = "tab 1";

  constructor(
    private readonly route: ActivatedRoute,
    private readonly projects: ProjectService,
    private readonly posts: PostService,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { user: User, me: User | null }) => {
        this.user = data.user;
        this.me = data.me;
        this.projects$ = this.projects.getMany(this.user.projectIds);
        this.likedPosts$ = this.posts.getLikedPosts(this.user.id);
      }
    )
  }

  setTab(tab: Tabs) {
    this.tab = tab;
  }

  /*
  isFollowed() {
    return false; // TODO
  }

  async onFollowClick(v: any) {
    console.log(v);
    if (this.isFollowed()) {
    
    } else {

    }
  }
*/

}


