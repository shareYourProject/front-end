import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate, CanActivateChild {

  constructor(
    private readonly projects: ProjectService,
    private readonly users: UserService,
    private readonly router: Router,
  ) {}

  private async allowed(route: ActivatedRouteSnapshot) {
    const { permissions } = route.data;
    if (!permissions) return true;

    const projectId = parseInt(route.paramMap.get('project_id') ?? '');
    if (!projectId) return false;
    const project = await this.projects.get(projectId);
    if (!project) return false;

    const me = await this.users.fetchLoggedUser();
    if (!me) return this.router.parseUrl('/project/' + project.id);

    const userPermissions = project.getPermissions(me.id);
    console.log(userPermissions);
    console.log(permissions);
    for (const k in userPermissions)
      if (permissions[k] && !userPermissions[k]) return this.router.parseUrl('/project/' + project.id);
    return true;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.allowed(next);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.allowed(next);
  }

}
