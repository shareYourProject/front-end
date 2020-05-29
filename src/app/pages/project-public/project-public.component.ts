import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/classes/Project';
import { User } from 'src/app/models/classes/User';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/app/models/classes/Post';
import { PostService } from 'src/app/services/post.service';
import { faTachometerAlt, faBell } from '@fortawesome/free-solid-svg-icons';

type Tabs = 'publications' | 'members' | 'about';

@Component({
  selector: 'app-project-public',
  templateUrl: './project-public.component.html',
  styleUrls: ['./project-public.component.scss']
})
export class ProjectPublicComponent implements OnInit {

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

  // Icons

  faTachometerAlt = faTachometerAlt;
  faBell = faBell;
}
