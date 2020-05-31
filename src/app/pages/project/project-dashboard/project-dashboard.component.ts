import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/classes/Project';
import { User } from 'src/app/models/classes/User';
import { Post } from 'src/app/models/classes/Post';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons';

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
    this.route.parent?.data.subscribe(
      (data: { project: Project }) => {
        this.project = data.project;
        this.members$ = this.users.getMany(this.project.memberIds);
        this.posts$ = this.posts.getMany(this.project.postIds);
      }
    );
  }

  async onSubmitPost() {
    console.log(this.project);
    if (this.project && this.postForm.valid) {
      console.log(this.postForm);
      const post = await this.posts.create(this.project, this.postForm.value.postContent).catch(() => { });
      if (post)
        this.router.navigateByUrl(`/post/${post.id}`);
      else
        this.postError = true;
    }
  }

  // Icons
  faPaperPlane = faPaperPlane;

}
