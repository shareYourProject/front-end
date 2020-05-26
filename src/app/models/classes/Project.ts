import { ProjectData } from '../api/ProjectData';
import { UserAccountResolvable, resolveUserAccount } from '../resolvables/UserAccountResolvable';
import { PermissionsCollection } from '../collections/PermissionsCollection';
import { ApiService } from 'src/app/services/api.service';
import { PermissionsData } from '../api/PermissionsData';
import { PostCollection } from '../collections/PostCollection';
import { DeletedDataError } from '../errors/DeletedDataError';
import { UserAccount } from './UserAccount';
import { ApiObject } from './ApiObject';
import { DeepReadonly } from '../utils/DeepReadonly';
import { IProject } from '../objectInterfaces/IProject';
import { EditalbeApiObject } from './EditableApiObject';
import { NotLoggedError } from '../errors/NotLoggedError';

export class Project extends EditalbeApiObject<IProject, ProjectData> implements DeepReadonly<IProject> {

    private _memberIds?: number[];
    private _name?: string;
    private _description?: string;
    private _links = new Map<string, string>();
    private _visibility?: boolean;
    private _post_ids: number[];

    private readonly _permissions: PermissionsCollection;

    constructor(
        api: ApiService,
        data: ProjectData,
    ) {
        super(api, data);
        this._permissions = new PermissionsCollection(api, this);
    }

    protected setData(data: ProjectData) {
        this._memberIds = data.member_ids ? [...data.member_ids] : undefined;
        this._name = data.name;
        this._description = data.description;
        this._links = new Map(data.links ? data.links.map(l => [l.key, l.value]) : []);
        this._visibility = data.visibility;
        this._post_ids = data.post_ids ? [...data.post_ids] : [];
    }

    protected getData() {
        return {
            id: this.id,
            name: this._name,
            description: this._description,
            links: Array.from(this._links.entries()).map(l => { return {key: l[0], value: l[1] } }),
            visibility: this._visibility
        };
    }

    get endpoint() { return `/project/${this.id}`; }

    get name() { return this._name; }

    get description() { return this._description; }

    get links() { return this._links as ReadonlyMap<string, string>; }

    get visibility() { return this._visibility; }

    get postIds() { return this._post_ids as readonly number[]; }

    getEditableData(): IProject {
        return {
            name: this._name,
            description: this._description,
            links: new Map(this._links),
            visibility: this._visibility,
        }
    }

    protected setEditableData(data: IProject): void {
        this._name = data.name;
        this._description = data.description;
        this._links = new Map(data.links);
        this._visibility = data.visibility;
    }

    async getMembers() {
        await this.fetch();
        if (this._memberIds)
            return (await Promise.all(this._memberIds.map(id => this.api.collections.users.get(id).catch(() => { })))).filter(u => !!u) as UserAccount[];
        else
            return [];
    }

    async addMember(member: UserAccountResolvable) {
        if (this.deleted) throw new DeletedDataError();
        await this.api.post(this.endpoint + '/members', { userId: resolveUserAccount(member) });
        return await this.fetch();
    }

    async removeMember(member: UserAccountResolvable) {
        if (this.deleted) throw new DeletedDataError();
        await this.api.delete(this.endpoint + `/members/${resolveUserAccount(member)}`);
        return await this.fetch();
    }

    async createPost(content: string) {
        if (this.deleted) throw new DeletedDataError();
        return this.api.collections.posts.create(this, content);
    }

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

    async follow() {
        if (this.deleted) throw new DeletedDataError();
        if (!this.api.user) throw new NotLoggedError();
        try {
            await this.api.put(this.endpoint + '/follow', {});
        } catch (e) {
            console.error('project follow', e);
            return false;
        }
        await this.fetch();
        return true;
    }

    async unfollow() {
        if (this.deleted) throw new DeletedDataError();
        if (!this.api.user) throw new NotLoggedError();
        try {
            await this.api.put(this.endpoint + '/unfollow', {});
        } catch (e) {
            console.error('project unfollow', e);
            return false;
        }
        await this.fetch();
        return true;
    }
}