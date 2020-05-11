import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAccount } from 'src/app/models/classes/UserAccount';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  user: UserAccount;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: ApiService,
  ) {

  }

  async ngOnInit() {
    /*
    if (!this.api.user) throw new Error("Loggin needed.");
    this.user = this.api.user;
    */
    // simulate user
    this.user = new UserAccount(this.api, {
      id: 0,
      username: "AliceDu29",
      firstname: "Alice",
      lastname: "DuBois",
      biography: "I like coding !",
      email: "Alice.DuBois@notamail.com",
      links: [],
      project_ids: [],
      skills: [],
    });
  }

}
