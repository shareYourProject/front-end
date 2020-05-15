import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/classes/Project';
import { ApiService } from 'src/app/services/api.service';
import { UserAccount } from 'src/app/models/classes/UserAccount';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  project$: Promise<Project>;
  members$: Promise<UserAccount[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: ApiService
  ) { }

  ngOnInit(): void {
    const projectID = parseInt(this.route.parent?.snapshot?.params?.id);
    this.project$ = this.api.projects.get(projectID);
    this.members$ = this.project$.then(p => p.getMembers());
  }

}
