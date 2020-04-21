import { ApiService } from './api.service';
import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Collectionable<T extends Collectionable<T>> {
    fetch(): Observable<T>;
}

export abstract class CollectionServiceBase<Key, Type extends Collectionable<Type>> {

    protected cache = new Map<Key, Type>();

    constructor() { }

    get(key: Key) {
        const cached = this.cache.get(key);

        if (cached)
            return cached.fetch();
        return this
            .buildObject()
            .pipe(
                map(
                    o => {
                        this.cache.set(key, o);
                        return o;
                    }
                )
            );
    }

    protected abstract buildObject(): Observable<Type>;

}