import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Project } from 'src/app/models/classes/Project';
import { ApiService } from 'src/app/services/api.service';
import { UserAccount } from 'src/app/models/classes/UserAccount';

@Component({
  selector: 'app-project-public',
  templateUrl: './project-public.component.html',
  styleUrls: ['./project-public.component.scss']
})
export class ProjectPublicComponent implements OnInit {

  project$: Promise<Project>;
  members$: Promise<UserAccount[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: ApiService,
    router: Router,
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
   }

  ngOnInit(): void {
    const projectID = parseInt(this.route.snapshot.params['id']);
    this.project$ = this.api.projects.get(projectID);
    this.members$ = this.project$.then(p => p.getMembers());
  }
}
