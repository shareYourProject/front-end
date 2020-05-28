import { ApiClient } from '../services/api-client.service';
import { PagedData } from '../models/api/PagedData';
import { PagedResponse } from '../models/PagedResponse';

export function MakePagedResponse<Data, T>(
    url: string,
    apiClient: ApiClient,
    build: (data: Data) => T | Promise<T>
): PagedResponse<T> {
    let nextUrl: string | null = url;
    return {
        next: async () => {
            if (!nextUrl) return [];
            const response = await apiClient.get<PagedData<Data>>(nextUrl);
            nextUrl = response.next_page_url;
            return await Promise.all(response.data.map(d => build(d)));
        }
    };
}