import { ApiService } from 'src/app/services/api.service';
import { Collectionable } from 'src/app/models/Collections/CollectionBase';
import { ProjectData } from '../api/project';
import { DeletedDataError } from '../errors/DeletedDataError';
import { threadId } from 'worker_threads';
import { NotFoundApiError } from '../errors/NotFoundApiError';

export class Project implements Collectionable<Project> {

    private readonly _id: number;
    private _memberIds?: number[];
    private _name?: string;
    private _description?: string;
    private _links?: string[];
    private _visibility?: boolean;

    private _deleted = false;

    constructor(
        private readonly api: ApiService,
        data: ProjectData
    ) {
        this._id = data.id;
        this.setData(data);
    }

    private setData(data: ProjectData) {
        this._memberIds = data.member_ids ? [...data.member_ids] : undefined;
        this._name = data.name;
        this._description = data.description;
        this._links = data.links ? [...data.links] : undefined;
        this._visibility = data.visibility;
    }

    private getData(): ProjectData {
        return {
            id: this._id,
            member_ids: this._memberIds,
            name: this._name,
            description: this._description,
            links: this._links,
            visibility: this._visibility,
        }
    }

    private get endpoint() { return `project/${this.id}`; }

    get id() { return this._id; }

    // TODO get members via manager 

    get name() { return this._name; }

    get description() { return this._description; }

    get links(): ReadonlyArray<string> | undefined { return this._links; }

    get visibility() { return this._visibility; }

    get deleted() { return this._deleted; }

    async fetch() {
        if (this.deleted) throw new DeletedDataError();

        try {
            const data = await this.api.get<ProjectData>(this.endpoint).toPromise();
            if (!data)
                throw new Error('Fail to fetch project.');
            this.setData(data);
            return this;
        } catch (error) {
            if (error instanceof NotFoundApiError) {
                this._deleted = true;
                return this;
            } else
                throw error;
        }
    }

    async edit(data: Partial<ProjectData>) {
        if (this.deleted) throw new DeletedDataError();

        const merged = this.getData();

        merged.member_ids = data.member_ids ?? this._memberIds;
        merged.name = data.name ?? this._name;
        merged.description = data.description ?? this._description;
        merged.links = data.links ?? this._links;
        merged.visibility = data.visibility ?? this._visibility;

        await this.api.put(this.endpoint, merged).toPromise();
        this.setData(merged);
        return this;
    }

    async delete() {
        if (this.deleted) throw new DeletedDataError();
        await this.api.delete(this.endpoint).toPromise();
        this._deleted = true;
    }
}