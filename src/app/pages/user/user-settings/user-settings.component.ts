import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/classes/User';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  user: User;

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent?.data.subscribe(
      (data: { user: User }) => {
        this.user = data.user;
      }
    );
  }

}
