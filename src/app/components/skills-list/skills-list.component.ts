import { Component, OnInit, Input } from '@angular/core';
import { UserAccount } from 'src/app/models/classes/UserAccount';

@Component({
  selector: 'app-skills-list',
  templateUrl: './skills-list.component.html',
  styleUrls: ['./skills-list.component.scss']
})
export class SkillsListComponent implements OnInit {

  @Input() user: UserAccount;

  constructor() { }

  ngOnInit(): void {
  }

}
