import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-public',
  templateUrl: './project-public.component.html',
  styleUrls: ['./project-public.component.scss']
})
export class ProjectPublicComponent implements OnInit {

  private projectID;

  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.projectID = this.route.snapshot.params['id'];
  }

}
