import { ApiResponseStatus } from './api-response-status.enum';

export interface ApiResponse {
    status: ApiResponseStatus,
    error: string | undefined,
}
