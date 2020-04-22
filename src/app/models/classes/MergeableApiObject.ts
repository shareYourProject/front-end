import { ApiObject } from "./ApiObject"
import { ApiData } from '../api/apiData';
import { DeletedDataError } from '../errors/DeletedDataError';


export abstract class MergeableApiObject<Data extends ApiData<Id>, Id> extends ApiObject<Data, Id> {

    protected abstract getData(): Data;

    async merge(data: Partial<Data>) {
        if (this.deleted) throw new DeletedDataError();

        const merged = this.getData();

        for (const key of (Object.keys(merged) as (keyof Data)[])) {
            const d = data[key];
            if (d !== undefined)
                merged[key] = d as any; // read : https://github.com/microsoft/TypeScript/issues/10530
        }

        await this.api.put(this.endpoint, merged).toPromise();
        this.setData(merged);
        return this;
    }
}
