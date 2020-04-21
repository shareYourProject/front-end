
export interface Collectionable {
    fetch(): Promise<this>;
}

export abstract class CollectionBase<Key, T extends Collectionable> {

    protected cache = new Map<Key, T>();

    constructor() { }

    async get(key: Key) {
        const cached = this.cache.get(key);

        if (cached)
            return await cached.fetch();

        const o = await this.buildObject(key);
        this.cache.set(key, o);
        return o;
    }

    protected abstract buildObject(key: Key): Promise<T>;
}