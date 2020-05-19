import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Project } from 'src/app/models/classes/Project';
import { ApiService } from 'src/app/services/api.service';
import { UserAccount } from 'src/app/models/classes/UserAccount';
import { Post } from 'src/app/models/classes/Post';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  postForm: FormGroup;
  postError = false;

  project$: Promise<Project>;
  members$: Promise<UserAccount[]>;
  posts$: Promise<Post[]>;

  private _project?: Project;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: ApiService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
    this.postForm = formBuilder.group({
      postContent: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    const projectID = parseInt(this.route.parent?.snapshot?.params?.id);
    this.project$ = this.api.projects.get(projectID);
    this.project$.then(p => this._project = p);
    this.members$ = this.project$.then(p => p.getMembers());
  }

  async onSubmitPost() {
    if (this._project && this.postForm.valid) {
      const post = await this._project.posts.create(this.postForm.value.postContent).catch(() => { });
      if (post)
        this.router.navigateByUrl(`/project/${this._project.id}/post/${post.id}`);
      else
        this.postError = true;
    }
  }

}
