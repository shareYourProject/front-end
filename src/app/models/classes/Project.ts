import { ProjectData } from '../api/ProjectData';
import { UserAccountResolvable, resolveUserAccount } from '../resolvables/UserAccountResolvable';
import { MergeableApiObject } from './MergeableApiObject';
import { PermissionsCollection } from '../collections/PermissionsCollection';
import { ApiService } from 'src/app/services/api.service';
import { PermissionsData } from '../api/PermissionsData';
import { PostCollection } from '../collections/PostCollection';
import { DeletedDataError } from '../errors/DeletedDataError';
import { UserAccount } from './UserAccount';

interface MergeableProjectData {

}

export class Project extends MergeableApiObject<MergeableProjectData, ProjectData> {


    private _memberIds?: number[];
    private _name?: string;
    private _description?: string;
    private _links?: string[];
    private _visibility?: boolean;

    private readonly _permissions: PermissionsCollection;
    private readonly _posts: PostCollection;

    constructor(
        api: ApiService,
        data: ProjectData,
    ) {
        super(api, data);
        this._permissions = new PermissionsCollection(api, this);
        this._posts = new PostCollection(api, this);
    }

    protected setData(data: ProjectData) {
        this._memberIds = data.member_ids ? [...data.member_ids] : undefined;
        this._name = data.name;
        this._description = data.description;
        this._links = data.links ? [...data.links] : undefined;
        this._visibility = data.visibility;
    }

    protected mergeData(data: MergeableProjectData) {
        throw new Error("Method not implemented.");
    }
    
    protected getData() {
        return {
            name: this._name,
            description: this._description,
            links: this._links,
            visibility: this._visibility
        };
    }

    get endpoint() { return `project/${this.id}`; }

    get name() { return this._name; }

    get description() { return this._description; }

    get links(): ReadonlyArray<string> | undefined { return this._links; }

    get visibility() { return this._visibility; }

    get posts() { return this._posts; }

    async getMembers() {
        await this.fetch();
        if (this._memberIds)
            return (await Promise.all(this._memberIds.map(id => this.api.users.get(id).catch(() => {})))).filter(u => !!u) as UserAccount[];
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
        return this._posts.create(content);
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
}