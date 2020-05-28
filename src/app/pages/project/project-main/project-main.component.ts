import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/classes/Project';
import { ActivatedRoute } from '@angular/router';
import { faTachometerAlt, faHome, faSlidersH, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-main',
  templateUrl: './project-main.component.html',
  styleUrls: ['./project-main.component.scss']
})
export class ProjectMainComponent implements OnInit {

  project: Project;
  url: string;

  readonly navs: { name: string, url: string , icon: IconDefinition}[] = [
    { name: 'Dashboard', url: 'dashboard', icon: faHome },
    { name: 'Settings', url: 'settings', icon: faSlidersH }
  ]

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { project: Project }) => {
        console.log(data);
        this.project = data.project;
        this.url = `/project/${this.project.id}/`;
      }
    )
  }

  // Icons
  faTachometerAlt = faTachometerAlt;
}
