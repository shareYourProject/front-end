import { Injectable } from '@angular/core';
import { DataResolver } from '../models/DataResolver';
import { User } from '../models/classes/User';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService extends DataResolver<User> {

  constructor(
    router: Router,
    private readonly users: UserService,
  ) { 
    super(router, 'user_id');
  }

  protected async getData(id: number) {
    return await this.users.get(id);
  }

}
