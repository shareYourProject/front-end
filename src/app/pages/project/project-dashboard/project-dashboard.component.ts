import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  public projectID;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectID = this.route.parent.snapshot.params['id'];
  }

}
