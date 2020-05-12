import { Component, OnInit } from '@angular/core';
import { NavPath } from './components/navbar/navbar.component';
import { ApiService } from './services/api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private readonly api: ApiService) { console.log("SALUT CTOR"); }

  private readonly offlineNav: NavPath[] = [
    { name: 'Home', path: '/', right: false },
    { name: 'All Projects', path: '/', right: false },
    { name: 'Login', path: '/', right: true },
    { name: 'Register', path: '/', right: true },
  ];

  private readonly onlineNav: NavPath[] = [
    { name: 'Logged !', path: '/', right: false },
  ];

  navs$: Promise<NavPath[]>;

  ngOnInit() {
    console.log("SALUT");
    this.navs$ = this.api.isLogged().then(logged => logged ? this.onlineNav : this.offlineNav);
    this.navs$.then(p => console.log(p));
  }
}
