import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public readonly usernameRegex: RegExp = /^[\w\d]{3,20}$/;
  public readonly passwordRegex: RegExp = /.{8,}/;

  constructor() { }
}
