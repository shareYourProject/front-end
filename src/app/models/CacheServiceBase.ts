import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiClient } from '../services/api-client.service';

export interface Collectionable {
    fetch(): Promise<this>;
}

export abstract class CacheServiceBase<T extends Collectionable> implements Iterable<T> {

    protected cache = new Map<number, T>();

    constructor(
        protected readonly apiClient: ApiClient,
    ) { }

    [Symbol.iterator](): Iterator<T, any, undefined> {
        return this.cache.values();
    }

    protected abstract buildObject(key: number): Promise<T> | T;

    async get(key: number) {
        const cached = this.cache.get(key);

        if (cached)
            return await cached.fetch();

        const o = await this.buildObject(key);
        this.cache.set(key, o);
        return o;
    }

    getMany(keys: readonly number[]): Promise<T[]> {
        return Promise.all(
            keys.map(k => this.get(k).catch(() => { }))
        )
            .then(res => res.filter(function (o): o is T { return !!o; }));
    }

    getManyLazy(keys: readonly number[]): Observable<T> {
        return new Observable<T>(
            subscriber => {
                from(keys)
                    .pipe(map(key => this.get(key)))
                    .subscribe(
                        async p => {
                            try {
                                const o = await p;
                                subscriber.next(o);
                            } catch (e) {
                                console.error(e);
                            }
                        },
                        undefined,
                        () => subscriber.complete()
                    );
            }
        );
    }
}