import {Badge, Comment, Notification, PaginateResponse, Post, Project, User} from './models';
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
     * Notifications API wrapper
     */
    Notification: {
        /**
         * Base notification requests url
         */
        url: `${API_URL}/notifications`,
        /**
         * Get user notifications.
         */
        get(page = 1): Promise<AxiosResponse<PaginateResponse<Notification>>> {
            const url = `${this.url}?page=${page}`;
            return fetchResource<PaginateResponse<Notification>>('get', url);
        },
        /**
         * Set a notification as read.
         */
        markAsRead(id: string): Promise<AxiosResponse> {
            const url = `${this.url}/${id}`;
            return fetchResource<PaginateResponse>('put', url);
        }
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
         * Get a post
         */
        get(id: number): Promise<AxiosResponse<Post>> {
            const url = `${this.url}/${id}`;
            return fetchResource<Post>('get', url);
        },
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
        create(files: Array<File>, reshare?: Post, content?: string, project?: Project): Promise<AxiosResponse<Post>> {
            const url = `${this.url}/create`;

            const formData = new FormData();

            if (files.length > 0) {
                files.forEach((file, index) => {
                    formData.append(`image[${index}]`, file);
                });
            }

            if (reshare) formData.append('reshare', String(reshare.id));
            if (project) formData.append('project', String(project.id));
            if (content) formData.append('content', content);

            return fetchResource<Post>('post', url, formData, {
                'Content-Type': 'multipart/form-data'
            });
        },
        /**
         * Get the comments of a post
         * @param post
         * @param page
         */
        comments(post: Post, page = 1): Promise<AxiosResponse<PaginateResponse<Comment>>> {
            const url = `${this.url}/${post.id}/comments?page=${page}`;
            return fetchResource<PaginateResponse<Comment>>('get', url);
        }
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
        },
        /**
         * Follow a project.
         * @param project
         */
        follow(project: Project): Promise<AxiosResponse<Project>> {
            const url = `${this.url}/${project.id}/follow`;
            return fetchResource<Project>('put', url);
        },
        /**
         * Unfollow a project.
         * @param project
         */
        unfollow(project: Project): Promise<AxiosResponse<Project>> {
            const url = `${this.url}/${project.id}/unfollow`;
            return fetchResource<Project>('put', url);
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
        },
        /**
         * Follow a user.
         * @param user
         */
        follow(user: User): Promise<AxiosResponse<User>> {
            const url = `${this.url}/${user.id}/follow`;
            return fetchResource<User>('put', url);
        },
        /**
         * Unfollow a user.
         * @param user
         */
        unfollow(user: User): Promise<AxiosResponse<User>> {
            const url = `${this.url}/${user.id}/unfollow`;
            return fetchResource<User>('put', url);
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
    },
    Comment: {
        /**
         * Base comment requests url
         */
        url: `${API_URL}/comments`,
        /**
         * Get a comment
         * @param id
         */
        get(id: number): Promise<AxiosResponse<Comment>> {
            const url = `${this.url}/${id}`;
            return fetchResource<Comment>('get', url);
        },
        /**
         * Create a new comment
         * @param content
         * @param post
         */
        create(content: string, post: Post): Promise<AxiosResponse<Comment>> {
            return fetchResource<Comment>('post', this.url, {content: content, post_id: post.id});
        },
        /**
         * Update a comment
         * @param comment
         * @param content
         */
        update(comment: Comment, content: string): Promise<AxiosResponse<Comment>> {
            const url = `${this.url}/${comment.id}`;
            return fetchResource<Comment>('put', url, {content: content});
        },
        /**
         * Delete a comment
         * @param comment
         */
        delete(comment: Comment): Promise<AxiosResponse> {
            const url = `${this.url}/${comment.id}`;
            return fetchResource<Comment>('delete', url);
        }
    }
};

export {API, fetchResource, axios};
