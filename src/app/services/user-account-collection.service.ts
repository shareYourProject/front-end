import { Injectable } from '@angular/core';
import { extname } from 'path';
import { CollectionServiceBase } from './CollectionServiceBase';
import { UserAccount } from '../models/classes/UserAccount';

@Injectable({
  providedIn: 'root'
})
export class UserAccountCollectionService extends CollectionServiceBase<number, UserAccount> {

  constructor(

  ) {
    super()
   }
}
