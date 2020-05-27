import { PostBaseData } from '../api/PostBaseData';
import { User } from './User';
import { DeletedDataError } from '../errors/DeletedDataError';
import { ApiObject } from './ApiObject';
import { ApiClient } from 'src/app/services/api-client.service';

export interface PostBase {
    readonly likerIds: readonly number[];
    readonly content: string;
    edit(content: string): Promise<this>;
    like(): Promise<this>;
    unlike(): Promise<this>;
}

export abstract class PostBaseObject<Data extends PostBaseData> extends ApiObject<Data> implements PostBase {

    protected _content: string;
    protected _likes: number[];

    constructor(
        apiClient: ApiClient,
        data: Data,
        public readonly author: User,
    ) {
        super(apiClient, data);
    }

    protected setData(data: Data) {
        this._content = data.content;
        this._likes = data.user_ids ? [...data.user_ids] : [];
    }

    get likerIds() { return this._likes as readonly number[]; }

    get content() { return this._content; }

    async edit(content: string) {
        if (this.deleted) throw new DeletedDataError();
        await this.apiClient.put(this.endpoint, { content });
        return this.fetch();
    }

    async like() {
        if (this.deleted) throw new DeletedDataError();
        await this.apiClient.put(this.endpoint + '/like', {});
        return await this.fetch();
    }

    async unlike() {
        if (this.deleted) throw new DeletedDataError();
        await this.apiClient.put(this.endpoint + '/unlike', {});
        return await this.fetch();
    }
}