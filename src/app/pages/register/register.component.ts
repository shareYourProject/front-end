import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  busy = false;

  constructor(
    private readonly api: ApiService,
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
      this.busy = true;
      if (await this.api.register(
        this.form.value.firstname,
        this.form.value.lastname,
        this.form.value.username,
        this.form.value.password,
        this.form.value.email
      ))
        this.router.navigateByUrl('/'); // return to home page.
      else
        this.busy = true;
    }
  }

}
