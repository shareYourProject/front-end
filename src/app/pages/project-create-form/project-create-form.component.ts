import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/classes/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { retryWhen } from 'rxjs/operators';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-create-form',
  templateUrl: './project-create-form.component.html',
  styleUrls: ['./project-create-form.component.scss']
})
export class ProjectCreateFormComponent implements OnInit {

  me: User;
  form: FormGroup;
  error = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly projects: ProjectService,
    formBuilder: FormBuilder,
  ) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { me: User }) => {
        this.me = data.me;
      }
    )
  }

  async onSubmit() {
    if (this.form.valid) {
      this.form.disable();

      const project = await this.projects.create(this.form.value.name, this.form.value.description);
      if (project) {
        if (await this.router.navigateByUrl(`/project/${project.id}/dashboard`)) return;
      }

      this.error = true;
      this.form.enable();
    }
  }

  // Icons
  faArrowRight = faArrowRight;
}
