export interface IProject {
    id: number,
    member_ids?: number[],
    name?: string,
    description?: string,
    links?: string[],
    visibility?: boolean,
}