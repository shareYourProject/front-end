import { ApiObject } from './ApiObject';
import { ApiService } from 'src/app/services/api.service';
import { PostData, PostBaseData } from '../api/post';
import { ThrowStmt } from '@angular/compiler';

// WIP

export abstract class PostBase<Data extends PostBaseData> extends ApiObject<Data, number> {

    public readonly author_id: number;
    private _content: string;
    private _likeCount: number;

    constructor(
        api: ApiService,
        data: Data,
    ) {
        super(api, data);
        this.author_id = data.author_id;
    }

    protected setData(data: Data) {
        this._content = data.content;
        this._likeCount = data.nb_like;
    }

    get content() { return this._content; }

    get likeCount() { return this._likeCount; }

    async edit(content: string) {
        throw new Error("Not implemented");
    }

}