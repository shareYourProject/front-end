import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-debug-nav',
  templateUrl: './debug-nav.component.html',
  styleUrls: ['./debug-nav.component.scss']
})
export class DebugNavComponent implements OnInit {

  navs = [
    { name: 'root', path: '/' },
    { name: 'login', path: '/login' },
    { name: 'register', path: '/register' },
    { name: 'me', path: '/me' },
    { name: 'user', path: '/user/0' },
    { name: 'project', path: '/project/0' },
    { name: 'project dashboard', path: '/project/0/dashboard' },
    { name: 'project settings', path: '/project/0/settings' },
    { name: 'post 0', path: '/project/0/post/0' },
    { name: 'post 1', path: '/project/0/post/1' },
  ];

  constructor() { }

  ngOnInit(): void {

  }

}
