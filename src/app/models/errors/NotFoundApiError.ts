import { ApiError, HttpMethod } from './ApiError';


export class NotFoundApiError extends ApiError {

    constructor(endpoint: string, method: HttpMethod) {
        super(endpoint, method, "Resource not found.");
        this.name = "NotFoundApiError";
    }

}