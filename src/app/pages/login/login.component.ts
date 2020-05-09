import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
@AutoUnsubscribe()
export class LoginComponent implements OnInit, OnDestroy {

  private redirectTo: string;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.redirectTo = this.route.snapshot.queryParams['redirectTo'];
    console.log("login redirect to", this.redirectTo);
  }

  ngOnDestroy(): void { }

}