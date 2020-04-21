import { UserAccountData } from '../api/account';
import { ApiService } from 'src/app/services/api.service';
import { Collectionable } from 'src/app/services/CollectionServiceBase';
import { ProjectData } from '../api/project';

export class Project implements Collectionable<Project> {

    constructor(
        private readonly api: ApiService,
        data: ProjectData
    ) {

    }

    private setData(data: ProjectData) {
        // TODO
    }

    private getData(): ProjectData {
        // TODO
    }  

    async fetch() {
        // TODO
        

        return this;
    }

    async edit(data: Partial<UserAccountData>) {
        // TODO
    }

    async delete() {
        // TODO
    }

}