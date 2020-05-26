import { ApiObject } from '../classes/ApiObject';
import { ApiData } from '../api/ApiData';
import { CollectionBase } from './CollectionBase';

export abstract class ApiCollection<T extends ApiObject<Data>, Data extends ApiData> extends CollectionBase<T>  {

    async merge(data: Data) {
        let cached = this.cache.get(data.id);

        if (cached) {
            cached.merge(data);
        } else {
            cached = await this.buildObjectFromData(data);
            this.cache.set(data.id, cached);
        }

        return cached;
    }

    protected abstract buildObjectFromData(data: Data): Promise<T> | T;
}