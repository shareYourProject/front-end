import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  public projectID: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectID = parseInt(this.route.parent?.snapshot?.params?.id);
  }

}
