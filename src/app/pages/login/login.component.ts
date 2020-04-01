import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService, LogResult } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  subscribe: Subscription;
  lastResult: LogResult = null;
  isBusy: boolean = false;

  constructor(formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscribe)
      this.subscribe.unsubscribe();
  }

  onSubmit(data): void {
    console.log('logged as', data);
    this.isBusy = true;
    this.subscribe = this.authService.log(data.username, data.password)
      .subscribe(
        result => {
          if (result === LogResult.Success) {
            this.router.navigateByUrl('/');
          } else {
            this.lastResult = result;
            this.subscribe.unsubscribe();
            this.subscribe = null;
            this.isBusy = false;
          }
        },
        e => {
          this.lastResult = LogResult.Error;
          this.isBusy = false;
        });
  }
}