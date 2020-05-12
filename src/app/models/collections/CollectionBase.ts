import { ApiService } from 'src/app/services/api.service';

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

    protected abstract buildObject(key: number): Promise<T>;
}