import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent implements OnInit {

  public projectID: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectID = parseInt(this.route.parent?.snapshot?.params?.id);
  }

}
