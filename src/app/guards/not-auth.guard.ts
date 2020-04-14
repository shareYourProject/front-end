import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate, CanActivateChild {

  constructor(private api: ApiService, private router: Router) { }

  private can(): Observable<boolean | UrlTree> {
    return this.api.isLogged()
      .pipe(
        map(isLogged => {
          return !isLogged;
          /*if (!isLogged)
            return true;
          else
            return this.router.parseUrl("/");*/
        })
      );
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.can();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.can();
  }
}
