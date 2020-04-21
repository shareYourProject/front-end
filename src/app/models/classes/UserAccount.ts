import { AccountData } from '../api/account';
import { ApiService } from 'src/app/services/api.service';

export class UserAccount {

    private _id: number;
    private _username: string;
    private _email?: string;
    private _firstname?: string;
    private _lastname?: string;
    private _skills?: string[];
    private _biography?: string;
    private _links?: string[];
    private _projectIds?: number[];

    constructor(
        protected readonly api: ApiService,
        data: AccountData
    ) {
        this.fetch(data);
    }

    protected fetch(data: AccountData) {
        this._id = data.id;
        this._username = data.username;
        this._email = data.email;
        this._firstname = data.firstname;
        this._lastname = data.lastname;
        this._skills = data.skills;
        this._biography = data.biography;
        this._links = data.links;
        this._projectIds = data.project_ids;
    }

    get id() { return this._id; }

    get username() { return this._username; }

    get email() { return this._email; }

    get firstname() { return this._firstname; }

    get lastname() { return this._lastname; }

    get skills() { return this._skills; }

    get biography() { return this._biography; }

    get links() { return this._links; }

    get projectIds() { return this._projectIds; }

    // === API CALL ===================================================================================


    // === * =====================================================================================

}

export class UserAccountAPI extends UserAccount {

    constructor(
        api: ApiService,
        data: AccountData,
    ) {
        super(api, data);
    }

    fetch(data: AccountData) {
        super.fetch(data);
    }
}