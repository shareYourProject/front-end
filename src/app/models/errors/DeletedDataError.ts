

export class DeletedDataError extends Error {
    constructor() {
        super('This action is impossible because data has been deleted.');
        this.name = "DeletedDataError";
    }
}