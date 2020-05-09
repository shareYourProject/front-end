import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';


import { UserAccountData } from '../models/api/UserAccountData';
import { PostData, CommentData } from '../models/api/PostBaseData';
import { ProjectData } from '../models/api/ProjectData';
import { PagedData } from '../models/api/pagedData';

const TOKEN = 'a0a0a0aa0a0a0a0a0a0';
const USER_SESSION = {
    token: TOKEN,
    user: {
        name: "",
        email: ""
    }
}

let userTest: UserAccountData = {
    id: 0,
    username: 'AliceDu29',
    firstname: 'Alice',
    lastname: undefined,
};

let cur = 0;
let names = ['Alice', 'Bob', 'Conan', 'D'];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        console.log('Fake backend', request);

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute(): Observable<HttpEvent<any>> {
            switch (true) {
                case url.endsWith('/login') && method === 'POST':
                    return login();
                case url.endsWith('/register') && method === 'POST':
                    return register();
                case url.endsWith('/check-token') && method === 'POST':
                    return checkAuthToken();
                case url.endsWith('/user/0') && method === 'GET':
                    return getUser();
                case url.endsWith('/user/0') && method === 'PUT':
                    return putUser();
                case url.endsWith('/project/1/post/1') && method === 'GET':
                    return getPost();
                case url.endsWith('/project/1') && method === 'GET':
                    return getProject();
                case url.endsWith('/comments/1') && method === 'GET':
                    return getComment(0);

                case url.endsWith('/comments/1/0') && method === 'GET':
                    return getComment(0);
                case url.endsWith('/comments/1/1') && method === 'GET':
                    return getComment(1);
                case url.endsWith('/comments/1/2') && method === 'GET':
                    return getComment(2);
                case url.endsWith('/comments/1/3') && method === 'GET':
                    return getComment(3);


                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function getUser() {
            const res = { ...userTest };
            userTest.username = names[++cur % names.length]; // simulate change
            return response(201, res);
        }

        function putUser() {
            userTest = body;
            return response(200);
        }

        function login() {
            const { username, password } = body;
            if (username === 'Alice' && password === '0123456789')
                return response(201, { user: USER_SESSION });
            else
                return response(400);
        }

        function register() {
            const { username, password } = body;


            return error("Not implemented"); // TODO
        }

        function checkAuthToken() {
            const { token } = body;
            return response(200, { isValid: token === TOKEN })
        }

        function getPost() {
            const post: PostData = {
                id: 1,
                project_id: 1,
                author_id: 0,
                content: 'Hello world',
                likes: [],
            }
            return response(200, post);
        }

        function getProject() {
            const project: ProjectData = {
                id: 1
            }
            return response(200, project);
        }

        function getComment(i: number) {
            const per_page = 2;
            const last = 3;
            const res: PagedData<CommentData> = {
                current_page: i + 1,
                first_page_url: 'comments/1/0',
                from: i * per_page,
                to: (i + 1) * per_page,
                per_page: per_page,
                last_page: last,
                last_page_url: `comments/1/${last}`,
                next_page_url: `comments/1/${i + 1}`,
                path: 'comments/1/',
                prev_page_url: `comments/1/${i - 1}`,
                total: 15,
                data: [
                    {
                        id: i * per_page,
                        post_id: 1,
                        author_id: 0,
                        content: `I'm comment #${i * per_page}`,
                        likes: []
                    },
                    {
                        id: i * per_page + 1,
                        post_id: 1,
                        author_id: 0,
                        content: `I'm comment #${i * per_page + 1}`,
                        likes: []
                    },
                ]
            }
            return response(200, res);
        }

        // helper functions

        function response(status, body?) {
            return of(new HttpResponse({ status, body }));
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
