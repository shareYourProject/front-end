import { Post, Project, User, Badge, PaginateResponse } from './models';
import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'

const API_URL: string = process.env.VUE_APP_API_PATH as string;

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

    let url = `${ API_URL }${ path }`;
    if(path === '/logout' || path === '/login' || path === '/register') url = path;

    // Variable which will be used for storing response

    return (axios({
        method: method,
        url: url,
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
        const url = `/search/${query}`;
        return fetchResource<Array<User>>('get', url);
    },
    /**
     * Logout the user
     */
    logout(): Promise<AxiosResponse<any>> {
        const url = '/logout';
        return fetchResource('post', url);
    },
    /**
     * Login the user
     */
    login(credentials: Record<string, unknown>): Promise<AxiosResponse<any>> {
        const url = '/login';
        return fetchResource('post', url, credentials);
    },
    /**
     * Register a new user
     */
    register(credentials: Record<string, unknown>): Promise<AxiosResponse<any>> {
        const url = '/register';
        return fetchResource('post', url, credentials);
    },
    /**
     * Post API wrapper
     */
    Post: {
        /**
         * Base post requests url
         */
        url: '/posts',
        /**
         * Like a post
         * @param id
         */
        like(post: Post): Promise<AxiosResponse<Post>> {
            const url = `${this.url}/${post.id}/like`;
            return fetchResource<Post>('put', url);
        },
        /**
         * Unike a post
         * @param id
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
            const url = `/feed?page=${ page }`;
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
        url: '/projects',
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
        url: '/users',
        /**
         * Search users
         */
        search(query: string): Promise<AxiosResponse<User[]>> {
            const url = `${this.url}/search?query=${query}`;
            return fetchResource<Array<User>>('get', url);
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
        url: '/badges',
        search(query: string): Promise<AxiosResponse<Badge[]>> {
            const url = `${this.url}/search?query=${query}`;
            return fetchResource<Array<Badge>>('get', url);
        }
    }
};

export { API, fetchResource };
