import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/classes/Project';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-project-public',
  templateUrl: './project-public.component.html',
  styleUrls: ['./project-public.component.scss']
})
export class ProjectPublicComponent implements OnInit {

  project$: Promise<Project>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: ApiService,
    ) { }

  ngOnInit(): void {
    const projectID = parseInt(this.route.snapshot.params['id']);
    this.project$ = this.api.projects.get(projectID);
  }
}
