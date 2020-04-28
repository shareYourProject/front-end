import { ProjectData } from '../api/ProjectData';
import { UserAccountResolvable, resolveUserAccount } from '../resolvables/UserAccountResolvable';
import { MergeableApiObject } from './MergeableApiObject';
import { PermissionsData } from '../api/Permissions';

interface MergeableProjectData {

}

export class Project extends MergeableApiObject<MergeableProjectData, ProjectData> {

    private _memberIds?: number[];
    private _name?: string;
    private _description?: string;
    private _links?: string[];
    private _visibility?: boolean;

    protected setData(data: ProjectData) {
        this._memberIds = data.member_ids ? [...data.member_ids] : undefined;
        this._name = data.name;
        this._description = data.description;
        this._links = data.links ? [...data.links] : undefined;
        this._visibility = data.visibility;
    }

    protected getData() {
        return {
            id: this.id,
            member_ids: this._memberIds,
            name: this._name,
            description: this._description,
            links: this._links,
            visibility: this._visibility
        };
    }

    protected get endpoint() { return `project/${this.id}`; }

    get name() { return this._name; }

    get description() { return this._description; }

    get links(): ReadonlyArray<string> | undefined { return this._links; }

    get visibility() { return this._visibility; }

    async addMember(member: UserAccountResolvable) {
        await this.api.post(this.endpoint + '/members', { userId: resolveUserAccount(member) });
        return await this.fetch();
    }

    async removeMember(member: UserAccountResolvable) {
        await this.api.delete(this.endpoint + `/members/${resolveUserAccount(member)}`);
        return await this.fetch();
    }

    async createPost(content: string) {
        throw new Error("Not Implemented");
    }
}