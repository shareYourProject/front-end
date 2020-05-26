import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserAccount } from 'src/app/models/classes/UserAccount';
import { ApiService } from 'src/app/services/api.service';
import { Project } from 'src/app/models/classes/Project';

@Component({
  selector: 'app-user-public-page',
  templateUrl: './user-public-page.component.html',
  styleUrls: ['./user-public-page.component.scss']
})
export class UserPublicPageComponent implements OnInit {

  user$: Promise<UserAccount>;
  projects$: Promise<Project[]>;

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
    const userID = this.route.snapshot.params['id'];
    this.user$ = this.api.collections.users.get(userID);
    this.projects$ = this.user$.then(u => u.getProjects());
  }

}
