import { UserData } from '../api/UserData';
import { EditalbeApiObject } from './EditableApiObject';
import { IUserAccount } from '../objectInterfaces/IUserAccount';
import { DeepReadonly } from '../utils/DeepReadonly';
import { ApiClient } from 'src/app/services/api-client.service';

export class User extends EditalbeApiObject<IUserAccount, UserData> implements DeepReadonly<IUserAccount> {

    private _username: string;
    private _email?: string;
    private _firstname?: string;
    private _lastname?: string;
    private _skills: string[];
    private _biography?: string;
    private _links = new Map<string, string>();
    private _projectIds: number[];

    protected setData(data: UserData) {
        this._username = data.username;
        this._email = data.email;
        this._firstname = data.firstname;
        this._lastname = data.lastname;
        this._skills = data.skills ? [...data.skills] : [];
        this._biography = data.biography;
        this._links = new Map(data.links ? data.links.map(l => [l.key, l.value]) : []);
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
            links: Array.from(this._links.entries()).map(l => { return { key: l[0], value: l[1] } }),
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

    get profilePictureUrl() { return `${ApiClient.API_ROOT}/user/${this.id}/profilePicture/`; }

    get projectIds() { return this._projectIds as readonly number[]; }

}