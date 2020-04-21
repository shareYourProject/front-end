import { ApiService } from 'src/app/services/api.service';
import { Collectionable } from 'src/app/models/Collections/CollectionBase';
import { ProjectData } from '../api/project';

export class Project implements Collectionable<Project> {

    private readonly _id: number;
    private _memberIds?: number[];
    private _name?: string;
    private _description?: string;
    private _links?: string[];
    private _visibility?: boolean;

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

    async fetch() {
        const data = await this.api.getData<ProjectData>(this.endpoint).toPromise();
        if (!data)
            throw new Error(`Fail to fetch project.`);
        this.setData(data);
        return this;
    }

    async edit(data: Partial<ProjectData>) {
        const merged = this.getData();

        merged.member_ids = data.member_ids ?? this._memberIds;
        merged.name = data.name ?? this._name;
        merged.description = data.description ?? this._description;
        merged.links = data.links ?? this._links;
        merged.visibility = data.visibility ?? this._visibility;

        if (!await this.api.putData(this.endpoint, merged).toPromise())
            throw new Error('Fail to edit user.');
        this.setData(merged);
        return this;
    }

    async delete() {
        if (!await this.api.deleteData(this.endpoint).toPromise())
            throw new Error('Fail to delete project.');
    }

}