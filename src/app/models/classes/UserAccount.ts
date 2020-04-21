import { UserAccountData } from '../api/account';
import { ApiService } from 'src/app/services/api.service';
import { Collectionable } from 'src/app/models/Collections/CollectionBase';
import { DeletedDataError } from '../errors/DeletedDataError';
import { NotFoundApiError } from '../errors/NotFoundApiError';

export class UserAccount implements Collectionable<UserAccount> {

    private readonly _id: number;
    private _username: string;
    private _email?: string;
    private _firstname?: string;
    private _lastname?: string;
    private _skills: string[];
    private _biography?: string;
    private _links: string[];
    private _projectIds: number[];

    private _deleted: boolean;

    constructor(
        private readonly api: ApiService,
        data: UserAccountData
    ) {
        this._id = data.id;
        this.setData(data);
    }

    private setData(data: UserAccountData) {
        this._username = data.username;
        this._email = data.email;
        this._firstname = data.firstname;
        this._lastname = data.lastname;
        this._skills = data.skills ? [...data.skills] : [];
        this._biography = data.biography;
        this._links = data.links ? [...data.links] : [];
        this._projectIds = data.project_ids ? [...data.project_ids] : [];
    }

    private getData(): UserAccountData {
        return {
            id: this._id,
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

    private get endpoint() { return `user/${this.id}`; }

    get id() { return this._id; }

    get username() { return this._username; }

    get email() { return this._email; }

    get firstname() { return this._firstname; }

    get lastname() { return this._lastname; }

    get skills() { return this._skills as ReadonlyArray<string>; }

    get biography() { return this._biography; }

    get links() { return this._links as ReadonlyArray<string>; }

    get projectIds() { return this._projectIds as ReadonlyArray<number>; }

    get deleted() { return this._deleted; }

    async fetch() {
        if (this.deleted) throw new DeletedDataError();

        try {
            const data = await this.api.get<UserAccountData>(this.endpoint).toPromise();
            if (!data)
                throw new Error('Fail to fetch user.');
            this.setData(data);
            return this;
        } catch (error) {
            if (error instanceof NotFoundApiError) {
                this._deleted = true;
                return this;
            } else
                throw error;
        }
    }

    async edit(data: Partial<UserAccountData>) {
        if (this.deleted) throw new DeletedDataError();

        const merged = this.getData();

        merged.username = data.username ?? this._username;
        merged.email = data.email ?? this._email;
        merged.firstname = data.firstname ?? this._firstname;
        merged.lastname = data.lastname ?? this._lastname;
        merged.skills = data.skills ?? this._skills;
        merged.biography = data.biography ?? this._biography;
        merged.links = data.links ?? this._links;
        merged.project_ids = data.project_ids ?? this._projectIds;

        await this.api.put(this.endpoint, merged).toPromise();
        this.setData(merged);
        return this;
    }

    async delete() {
        if (this.deleted) throw new DeletedDataError();
        await this.api.delete(this.endpoint).toPromise();
        this._deleted = true;
    }
}