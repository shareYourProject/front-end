import { User } from './User';
import { Project } from './Project';
import { PermissionsData } from '../api/PermissionsData';
import { ApiClient } from 'src/app/services/api-client.service';


export class Permissions {

    private _deleteFile: boolean;
    private _depositFile: boolean;
    private _createPost: boolean;
    private _managePermission: boolean;
    private _manageProject: boolean;
    private _manageMembers: boolean;
    private _accessibleFiles: Object;

    constructor(
        public readonly api: ApiClient,
        public readonly project: Project,
        public readonly user: User,
        data: PermissionsData,
    ) {
        this.setData(data);
    }

    private setData(data: PermissionsData) {
        this._deleteFile = data.delete_file;
        this._depositFile = data.deposit_file;
        this._createPost = data.create_post;
        this._managePermission = data.manage_permission;
        this._manageProject = data.manage_project;
        this._manageMembers = data.manage_members;
        this._accessibleFiles = data.accessible_files;
    }

    get deleteFile() { return this._deleteFile; }
    get depositFile() { return this._depositFile; }
    get createPost() { return this._createPost; }
    get menagePermission() { return this._managePermission; }
    get manageProject() { return this._manageProject; }
    get manageMemebers() { return this._manageMembers; }
    get accessibleFiles() { return this._accessibleFiles; }

    async fetch() {
        const data = await this.api.get<PermissionsData>(`/project/${this.project.id}/permissions/${this.user.id}`);
        this.setData(data);
        return this;
    }

}