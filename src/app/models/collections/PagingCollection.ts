import { ApiService } from 'src/app/services/api.service';
import { PagedData } from '../api/pagedData';
import { ApiData } from '../api/ApiData';
import { MergeableApiObject } from '../classes/MergeableApiObject';
import { ApiObject } from '../classes/ApiObject';



export abstract class PagingCollection<T extends ApiObject<Data>, Data extends ApiData> {

    protected cache = new Map<number, T>();

    private _currentPageUrl: string;


    constructor(
        protected readonly api: ApiService,
        route: string,
    ) {
        this._currentPageUrl = route;
    }

    get cached(): T[] { return Array.from(this.cache.values()); }

    async loadMore(): Promise<T[]> {
        const resonse = await this.api.get<PagedData<Data>>(this._currentPageUrl);
        this._currentPageUrl = resonse.data.length === resonse.per_page ? (resonse.next_page_url ?? this._currentPageUrl) : this._currentPageUrl;

        for (const data of resonse.data) {
            const item = this.cache.get(data.id);

            if (item)
                await item.fetch();
            else
                this.cache.set(data.id, await this.build(data));
        }

        return this.cached;
    }

    protected abstract build(data: Data): T | Promise<T>;

}