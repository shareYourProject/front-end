import { Component, OnInit } from '@angular/core';
import { UserAccountCollectionService } from 'src/app/services/user-account-collection.service';
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

  async ngOnInit() {
    this.alice = await this.users.get(0)
  }

  async fetch() {
    if (!this.alice) return;
    console.log("Start fetch");
    await this.alice.fetch().toPromise();
    console.log("Fetched !");
  }

}
