import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/classes/Project';
import { User } from 'src/app/models/classes/User';
import { DeepReadonly } from 'src/app/models/utils/DeepReadonly';
import { Permissions } from 'src/app/models/api/Permissions';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { faEdit, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';

type MemberData = { user: User, permissions: DeepReadonly<Permissions>, disabled?: boolean, edit?: boolean, error?: boolean }

@Component({
  selector: 'app-project-members',
  templateUrl: './project-members.component.html',
  styleUrls: ['./project-members.component.scss']
})
export class ProjectMembersComponent implements OnInit {

  readonly permissionNames: { [key in Exclude<keyof Permissions, 'member_id' | 'project_id'>]: string } = {
    deposit_file: 'Deposit file',
    manage_members: 'Manage members',
    manage_permissions: 'Manage permissions',
    manage_project: 'Manager project',
    create_post: 'Create post',
    delete_file: 'Delete file',
  };

  project: Project;
  me: User;

  members$: Promise<MemberData[]>;

  searchUsers: User[] = [];
  searchSubscription: Subscription;
  searchFrom: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly users: UserService,
    private readonly search: SearchService,
    formBuilder: FormBuilder,
  ) {
    this.searchFrom = formBuilder.group({
      query: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.parent?.data.subscribe(
      (data: { project: Project, me: User }) => {
        this.project = data.project;
        this.me = data.me;
        this.updateMemberList();
      }
    )
  }

  updateMemberList() {
    this.members$ = this.users.getMany(this.project.memberIds)
      .then(
        members => members.map(
          m => {
            return {
              user: m,
              permissions: this.project.getPermissions(m.id)
            }
          }
        )
      );
  }

  cancelEdit(member: MemberData) {
    member.permissions = this.project.getPermissions(member.user.id);
    member.edit = false;
  }

  async submitPermissions(member: MemberData) {
    console.log('set permissions', member);
    member.disabled = true;
    if (await this.project.setPermissions(member.permissions)) {
      member.edit = false;
    } else {
      member.error = true;
    }
    member.disabled = false;
  }

  async removeMember(member: MemberData) {
    console.log('remove', member);
    member.disabled = true;
    if (await this.project.removeMember(member.user.id)) {
      this.updateMemberList();
    } else {
      console.error('fail to remove member');
      // TODO: display error
    }
    member.disabled = false;
  }

  async addMember(user: User, addButton: HTMLButtonElement) {
    addButton.disabled = true;
    if (await this.project.addMember(user.id)) {
      this.updateMemberList();
    } else {
      console.log('fail add member');
      addButton.disabled = false;
    }
  }

  onSearchMember() {
    console.log('on submit', this.searchFrom.value);
    if (this.searchFrom.valid) {
      this.searchFrom.disable();
      this.searchSubscription?.unsubscribe();
      this.searchUsers = [];
      this.searchSubscription = this.search.search(this.searchFrom.value.query)
        .pipe(
          filter(function (o): o is { type: 'user', value: User } { return o.type === 'user' }),
          filter(u => !this.project.memberIds.includes(u.value.id))
        )
        .subscribe(o => this.searchUsers.push(o.value));
      this.searchFrom.enable();
    }
  }

  // Icons
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faSave = faSave;
}
