import { Component, OnInit, Input } from '@angular/core';
import { UserAccount } from 'src/app/models/classes/UserAccount';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() members$: UserAccount[] | Promise<UserAccount[]>;

  constructor() { }

  ngOnInit(): void { }
}
