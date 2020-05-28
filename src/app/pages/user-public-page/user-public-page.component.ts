import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/classes/User';
import { Project } from 'src/app/models/classes/Project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-user-public-page',
  templateUrl: './user-public-page.component.html',
  styleUrls: ['./user-public-page.component.scss']
})
export class UserPublicPageComponent implements OnInit {

  user: User;
  projects$: Promise<Project[]>;
  tab: Tabs = "tab 1";

  constructor(
    private readonly route: ActivatedRoute,
    private readonly projects: ProjectService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { user: User }) => {
        this.user = data.user;
        this.projects$ = this.projects.getMany(this.user.projectIds);
      }
    )
  }

  setTab(tab: Tabs) {
    this.tab = tab;
  }

}

type Tabs = "tab 1" | "tab with explicit name 2" | "tab 3" | "tab 4";
