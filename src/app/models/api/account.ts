export interface UserAccountData {
    id: number,
    username: string,
    email?: string,
    firstname?: string,
    lastname?: string,
    skills?: string[],
    biography?: string,
    links?: string[],
    project_ids?: number[],
}
