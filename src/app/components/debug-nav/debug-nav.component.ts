import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-debug-nav',
  templateUrl: './debug-nav.component.html',
  styleUrls: ['./debug-nav.component.scss']
})
export class DebugNavComponent implements OnInit {

  navs = [
    {name: 'root', path: '/'},
    {name: 'login', path: '/login'},
    {name: 'register', path: '/register'},
    {name: 'me', path: '/me'},
    {name: 'user', path: '/user/0123456789'},
    {name: 'project', path: '/project/0123456789'},
  ];

  constructor() { }

  ngOnInit(): void {

  }

}
