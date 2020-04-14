import { Injectable, isDevMode } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';

const TOKEN = 'a0a0a0aa0a0a0a0a0a0';
const USER_SESSION = {
    token: TOKEN,
    user: {
        name: "",
        email: ""
    }
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
                case url.endsWith('/login') && method === 'POST':
                    return login();
                case url.endsWith('/register') && method === 'POST':
                    return register();
                case url.endsWith('/check-token') && method === 'POST':
                    return checkAuthToken();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

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
