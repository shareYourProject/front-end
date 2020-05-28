import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/classes/Project';
import { IProject } from 'src/app/models/object interfaces/IProject';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent implements OnInit {

  project: Project;
  data: IProject;

  busy = false;
  result: "none" | "success" | "error" = "none";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent?.data.subscribe(
      (data: { project: Project }) => {
        this.project = data.project;
        this.data = this.project.getEditableData();
      }
    )
  }

  async submit() {
    console.log('submit', this.data);
    this.busy = true;
    this.data.links = undefined as any; // TODO : https://github.com/shareYourProject/back-end/issues/62
    this.result = (await this.project.update(this.data)) ? "success" : "error";
    this.busy = false;
  }
}
