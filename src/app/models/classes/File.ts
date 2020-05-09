import { ApiObject } from './ApiObject';
import { FileData } from '../api/FileData';



export class File extends ApiObject<FileData> {



    protected setData(data: FileData): void {
        throw new Error("Method not implemented.");
    }
    
    public get endpoint(): string {
        throw new Error("Method not implemented.");
    }

}