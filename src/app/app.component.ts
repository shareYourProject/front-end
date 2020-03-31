import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public navs = [
    { name: 'Home', path: '/'},
    { name: 'Me', path: 'me/'},
    { name: 'User ID', path: 'user/0123456789'},
    { name: 'Project ID', path: 'project/0123456789'},
  ];

}
