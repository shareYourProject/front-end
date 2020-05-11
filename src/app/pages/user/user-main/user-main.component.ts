import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss']
})
export class UserMainComponent implements OnInit {

  public routes = [
    { name: "Feed", path: "feed"}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
