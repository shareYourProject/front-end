import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Collectionable<T extends Collectionable<T>> {
    fetch(): Observable<T>;
}

export abstract class CollectionServiceBase<Key, T extends Collectionable<T>> {

    protected cache = new Map<Key, T>();

    constructor() { }

    get(key: Key) {
        const cached = this.cache.get(key);

        if (cached)
            return cached.fetch().toPromise();
        return this
            .buildObject(key)
            .pipe(
                map(
                    o => {
                        this.cache.set(key, o);
                        return o;
                    }
                )
            ).toPromise();
    }

    protected abstract buildObject(key: Key): Observable<T>;
}