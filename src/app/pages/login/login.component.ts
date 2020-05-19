import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  private _redirectTo: string;

  form: FormGroup;
  busy = false;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this._redirectTo = this.route.snapshot.queryParams['redirectTo'];
    console.log("login redirect to", this._redirectTo);
  }

  ngOnDestroy(): void { }

  onSubmit() {
    if (this.form.valid) {
      console.log("Login", this.form.value);
      this.busy = true;
      this.api.login(this.form.value.username, this.form.value.password)
        .then(logged => {
          console.log("logged ?", logged);
          if (logged)
            this.router.navigateByUrl(this._redirectTo)
          else
            this.busy = false;
        });
    }
  }
}