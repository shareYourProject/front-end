
export class NotLoggedError extends Error {

    constructor() {
        super('User must be logged.');
        this.name = 'NotLoggedError';
    }

}