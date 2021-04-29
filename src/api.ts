import {Badge, PaginateResponse, Post, Project, User} from './models';
import axios, {AxiosPromise, AxiosRequestConfig, AxiosResponse} from 'axios'

const API_URL: string = process.env.VUE_APP_API_PATH as string;
const API_AUTH_URL: string = process.env.VUE_APP_AUTH_PATH as string;

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

/**
 *
 * @param method
 * @param path
 * @param data
 * @param headers
 */
const fetchResource = <T = any>(method: string, path: string, data = {}, headers = {}) : Promise<AxiosResponse<T>> => {

    // Variable which will be used for storing response

    return (axios({
        method: method,
        url: path,
        data: data,
        headers: headers
    } as AxiosRequestConfig) as AxiosPromise<T>).then(response => {

        return response;

    }).catch(error => {
        if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            return error.response;
        }
        throw error;
    })
}

const API = {
    /**
     * Search posts and users from a query
     * @param query
     */
    search(query: string): Promise<AxiosResponse<User[]>>{
        const url = `${API_URL}/search/${query}`;
        return fetchResource<Array<User>>('get', url);
    },
    /**
     * Logout the user
     */
    logout(): Promise<AxiosResponse<any>> {
        const url = `${API_AUTH_URL}/logout`;
        return fetchResource('post', url);
    },
    /**
     * Get CSRF token
     */
    csrf(): Promise<AxiosResponse<any>> {
        const url = `${API_AUTH_URL}/sanctum/csrf-cookie`;
        return fetchResource('get', url);
    },
    /**
     * Login the user
     */
    login(credentials: Record<string, unknown>): Promise<AxiosResponse<any>> {
        const url = `${API_AUTH_URL}/login`;
        return fetchResource('post', url, credentials);
    },
    /**
     * Register a new user
     */
    register(credentials: Record<string, unknown>): Promise<AxiosResponse<any>> {
        const url = `${API_AUTH_URL}/register`;
        return fetchResource('post', url, credentials);
    },
    /**
     * Post API wrapper
     */
    Post: {
        /**
         * Base post requests url
         */
        url: `${API_URL}/posts`,
        /**
         * Like a post
         * @param post
         */
        like(post: Post): Promise<AxiosResponse<Post>> {
            const url = `${this.url}/${post.id}/like`;
            return fetchResource<Post>('put', url);
        },
        /**
         * Unike a post
         * @param post
         */
        unlike(post: Post): Promise<AxiosResponse<Post>> {
            const url = `${this.url}/${post.id}/unlike`;
            return fetchResource<Post>('put', url);
        },
    },
    /**
     * Fedd API wrapper
     */
    Feed: {
        /**
         * Load user feed and return loaded posts
         * @param page Page to load
         */
        get(page = 1): Promise<AxiosResponse<PaginateResponse<Post>>> {
            const url = `${API_URL}/feed?page=${ page }`;
            return fetchResource<PaginateResponse<Post>>('get', url);
        },
    },
    /**
     * Project API wrapper
     */
    Project: {
        /**
         *  Base project requests url
         */
        url: `${API_URL}/projects`,
        /**
         * Search projects
         */
        search(query: string): Promise<AxiosResponse<Project[]>> {
            const url = `${this.url}/search?query=${query}`;
            return fetchResource<Array<Project>>('get', url);
        },
        /**
         * Get a project
         */
        get(projectId: number): Promise<AxiosResponse<Project>> {
            const url = `${this.url}/${projectId}`;
            return fetchResource<Project>('get', url);
        },
        posts(project: Project, page = 1): Promise<AxiosResponse<PaginateResponse<Post>>> {
            const url = `${this.url}/${project.id}/posts?page=${page}`;
            return fetchResource<PaginateResponse<Post>>('get', url);
        }
    },
    User: {
        /**
         * Base user requests url
         */
        url: `${API_URL}/users`,
        /**
         * Search users
         */
        search(query: string): Promise<AxiosResponse<User[]>> {
            const url = `${this.url}/search?query=${query}`;
            return fetchResource<Array<User>>('get', url);
        },
        /**
         * Get the current authenticated user
         */
        user(): Promise<AxiosResponse<User>> {
            const url = `${API_URL}/user`;
            return fetchResource<User>('get', url);
        },
        /**
         * Get a user
         */
        get(userId: number): Promise<AxiosResponse<User>> {
            const url = `${this.url}/${userId}`;
            return fetchResource<User>('get', url);
        },
        /**
         * Update the profile of the user
         */
        updateProfile(user: User, data: Record<string, unknown>): Promise<AxiosResponse<User>> {
            const url = `${this.url}/${user.id}/profile`;
            return fetchResource<User>('put', url, data);
        }
    },
    Badge: {
        /**
         * Base badge requests url
         */
        url: `${API_URL}/badges`,
        search(query: string): Promise<AxiosResponse<Badge[]>> {
            const url = `${this.url}/search?query=${query}`;
            return fetchResource<Array<Badge>>('get', url);
        }
    }
};

export { API, fetchResource };
