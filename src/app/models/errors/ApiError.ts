export type HttpMethod = "get" | "head" | "post" | "put" | "delete" | "connect" | "options" | "trace" | "patch";

export class ApiError extends Error {
    constructor(
        public readonly endpoint: string,
        public readonly method: HttpMethod,
        message?: string
    ) {
        super(message);
        this.name = "ApiError";
    }
}