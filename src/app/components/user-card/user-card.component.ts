import { Component, OnInit, Input } from '@angular/core';
import { UserAccount } from 'src/app/models/classes/UserAccount';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: UserAccount;

  constructor() { }

  ngOnInit(): void {
  }

}
