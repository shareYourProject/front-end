import { UserAccountData } from '../api/account';
import { MergeableApiObject } from './MergeableApiObject';

export class UserAccount extends MergeableApiObject<UserAccountData, number> {

    private _username: string;
    private _email?: string;
    private _firstname?: string;
    private _lastname?: string;
    private _skills: string[];
    private _biography?: string;
    private _links: string[];
    private _projectIds: number[];

    protected setData(data: UserAccountData) {
        this._username = data.username;
        this._email = data.email;
        this._firstname = data.firstname;
        this._lastname = data.lastname;
        this._skills = data.skills ? [...data.skills] : [];
        this._biography = data.biography;
        this._links = data.links ? [...data.links] : [];
        this._projectIds = data.project_ids ? [...data.project_ids] : [];
    }

    protected getData(): UserAccountData {
        return {
            id: this.id,
            username: this._username,
            email: this._email,
            firstname: this._firstname,
            lastname: this._lastname,
            skills: this._skills,
            biography: this._biography,
            links: this._links,
            project_ids: this._projectIds,
        }
    }

    protected get endpoint() { return `user/${this.id}`; }

    get username() { return this._username; }

    get email() { return this._email; }

    get firstname() { return this._firstname; }

    get lastname() { return this._lastname; }

    get skills() { return this._skills as ReadonlyArray<string>; }

    get biography() { return this._biography; }

    get links() { return this._links as ReadonlyArray<string>; }

    get projectIds() { return this._projectIds as ReadonlyArray<number>; }

}