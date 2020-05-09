import { ApiService } from 'src/app/services/api.service';
import { DeletedDataError } from '../errors/DeletedDataError';
import { NotFoundApiError } from '../errors/NotFoundApiError';
import { Collectionable } from '../collections/CollectionBase';
import { ApiData } from '../api/ApiData';

export abstract class ApiObject<Data extends ApiData> implements Collectionable {

    public readonly id: number;
    private _deleted = false;

    constructor(
        protected readonly api: ApiService,
        data: Data,
    ) {
        this.id = data.id;
        this.setData(data);
    }

    protected abstract setData(data: Data): void;

    public abstract get endpoint(): string;

    get deleted() { return this._deleted; }

    async fetch() {
        if (this.deleted) throw new DeletedDataError();

        try {
            const data = await this.api.get<Data>(this.endpoint);
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

    async delete() {
        if (this.deleted) throw new DeletedDataError();
        await this.api.delete(this.endpoint);
        this._deleted = true;
    }
}
