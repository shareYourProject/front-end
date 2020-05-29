import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ApiClient } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
@AutoUnsubscribe()
export class LoginComponent implements OnInit, OnDestroy {

  private _redirectTo: string;

  form: FormGroup;
  error = false;

  constructor(
    private apiClient: ApiClient,
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

  async onSubmit() {
    if (this.form.valid) {
      this.form.disable();
      if (await this.apiClient.login(this.form.value.username, this.form.value.password))
        if (await this.router.navigateByUrl(this._redirectTo)) return;
      this.error = true;
      this.form.enable();
    }
  }
}