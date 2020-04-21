import { ApiError, HttpMethod } from './ApiError';

export class AccessDeniedApiError extends ApiError {

    constructor(
        endpoint: string,
        method: HttpMethod
    ) {
        super(endpoint, method, "Access denied to the request.");
        this.name = "ApiAccessDeniedError";
    }

}