import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

type NavPath = {
  name: string;
  right: boolean;
} &
  (
    {
      type: "link";
      path: string;
    } |
    {
      type: "button";
      onClick: () => void;
      buttonType: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
    }
  );

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private readonly offlineNav: NavPath[] = [
    { type: 'link', name: 'Home', path: '/', right: false },
    { type: 'link', name: 'All Projects', path: '/', right: false },
    { type: 'link', name: 'Login', path: '/login', right: true },
    { type: 'link', name: 'Register', path: '/register', right: true },
  ];

  private readonly onlineNav: NavPath[] = [
    { type: 'link', name: 'Home', path: '/', right: false },
    { type: 'link', name: 'All Projects', path: '/', right: false },
    { type: 'link', name: 'Me', path: '/me', right: false },
    { type: 'button', name: 'Logout', onClick: () => this.logout(), buttonType: 'danger', right: true },
  ];

  leftNavs$: Promise<NavPath[]>;
  rightNavs$: Promise<NavPath[]>;

  searchForm: FormGroup;

  searchFocused = false;

  constructor(
    private readonly api: ApiService,
    private readonly router: Router,
    formBuilder: FormBuilder
  ) {
    this.searchForm = formBuilder.group({
      query: ''
    });
    this.api.logChanged.subscribe(logged => {
      this.setNavs(Promise.resolve(logged));
    })
  }

  ngOnInit() {
    this.setNavs(this.api.isLogged());
  }

  setNavs(logged: Promise<boolean>) {
    const navs = logged.then(logged => logged ? this.onlineNav : this.offlineNav);
    this.leftNavs$ = navs.then(navs => navs.filter(n => !n.right));
    this.rightNavs$ = navs.then(navs => navs.filter(n => n.right));
  }

  async logout() {
    await this.api.logout();
  }

  onSearchSubmit() {
    const query = this.searchForm.value.query;
    if (typeof query === "string" && query.length > 0) {
      this.searchForm.reset();
      this.router.navigateByUrl(`/search/${query}`);
    }
  }

}
