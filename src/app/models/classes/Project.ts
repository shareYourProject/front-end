import { ProjectData } from '../api/ProjectData';
import { DeletedDataError } from '../errors/DeletedDataError';
import { DeepReadonly } from '../utils/DeepReadonly';
import { IProject } from '../object interfaces/IProject';
import { EditalbeApiObject } from './EditableApiObject';
import { ApiClient } from 'src/app/services/api-client.service';
import { LinkData } from '../api/LinkData';
import { Permissions, getPermissionsNone, getPermissionsFull } from '../api/Permissions';

export class Project extends EditalbeApiObject<IProject, ProjectData> implements DeepReadonly<IProject> {

    private _owner_id: number;
    private _memberIds: number[];
    private _name?: string;
    private _description?: string;
    private _links: LinkData[];
    private _visibility?: boolean;
    private _post_ids: number[];
    private _permissions: Map<number, DeepReadonly<Permissions>>;

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
        this._permissions = new Map(data.permissions ? data.permissions.map(p => [p.member_id, p]) : []);
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

    get ownerId() { return this._owner_id; }

    get name() { return this._name; }

    get description() { return this._description; }

    get links() { return this._links; }

    get visibility() { return this._visibility; }

    get postIds() { return this._post_ids as readonly number[]; }

    get memberIds() { return this._memberIds as readonly number[]; }

    get permissions() { return this._permissions; }

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

    getPermissions(memberId: number) {
        if (memberId === this._owner_id) return getPermissionsFull(memberId, this.id);
        return this.permissions.get(memberId) ?? getPermissionsNone(memberId, this.id);
    }

    async addMember(memberId: number) {
        if (this.deleted) throw new DeletedDataError();
        const result = await this.apiClient.post_void(this.endpoint + `/members/${memberId}`, {})
            .then(
                () => true,
                e => { console.error('add member', e); return false; }
            );
        await this.fetch();
        return result;
    }

    async removeMember(memberId: number) {
        if (this.deleted) throw new DeletedDataError();
        const result = await this.apiClient.delete(this.endpoint + `/members/${memberId}`).then(
            () => true,
            e => { console.error('remove member', e); return false; }
        );
        await this.fetch();
        return result;
    }

    async setPermissions(permissions: DeepReadonly<Permissions>) {
        if (this.deleted) throw new DeletedDataError();
        const result = await this.apiClient.put(this.endpoint + `/members/${permissions.member_id}`, permissions).then(() => true, e => { console.error('set permissions', e); return false; });
        await this.fetch();
        return result;
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