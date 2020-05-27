import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, UrlSegmentGroup, DefaultUrlSerializer, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiClient } from '../services/api-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private api: ApiClient, private router: Router) { }

  private async can(redirectTo: string): Promise<boolean | UrlTree> {
    const isLogged = await this.api.isLogged();
    console.log("authGuard is logged ?", isLogged);
    if (isLogged)
      return true;
    else
      return this.router.parseUrl(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.can(state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.can(state.url);
  }

}
