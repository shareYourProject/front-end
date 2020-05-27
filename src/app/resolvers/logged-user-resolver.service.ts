import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from '../models/classes/User';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserResolverService implements Resolve<User | null> {

  constructor(
    private readonly users: UserService,
    private readonly router: Router,
  ) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      return await this.users.fetchLoggedUser();
    } catch (e) {
      console.error('Fail to fetch logged user:', e);
      this.router.navigateByUrl('/');
      return null as any;
    }
  }
}
