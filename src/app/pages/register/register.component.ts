import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiClient } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  error = false;

  constructor(
    private readonly apiClient: ApiClient,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    if (this.form.valid) {
      this.form.disable();
      if (await this.apiClient.register(
        this.form.value.firstname,
        this.form.value.lastname,
        this.form.value.username,
        this.form.value.password,
        this.form.value.email
      ))
        if (await this.router.navigateByUrl('/')) return;
      this.error = true;
      this.form.enable();
    }
  }

}
