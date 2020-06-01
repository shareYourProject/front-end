import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/classes/Project';
import { User } from 'src/app/models/classes/User';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/app/models/classes/Post';
import { PostService } from 'src/app/services/post.service';
import { faTachometerAlt, faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import { ThrowStmt } from '@angular/compiler';

type Tabs = 'publications' | 'members' | 'about';

@Component({
  selector: 'app-project-public',
  templateUrl: './project-public.component.html',
  styleUrls: ['./project-public.component.scss']
})
export class ProjectPublicComponent implements OnInit {

  // Icons
  readonly faTachometerAlt = faTachometerAlt;
  readonly faBell = faBell;
  readonly faBellSlash = faBellSlash;

  project: Project;
  me: User | null;
  members$: Promise<User[]>;
  posts$: Promise<Post[]>;

  imMember: boolean;
  links: Map<string, string>;
  tab: Tabs = 'publications';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly users: UserService,
    private readonly posts: PostService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { project: Project, me: User | null }) => {
        this.project = data.project;
        this.me = data.me;
        this.imMember = !!data.me && this.project.memberIds.includes(data.me.id);
        this.members$ = this.users.getMany(this.project.memberIds);
        this.posts$ = this.posts.getMany(this.project.postIds);
      }
    );
    console.log(this.project);
  }

  isFollowed(): boolean {
    return !!this.me && this.me.followedProjectIds.includes(this.project.id);
  }

  async onFollowClick(btn: HTMLButtonElement) {
    btn.disabled = true;
    try {
      if (this.isFollowed()) {
        await this.project.unfollow();
      } else {
        await this.project.follow();
      }
      await this.me?.fetch();
    } catch (e) { console.error('fail follow button click', e); }
    btn.disabled = false;
  }
}
