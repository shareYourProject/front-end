import { ApiObject } from "./ApiObject"
import { ApiData } from '../api/apiData';
import { DeletedDataError } from '../errors/DeletedDataError';


export abstract class MergeableApiObject<MergeableData, Data extends MergeableData & ApiData<Id>, Id> extends ApiObject<Data, Id> {

    protected abstract getData(): Data;

    async merge(data: Partial<MergeableData>) {
        if (this.deleted) throw new DeletedDataError();

        const merged = this.getData();
        Object.assign(merged, data);

        await this.api.put(this.endpoint, merged).toPromise();
        this.setData(merged);
        return this;
    }
}
