import { UserAccountData } from '../api/UserAccountData';
import { LinkData } from '../api/LinkData';
import { ApiService } from 'src/app/services/api.service';
import { EditalbeApiObject } from './EditableApiObject';
import { IUserAccount } from '../objectInterfaces/IUserAccount';
import { DeepReadonly } from '../utils/DeepReadonly';

export class UserAccount extends EditalbeApiObject<IUserAccount, UserAccountData> implements DeepReadonly<IUserAccount> {

    private _username: string;
    private _email?: string;
    private _firstname?: string;
    private _lastname?: string;
    private _skills: string[];
    private _biography?: string;
    private _links = new Map<string, string>();
    private _projectIds: number[];

    protected setData(data: UserAccountData) {
        this._username = data.username;
        this._email = data.email;
        this._firstname = data.firstname;
        this._lastname = data.lastname;
        this._skills = data.skills ? [...data.skills] : [];
        this._biography = data.biography;
        this._links = new Map(data.links ? data.links.map(l => [l.name, l.link]) : []);
        this._projectIds = data.project_ids ? [...data.project_ids] : [];
    }

    /*
    protected mergeData(data: MergeableUserAccountData) {
        this._username = data.username;
        this._email = data.email;
        this._firstname = data.firstname;
        this._lastname = data.lastname;
        this._skills = data.skills ? [...data.skills] : [];
        this._biography = data.biography;
        if (data.links)
            for (const l of data.links)
                this._links.set(l.name, l.link);
    }
    */

    protected getData() {
        return {
            id: this.id,
            username: this._username,
            email: this._email,
            firstname: this._firstname,
            lastname: this._lastname,
            skills: this._skills,
            biography: this._biography,
            links: Array.from(this._links.entries()).map(l => { return { name: l[0], link: l[1] } }),
        }
    }

    getEditableData(): IUserAccount {
        return {
            username: this.username,
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            skills: [...this.skills],
            biography: this.biography,
            links: new Map(this.links)
        }
    }

    protected setEditableData(data: IUserAccount): void {
        this._username = data.username;
        this._email = data.email;
        this._firstname = data.firstname;
        this._lastname = data.lastname;
        this._skills = [...data.skills];
        this._biography = data.biography;
        this._links = new Map(data.links);
    }

    get endpoint() { return `/user/${this.id}`; }

    get username() { return this._username; }

    get email() { return this._email; }

    get firstname() { return this._firstname; }

    get lastname() { return this._lastname; }

    get skills() { return this._skills as ReadonlyArray<string>; }

    get biography() { return this._biography; }

    get links() { return this._links as ReadonlyMap<string, string>; }

    get profilePictureUrl() { return `${ApiService.API_ROOT}/user/${this.id}/profilePicture/`; }

    async getProjects() {
        await this.fetch();
        return await Promise.all(this._projectIds.map(id => this.api.projects.get(id)));
    }
}