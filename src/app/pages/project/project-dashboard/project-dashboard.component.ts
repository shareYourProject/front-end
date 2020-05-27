import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/classes/Project';
import { User } from 'src/app/models/classes/User';
import { Post } from 'src/app/models/classes/Post';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  postForm: FormGroup;
  postError = false;

  project: Project;
  members$: Promise<User[]>;
  posts$: Promise<Post[]>;

  private _project?: Project;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly users: UserService,
    private readonly posts: PostService,
    formBuilder: FormBuilder,
  ) {
    this.postForm = formBuilder.group({
      postContent: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { project: Project }) => {
        this.project = data.project;
        this.members$ = this.users.getMany(this.project.memberIds);
        this.posts$ = this.posts.getMany(this.project.postIds);
      }
    );
  }

  async onSubmitPost() {
    if (this._project && this.postForm.valid) {

      const post = await this.posts.create(this.project, this.postForm.value.postContent).catch(() => { });
      if (post)
        this.router.navigateByUrl(`/project/${this._project.id}/post/${post.id}`);
      else
        this.postError = true;
    }
  }

}
