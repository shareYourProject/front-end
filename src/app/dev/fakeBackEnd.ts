import { Injectable, isDevMode } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';


import { UserAccountData } from '../models/api/UserAccountData';
import { ProjectData } from '../models/api/ProjectData';

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

const PROJECT: ProjectData = {
    id: 0,
    name: "Projet Vichy",
    description: "A collaboration project",
    member_ids: [0],
    permissions: [
        { member_id: 0, permissions: {} },
    ],
    file_ids: [],
    links: [],
    post_ids: [0],
    visibility: true,
}


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
                case url.endsWith('/token') && method === 'POST':
                    return token();
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
                case url.endsWith('/project/0') && method === 'GET':
                    return getProject();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function token() {
            const { token } = body;
            return response(200, token === TOKEN);
        }

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

        function getProject() {
            return response(200, PROJECT);
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
