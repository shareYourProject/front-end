import { ApiData } from '../api/ApiData';
import { CollectionBase, } from './CollectionBase';
import { MergeableApiObject } from '../classes/MergeableApiObject';


export abstract class MergeableCollection<
    T extends MergeableApiObject<MergeableData, Data>,
    MergeableData,
    Data extends MergeableData & ApiData
    > extends CollectionBase<T> {

    merge(data: Data) {
        let cached = this.cache.get(data.id);

        if (cached) {
          cached.merge(data);
        } else {
          cached = this.buildObjectFromData(data);
          this.cache.set(data.id, cached);
        }
    
        return cached;
    }

    protected abstract buildObjectFromData(data: Data): T;
}