import { ApiObject } from "./ApiObject"
import { ApiData } from '../api/ApiData';
import { DeletedDataError } from '../errors/DeletedDataError';


export abstract class MergeableApiObject<MergeableData, Data extends MergeableData & ApiData> extends ApiObject<Data> {

    protected abstract getData(): MergeableData;

    protected abstract mergeData(data: MergeableData): void;

    async merge(data: Partial<MergeableData>) {
        if (this.deleted) throw new DeletedDataError();

        const merged = this.getData();
        Object.assign(merged, data);

        await this.api.put(this.endpoint, merged);
        this.mergeData(merged);
        return this;
    }
}
