import { ApiService } from 'src/app/services/api.service';
import { DeletedDataError } from '../errors/DeletedDataError';
import { NotFoundApiError } from '../errors/NotFoundApiError';
import { Collectionable } from '../Collections/CollectionBase';

export abstract class ApiObject<Data> implements Collectionable  {

    private _deleted = false;

    constructor(
        protected readonly api: ApiService,
    ) { 
    }

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

       for (const key of (Object.keys(merged) as (keyof Data)[])) {
            const d = data[key];
            if (d !== undefined)
                merged[key] = d as any; // read : https://github.com/microsoft/TypeScript/issues/10530
        }

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
