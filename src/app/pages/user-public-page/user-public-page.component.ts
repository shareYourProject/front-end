import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-public-page',
  templateUrl: './user-public-page.component.html',
  styleUrls: ['./user-public-page.component.scss']
})
export class UserPublicPageComponent implements OnInit {

  userID: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userID = this.route.snapshot.params['id'];
  }

}
