import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
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

  loginForm: FormGroup;
  logSubscription: Subscription;
  hint: string = null;
  isBusy: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute) {

    this.loginForm = formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
    this.redirectTo = this.route.snapshot.queryParams['redirectTo'];
    console.log("login redirect to", this.redirectTo);
  }

  ngOnDestroy(): void {}

  onSubmit(data): void {
    console.log('logged as', data);
    this.isBusy = true;
    this.logSubscription = this.api.login(data.username, data.password)
      .subscribe(
        async result => {
          if (result) {
            await this.router.navigateByUrl(this.redirectTo).then(async success => { if(!success) await this.router.navigateByUrl('/'); });
          } else {
            this.hint = 'Username or password invalid.'
            this.isBusy = false;
          }
        },
        err => {
          console.error('on login submit', err);
          this.hint = 'An error occurs.'
          this.isBusy = false;
        });
  }
}