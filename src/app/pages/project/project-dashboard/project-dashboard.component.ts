import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/classes/Project';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  project$: Promise<Project>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: ApiService
  ) { }

  ngOnInit(): void {
    const projectID = parseInt(this.route.parent?.snapshot?.params?.id);
    this.project$ = this.api.projects.get(projectID);
  }

}
