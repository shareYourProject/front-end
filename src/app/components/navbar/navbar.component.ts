import { Component, OnInit, Input } from '@angular/core';

export interface NavPath {
  name: string,
  path: string,
  right: boolean
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() navs: NavPath[];

  constructor() { }

  ngOnInit(): void {
  }

}
