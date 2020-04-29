import { ApiObject } from './ApiObject';
import { ApiService } from 'src/app/services/api.service';
import { PostBaseData } from '../api/PostBaseData';
import { UserAccount } from './UserAccount';

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

    get content() { return this._content; }

    get liked() {
        const userId = this.api.user?.id;
        return userId ? this._likes.includes(userId) : false;
    }

    async edit(content: string) {
        throw new Error("Not implemented");

        return await this.fetch();
    }

    async like() {
        throw new Error("Not implemented");


        return await this.fetch();
    }
}