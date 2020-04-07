import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-main',
  templateUrl: './project-main.component.html',
  styleUrls: ['./project-main.component.scss']
})
export class ProjectMainComponent implements OnInit {

  projectID: string;

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectID = this.router.snapshot.params['id'];
  }

}
