import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/classes/Project';
import { User } from 'src/app/models/classes/User';
import { Post } from 'src/app/models/classes/Post';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  // Icons
  faPaperPlane = faPaperPlane;

  postForm: FormGroup;
  postResult: 'none' | 'success' | 'error' = 'none';

  project: Project;
  members$: Promise<User[]>;
  posts$: Promise<Post[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly users: UserService,
    private readonly posts: PostService,
    formBuilder: FormBuilder,
  ) {
    this.postForm = formBuilder.group({
      postContent: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.route.parent?.data.subscribe(
      (data: { project: Project }) => {
        this.project = data.project;
        this.members$ = this.users.getMany(this.project.memberIds);
        this.posts$ = this.posts.getMany(this.project.postIds);
      }
    );
  }

  async onSubmitPost() {
    if (this.postForm.valid) {
      this.postForm.disable();
      const post = await this.posts.create(this.project, this.postForm.value.postContent).catch(() => { });
      if (post) {
        this.postForm.reset();
        this.postResult = 'success';
        await this.project.fetch();
        this.posts$ = this.posts.getMany(this.project.postIds);
      } else {
        this.postResult = 'error';
      }
      this.postForm.enable();
    }
  }


}
