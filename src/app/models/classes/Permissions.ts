import { UserAccount } from './UserAccount';
import { Project } from './Project';
import { PermissionsData } from '../api/PermissionsData';


export class Permissions {

    constructor(
        public readonly project: Project,
        public readonly user: UserAccount,
        data: PermissionsData,
    ) {
        
    }



}