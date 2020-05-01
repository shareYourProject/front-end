import { ApiObject } from './ApiObject';
import { ApiService } from 'src/app/services/api.service';
import { PostBaseData } from '../api/PostBaseData';
import { UserAccount } from './UserAccount';
import { NotLoggedError } from '../errors/NotLoggedError';
import { DeletedDataError } from '../errors/DeletedDataError';

// WIP

export abstract class PostBase<Data extends PostBaseData> extends ApiObject<Data> {

    private _content: string;
    private _likes: number[];

    constructor(
        api: ApiService,
        data: Data,
        public readonly author: UserAccount,
    ) {
        super(api, data);
    }

    protected setData(data: Data) {
        this._content = data.content;
        this._likes = data.likes;
    }

    protected abstract get directEndpoit(): string;

    get content() { return this._content; }

    get liked() {
        const userId = this.api.user?.id;
        return userId ? this._likes.includes(userId) : false;
    }

    async edit(content: string) {
        if (this.deleted) throw new DeletedDataError();
        await this.api.put(this.directEndpoit, { content });
        return this.fetch();
    }

    async like() {
        if (this.deleted) throw new DeletedDataError();
        if (!this.api.user) throw new NotLoggedError();
        await this.api.put(this.directEndpoit + '/like', { userId: this.api.user.id });
        return await this.fetch();
    }

    async unlike() {
        if (this.deleted) throw new DeletedDataError();
        if (!this.api.user) throw new NotLoggedError();
        await this.api.put(this.directEndpoit + '/unlike', { userId: this.api.user.id });
        return await this.fetch();
    }
}