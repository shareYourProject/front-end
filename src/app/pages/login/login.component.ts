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
  logSubscription: Subscription;
  hint: string = null;
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
    if (this.logSubscription)
      this.logSubscription.unsubscribe();
  }

  private setHint(result: LogResult): string {
    switch (result) {
      case LogResult.UnknownUsername: return "There is no account with this username.";
      case LogResult.WrongPassword: return "Wrong password.";
      case LogResult.Error: return "Unknown error occurs.";
    }
  }

  onSubmit(data): void {
    console.log('logged as', data);
    this.isBusy = true;
    this.logSubscription = this.authService.log(data.username, data.password)
      .subscribe(
        result => {
          if (result === LogResult.Success) {
            this.router.navigateByUrl('/');
          } else {
            this.setHint(result);
            this.isBusy = false;
          }
        },
        e => {
          console.error('on login submit', e);
          this.setHint(LogResult.Error);
          this.isBusy = false;
        });
  }
}