import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/classes/Project';
import { User } from 'src/app/models/classes/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project-public',
  templateUrl: './project-public.component.html',
  styleUrls: ['./project-public.component.scss']
})
export class ProjectPublicComponent implements OnInit {

  project: Project;
  members$: Promise<User[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly users: UserService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { project: Project }) => {
        this.project = data.project;
        this.members$ = this.users.getMany(this.project.memberIds);
      }
    );
  }
}
