import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';


import { UserData } from '../models/api/UserData';
import { ProjectData } from '../models/api/ProjectData';
import { PostData, CommentData } from '../models/api/PostBaseData';
import { PagedData } from '../models/api/PagedData';
import { SearchResult } from '../models/api/SearchResult';

const TOKEN = 'a0a0a0aa0a0a0a0a0a0';

const PROJECT: ProjectData = {
    id: 0,
    name: 'Projet Vichy',
    description: 'A collaboration project',
    member_ids: [0, 1],
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
    links: [{ key: "Facebook", value: "https://facebook.com" }, { key: "GitHub", value: "https://github.com" }, { key: "Twitter", value: "https://twitter.com" }],
    post_ids: [0, 1],
    visibility: true,
}

const users: UserData[] = [
    {
        id: 0,
        username: 'AliceDu29',
        firstname: 'Alice',
        lastname: undefined,
        biography: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In ea deserunt sed quia rerum blanditiis corrupti cumque illum quam libero ullam maiores est voluptates animi, sequi perspiciatis velit? Exercitationem, illum.',
        project_ids: [0],
        links: [
            { key: "Facebook", value: "facebook.com" },
            { key: "Twitter", value: "twitter.com" },
            { key: "Github", value: "gitchub.com" },
        ],
        email: 'Alice@email.com',
        skills: ["php", "angular", "ts", "catia v5"]
    },
    {
        id: 1,
        username: 'Bobby',
        firstname: 'Bob',
        lastname: 'Smith',
        project_ids: [0]
    },
    {
        id: 2,
        username: 'Detective Conan',
        firstname: 'Conan',
        lastname: 'Doyle',
    },

];

const post0: PostData = {
    id: 0,
    author_id: 0,
    project_id: 0,
    content: "Hello world folks !",
    user_ids: [1, 2],
}

const post1: PostData = {
    id: 1,
    author_id: 2,
    project_id: 0,
    user_ids: [0, 2],
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur enim purus, viverra eu libero ut, tempus pellentesque ipsum. Nulla ullamcorper gravida augue, in ultrices odio posuere eget. Fusce vestibulum varius mi, et auctor nulla interdum et. Duis sed ante non urna sollicitudin finibus at ut felis. Suspendisse vel scelerisque orci, non consectetur neque. Donec pharetra ullamcorper ipsum ac dapibus. Sed hendrerit vel sem ut ultricies. Mauris maximus laoreet orci in vestibulum. "
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
                case url.includes('/search/') && method === 'GET':
                    const res: SearchResult = {
                        project_ids: [1, 2],
                        user_ids: [4, 5, 6]
                    };
                    return response(200, res);

                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function token() {
            const { api_token } = body;
            return response(200, api_token === TOKEN);
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

        function getComment(i: number) {
            const per_page = 2;
            const last = 3;
            const res: PagedData<CommentData> = {
                current_page: i + 1,
                first_page_url: '/comments/1/0',
                from: i * per_page,
                to: (i + 1) * per_page,
                per_page: per_page,
                last_page: last,
                last_page_url: `/comments/1/${last}`,
                next_page_url: i === last ? null : `/comments/1/${i + 1}`,
                path: '/comments/1/',
                prev_page_url: `/comments/1/${i - 1}`,
                total: 15,
                data: [
                    {
                        id: i * per_page,
                        post_id: 1,
                        author_id: 0,
                        content: `I'm comment #${i * per_page}`,
                        user_ids: []
                    },
                    {
                        id: i * per_page + 1,
                        post_id: 1,
                        author_id: 0,
                        content: `I'm comment #${i * per_page + 1}`,
                        user_ids: []
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
