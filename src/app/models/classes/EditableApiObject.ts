import { ApiData } from '../api/ApiData';
import { DeletedDataError } from '../errors/DeletedDataError';
import { ApiObject } from './ApiObject';
import { ApiUtils } from '../utils/ApiUtils';

export abstract class EditalbeApiObject<IData, Data extends ApiData> extends ApiObject<Data>{

    abstract getEditableData(): IData;

    async update(data: Partial<IData>) {
        if (this.deleted) throw new DeletedDataError();

        try {
            await this.api.put(this.endpoint, ApiUtils.toRawData(data));
            await this.fetch();
        } catch (e) {
            return false;
        }
        return true;
    }
}