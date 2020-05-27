import { DeletedDataError } from '../errors/DeletedDataError';
import { NotFoundApiError } from '../errors/NotFoundApiError';
import { ApiData } from '../api/ApiData';
import { ApiClient } from 'src/app/services/api-client.service';

export abstract class ApiObject<Data extends ApiData> {

    public readonly id: number;
    private _deleted = false;

    constructor(
        protected readonly apiClient: ApiClient,
        data: Data,
    ) {
        this.id = data.id;
        this.setData(data);
    }

    protected abstract setData(data: Data): void;

    protected abstract getData(): Data;

    public abstract get endpoint(): string;

    get deleted() { return this._deleted; }

    async fetch() {
        if (this.deleted) throw new DeletedDataError();

        try {
            const data = await this.apiClient.get<Data>(this.endpoint);
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
        await this.apiClient.delete(this.endpoint);
        this._deleted = true;
    }

    merge(data: Partial<Data>) {
        if (this.deleted) throw new DeletedDataError();
        if (data.id && data.id !== this.id) throw new Error('Invalid merge data.');
        this.setData(Object.assign(this.getData(), data));
        return this;
    }
}
