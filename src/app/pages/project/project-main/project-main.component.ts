import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/classes/Project';
import { ActivatedRoute } from '@angular/router';
import { faTachometerAlt, faHome, faSlidersH, faUsers, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/classes/User';
import { Permissions } from 'src/app/models/api/Permissions';

@Component({
  selector: 'app-project-main',
  templateUrl: './project-main.component.html',
  styleUrls: ['./project-main.component.scss']
})
export class ProjectMainComponent implements OnInit {

  // Icons
  faTachometerAlt = faTachometerAlt;

  project: Project;
  me: User | null;
  url: string;

  readonly navs: { name: string, url: string, icon: IconDefinition, condition?: () => boolean }[] = [
    { name: 'Dashboard', url: 'dashboard', icon: faHome },
    { name: 'Settings', url: 'settings', icon: faSlidersH, condition: () => this.hasPermission("manage_project") },
    { name: 'Members', url: 'members', icon: faUsers, condition: () => this.hasPermission("manage_members") }
  ]

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { project: Project, me: User | null }) => {
        console.log(data);
        this.project = data.project;
        this.me = data.me;
        this.url = `/project/${this.project.id}/`;
      }
    )
  }

  private hasPermission(p : Exclude<keyof Permissions, 'member_id' | 'project_id'>): boolean {
    return !!this.me && this.project.getPermissions(this.me.id)[p];
  }

}
