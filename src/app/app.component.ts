import { Component } from '@angular/core';
import { NavPath } from './components/navbar/navbar.component';
import { ApiService } from './services/api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private api: ApiService) { }

  offlineNav: NavPath[] = [
    { name: 'Home', path: '/', right: false },
    { name: 'All Projects', path: '/', right: false },
    { name: 'Login', path: '/', right: true },
    { name: 'Register', path: '/', right: true },
  ];

  onlineNav: NavPath[] = [
    { name: 'Logged !', path: '/', right: false },
  ];

  navs$: Promise<NavPath[]>;

  ngInit() {
    this.navs$ = this.api.isLogged().then(logged => logged ? this.onlineNav : this.offlineNav);
  }
}
