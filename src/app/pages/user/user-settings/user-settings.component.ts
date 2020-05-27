import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/classes/User';
import { IUserAccount } from 'src/app/models/objectInterfaces/IUserAccount';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  user: User;
  data: IUserAccount;

  firstName: string;

  form: FormGroup;

  busy = false;
  result: "none" | "success" | "error" = "none";

  constructor(
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.parent?.data.subscribe(
      (data: { user: User }) => {
        this.user = data.user;
        this.data = this.user.getEditableData();
      }
    );
  }

  async submit() {
    console.log('submit', this.data);
    this.busy = true;
    this.result = (await this.user.update(this.data)) ? "success" : "error";
    this.busy = false;
  }



}
