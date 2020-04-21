import { ApiService } from 'src/app/services/api.service';
import { DeletedDataError } from '../errors/DeletedDataError';
import { NotFoundApiError } from '../errors/NotFoundApiError';


export abstract class ApiObject<Data> {

    private _deleted = false;

    constructor(
        protected readonly api: ApiService,
    ) { }

    protected abstract setData(data: Data): void;

    protected abstract getData(): Data;

    protected abstract get endpoint(): string;

    get deleted() { return this._deleted; }

    async fetch() {
        if (this.deleted) throw new DeletedDataError();

        try {
            const data = await this.api.get<Data>(this.endpoint).toPromise();
            if (!data)
                throw new Error('Fetching fail.');
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

    async edit(data: Partial<Data>) {
        if (this.deleted) throw new DeletedDataError();

        const merged = this.getData();

        /*
        merged.username = data.username ?? this._username;
        merged.email = data.email ?? this._email;
        merged.firstname = data.firstname ?? this._firstname;
        merged.lastname = data.lastname ?? this._lastname;
        merged.skills = data.skills ?? this._skills;
        merged.biography = data.biography ?? this._biography;
        merged.links = data.links ?? this._links;
        merged.project_ids = data.project_ids ?? this._projectIds;
        */

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