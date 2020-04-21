import { ApiService } from './api.service';


export abstract class CollectionServiceBase<K, T> {

    protected _cache = new Map<K, T>();

    constructor(
        api: ApiService,
    ) {

    }

    get(key: K) {
       

    }



}