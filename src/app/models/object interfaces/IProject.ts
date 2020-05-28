export interface IProject {
    name?: string;
    description?: string;
    links: Map<string, string>;
    visibility?: boolean;
}