import { UserAccount } from './UserAccount';
import { Project } from './Project';
import { PermissionsData } from '../api/PermissionsData';
import {Collectionable} from '../Collections/CollectionBase';


export class Permissions implements Collectionable {

    constructor(
        public readonly project: Project,
        public readonly user: UserAccount,
        data: PermissionsData,
    ) {
        throw new Error("Not Implemted");
    }

    async fetch() {
        throw new Error("not implemented");
        return this;
    }

}