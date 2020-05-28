import { ProjectData } from '../api/ProjectData';
import { UserAccountResolvable, resolveUserAccount } from '../resolvables/UserAccountResolvable';
import { DeletedDataError } from '../errors/DeletedDataError';
import { DeepReadonly } from '../utils/DeepReadonly';
import { IProject } from '../object interfaces/IProject';
import { EditalbeApiObject } from './EditableApiObject';
import { ApiClient } from 'src/app/services/api-client.service';
import { LinkData } from '../api/LinkData';

export class Project extends EditalbeApiObject<IProject, ProjectData> implements DeepReadonly<IProject> {

    private _owner_id: number;
    private _memberIds: number[];
    private _name?: string;
    private _description?: string;
    private _links: LinkData[];
    private _visibility?: boolean;
    private _post_ids: number[];

    constructor(
        apiClient: ApiClient,
        data: ProjectData
    ) {
        super(apiClient, data);
    }

    protected setData(data: ProjectData) {
        this._owner_id = data.owner_id;
        this._memberIds = data.member_ids ? [...data.member_ids, data.owner_id] : [data.owner_id];
        this._name = data.name;
        this._description = data.description;
        this._links = data.links ? [...data.links] : [];
        this._visibility = data.visibility;
        this._post_ids = data.post_ids ? [...data.post_ids] : [];
    }

    protected getData() {
        return {
            id: this.id,
            owner_id: this._owner_id,
            name: this._name,
            description: this._description,
            links: [...this._links],
            visibility: this._visibility
        };
    }

    get endpoint() { return `/project/${this.id}`; }

    get name() { return this._name; }

    get description() { return this._description; }

    get links() { return this._links as readonly LinkData[];}

    get visibility() { return this._visibility; }

    get postIds() { return this._post_ids as readonly number[]; }

    get memberIds() { return this._memberIds as readonly number[]; }

    getEditableData(): IProject {
        return {
            name: this._name,
            description: this._description,
            links: [...this._links],
            visibility: this._visibility,
        }
    }

    protected setEditableData(data: IProject): void {
        this._name = data.name;
        this._description = data.description;
        this._links = [...data.links];
        this._visibility = data.visibility;
    }

    async addMember(member: UserAccountResolvable) {
        if (this.deleted) throw new DeletedDataError();
        await this.apiClient.post(this.endpoint + '/members', { userId: resolveUserAccount(member) });
        return await this.fetch();
    }

    async removeMember(member: UserAccountResolvable) {
        if (this.deleted) throw new DeletedDataError();
        await this.apiClient.delete(this.endpoint + `/members/${resolveUserAccount(member)}`);
        return await this.fetch();
    }

    /*
    async getPermissionsFor(user: UserAccountResolvable) {
        if (this.deleted) throw new DeletedDataError();
        return await this._permissions.get(resolveUserAccount(user));
    }

    async setPermisisonsFor(user: UserAccountResolvable, permissions: PermissionsData) {
        if (this.deleted) throw new DeletedDataError();
        const userID = resolveUserAccount(user);
        await this.api.put(this.endpoint + `/permissions/${userID}`, permissions);
        return await this._permissions.get(userID);
    }
    */

    async follow() {
        if (this.deleted) throw new DeletedDataError();
        try {
            await this.apiClient.put(this.endpoint + '/follow', {});
        } catch (e) {
            console.error('project follow', e);
            return false;
        }
        await this.fetch();
        return true;
    }

    async unfollow() {
        if (this.deleted) throw new DeletedDataError();
        try {
            await this.apiClient.put(this.endpoint + '/unfollow', {});
        } catch (e) {
            console.error('project unfollow', e);
            return false;
        }
        await this.fetch();
        return true;
    }
}