import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';


import { UserAccountData } from '../models/api/UserAccountData';
import { ProjectData } from '../models/api/ProjectData';

const TOKEN = 'a0a0a0aa0a0a0a0a0a0';

const PROJECT: ProjectData = {
    id: 0,
    name: 'Projet Vichy',
    description: 'A collaboration project',
    member_ids: [0],
    permissions: [
        {
            member_id: 0,
            permissions: {
                accessible_files: true,
                create_post: true,
                delete_file: true,
                deposit_file: true,
                manage_members: true,
                manage_permission: true,
                manage_project: true
            }
        },
    ],
    file_ids: [],
    links: [{ name: "Facebook", link: "https://facebook.com" }, { name: "GitHub", link: "https://github.com" }, { name: "Twitter", link: "https://twitter.com" }],
    post_ids: [0, 1],
    visibility: true,
}

const users: UserAccountData[] = [
    {
        id: 0,
        username: 'AliceDu29',
        firstname: 'Alice',
        lastname: undefined,
    },
    {
        id: 1,
        username: 'Bobby',
        firstname: 'Bob',
        lastname: 'Smith',
    },
    {
        id: 2,
        username: 'Detective Conan',
        firstname: 'Conan',
        lastname: 'Doyle',
    },

];

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

                case url.endsWith('/user/0') && method === 'GET': return getUser(0);
                case url.endsWith('/user/1') && method === 'GET': return getUser(1);
                case url.endsWith('/user/2') && method === 'GET': return getUser(2);

                case url.endsWith('/project/0') && method === 'GET': return response(200, PROJECT);

                case url.endsWith('/project/0/permissions/0') && method === 'GET': return response(200, (PROJECT.permissions ?? [])[0].permissions);
                case url.endsWith('/project/0/permissions/1') && method === 'GET': return response(200, (PROJECT.permissions ?? [])[1].permissions);
                case url.endsWith('/project/0/permissions/2') && method === 'GET': return response(200, (PROJECT.permissions ?? [])[2].permissions);

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

        function getUser(i: number) {
            return response(201, users[i]);
        }

        function login() {
            const { username, password } = body;
            if (username === 'Alice' && password === '0123456789')
                return response(201, { account: users[0], api_token: TOKEN });
            else
                return response(400);
        }

        function register() {
            const { username, password } = body;


            return error("Not implemented"); // TODO
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
