import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAccount } from 'src/app/models/classes/UserAccount';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-public-page',
  templateUrl: './user-public-page.component.html',
  styleUrls: ['./user-public-page.component.scss']
})
export class UserPublicPageComponent implements OnInit {

  user$: Promise<UserAccount>;

  private _user?: UserAccount;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: ApiService,
    ) { }

  ngOnInit(): void {
    const userID = this.route.snapshot.params['id'];
    this.user$ = this.api.users.get(userID);
    this.user$.then(u => this._user = u);
  }

}
