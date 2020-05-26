import { CollectionBase } from './CollectionBase';
import { Permissions } from '../classes/Permissions';
import { Project } from '../classes/Project';
import { ApiService } from 'src/app/services/api.service';
import { PermissionsData } from '../api/PermissionsData';

export class PermissionsCollection extends CollectionBase<Permissions> {

    public constructor(
        api: ApiService,
        public readonly project: Project
    ) {
        super(api);
    }

    protected async buildObject(id: number) {
        const user = await this.api.collections.users.get(id);
        const data = await this.api.get<PermissionsData>(`/project/${this.project.id}/permissions/${user.id}`);
        return new Permissions(this.api, this.project, user, data);
    }

}