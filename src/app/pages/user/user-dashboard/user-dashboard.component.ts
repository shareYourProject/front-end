import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/classes/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  user: User;

  constructor(private readonly route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.parent?.data.subscribe(
      (data: { user: User }) => {
        this.user = data.user;
      }
    );
  }

}
