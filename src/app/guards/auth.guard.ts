import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, UrlSegmentGroup, DefaultUrlSerializer, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private api: ApiService, private router: Router) { }

  private can(redirectTo: string): Observable<boolean | UrlTree> {
    return this.api.isLogged()
      .pipe(
        map(isLogged => {
          if (isLogged)
            return true;
          else
            return this.router.parseUrl(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
        })
      );
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
