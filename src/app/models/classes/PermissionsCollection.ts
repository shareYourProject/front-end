import { CollectionBase } from '../collections/CollectionBase';
import {Permissions} from './Permissions';
import { Project } from './Project';
import { ApiService } from 'src/app/services/api.service';


export class PermissionsCollection extends CollectionBase<Permissions> {


    public constructor(
        api: ApiService,
        public readonly project: Project
    ) {
        super(api);
    }

    protected async buildObject(id: number) {
        throw new Error("Not implemented");
        return new Permissions(null as any, null as any, null as any);
    }

}