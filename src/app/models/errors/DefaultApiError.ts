import { ApiError, HttpMethod } from './ApiError'

export class DefaultApiError extends ApiError {

    constructor(endpoint: string, method: HttpMethod, status: number) {
        super(endpoint, method, `Request return status code: ${status}`);
        this.name = 'DefaultApiError';
    }

}