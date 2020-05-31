import { UserData } from '../api/UserData';
import { EditalbeApiObject } from './EditableApiObject';
import { IUser } from '../object interfaces/IUser';
import { DeepReadonly } from '../utils/DeepReadonly';
import { ApiClient } from 'src/app/services/api-client.service';
import { LinkData } from '../api/LinkData';

export class User extends EditalbeApiObject<IUser, UserData> implements DeepReadonly<IUser> {

    private _username: string;
    private _email?: string;
    private _firstname?: string;
    private _lastname?: string;
    private _skills: string[];
    private _biography?: string;
    private _links: LinkData[];
    private _projectIds: number[];
    private _followedProjectIds: number[];

    protected setData(data: UserData) {
        this._username = data.username;
        this._email = data.email;
        this._firstname = data.firstname;
        this._lastname = data.lastname;
        this._skills = data.skills ? [...data.skills] : [];
        this._biography = data.biography;
        this._links = data.links ? [...data.links] : []; //new Map(data.links ? data.links.map(l => [l.key, l.value]) : []);
        this._projectIds = data.project_ids ? [...data.project_ids] : [];
        this._followedProjectIds = data.followed_project_ids ? [...data.followed_project_ids] : [];
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
            links: [...this._links]
        }
    }

    getEditableData(): IUser {
        return {
            username: this.username,
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            skills: [...this.skills],
            biography: this.biography,
            links: [...this._links]
        }
    }

    protected setEditableData(data: IUser): void {
        this._username = data.username;
        this._email = data.email;
        this._firstname = data.firstname;
        this._lastname = data.lastname;
        this._skills = [...data.skills];
        this._biography = data.biography;
        this._links = [...data.links];
    }

    get endpoint() { return `/user/${this.id}`; }

    get username() { return this._username; }

    get email() { return this._email; }

    get firstname() { return this._firstname; }

    get lastname() { return this._lastname; }

    get skills() { return this._skills as ReadonlyArray<string>; }

    get biography() { return this._biography; }

    get links() { return this._links as readonly LinkData[]; }

    get profilePictureUrl() { return `${ApiClient.API_ROOT}/user/${this.id}/profilePicture/`; }

    get projectIds() { return this._projectIds as readonly number[]; }

    get followedProjectIds() { return this._followedProjectIds as readonly number[]; }
}