import { ApiService } from 'src/app/services/api.service';
import { Observable, of, from, Subscriber } from 'rxjs';
import { mergeMap, flatMap, map, scan } from 'rxjs/operators';

export interface Collectionable {
    fetch(): Promise<this>;
}

export abstract class CollectionBase<T extends Collectionable> implements Iterable<T> {

    protected cache = new Map<number, T>();

    constructor(
        protected readonly api: ApiService,
    ) { }

    [Symbol.iterator](): Iterator<T, any, undefined> {
        return this.cache.values();
    }

    async get(key: number) {
        const cached = this.cache.get(key);

        if (cached)
            return await cached.fetch();

        const o = await this.buildObject(key);
        this.cache.set(key, o);
        return o;
    }

    getMany(keys: number[]): Observable<T> {
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

    protected abstract buildObject(key: number): Promise<T> | T;
}