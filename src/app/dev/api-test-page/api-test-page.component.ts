import { Component, OnInit } from '@angular/core';
import { UserAccountCollectionService } from 'src/app/services/user-account-collection.service';
import { UserSettingsComponent } from 'src/app/pages/user-dashboard/user-settings/user-settings.component';
import { UserAccount } from 'src/app/models/classes/UserAccount';

@Component({
  selector: 'app-api-test-page',
  templateUrl: './api-test-page.component.html',
  styleUrls: ['./api-test-page.component.scss']
})
export class ApiTestPageComponent implements OnInit {

  alice: UserAccount;

  constructor(
    private readonly users: UserAccountCollectionService,
  ) { }

  ngOnInit(): void {
  }

}
