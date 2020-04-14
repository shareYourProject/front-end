export interface Account {
    username: string,
    id: number,
    email?: string,
    firstname?: string,
    lastname?: string,
    skills?: string[],
    biography?: string,
    links?: string[],
    project_ids?: number[],
}
