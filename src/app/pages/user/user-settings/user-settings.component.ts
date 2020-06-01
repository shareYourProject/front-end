import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/classes/User';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { faPlus, faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  // Icons
  faPlus = faPlus;
  faSave = faSave;
  faTrashAlt = faTrashAlt;

  user: User;
  form: FormGroup;
  result: "none" | "success" | "error" = "none";

  constructor(
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
  ) {
    this.form = formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      skills: formBuilder.array([]),
      biography: '',
      links: formBuilder.array([])
    })
  }

  get linksControl() { return (this.form.get('links') as FormArray); }

  get skillsControl() { return (this.form.get('skills') as FormArray); }


  ngOnInit(): void {
    this.route.parent?.data.subscribe(
      (data: { user: User }) => {
        this.user = data.user;
        this.patchForm();
      }
    );
  }

  private patchForm() {
    const data = this.user.getEditableData();
    this.form.patchValue(data);

    const skillsControl = this.skillsControl;
    for (const skills of data.skills)
      skillsControl.push(this.createSkill(skills));

    const linksControl = this.linksControl;
    for (const link of data.links)
      linksControl.push(this.createLink(link.key, link.value));
  }

  createSkill(value?: string) {
    return this.formBuilder.control(value ?? '');
  }

  createLink(key?: string, value?: string) {
    return this.formBuilder.group({
      key: key ?? '',
      value: value ?? '',
    });
  }

  addLink() {
    (this.form.get('links') as FormArray).push(this.createLink());
  }

  removeLink(i: number) {
    (this.form.get('links') as FormArray).removeAt(i);
  }

  addSkill() {
    (this.form.get('skills') as FormArray).push(this.createSkill());
  }

  removeSkill(i: number) {
    (this.form.get('skills') as FormArray).removeAt(i);
  }

  async submit() {
    if (this.form.valid) {
      this.form.disable();
      console.log('submit', this.form.value);
      this.result = (await this.user.update(this.form.value)) ? "success" : "error";
      this.form.enable();
    }
  }
}
